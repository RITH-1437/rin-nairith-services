import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  escapeTelegramHtml,
  sendTelegramMessage,
  truncateTelegramText,
} from "@/lib/telegram";

export const runtime = "nodejs";

type UnknownRecord = Record<string, unknown>;

type ParsedMessage = {
  chatId: string;
  chatTitle?: string;
  firstName?: string;
  lastName?: string;
  text: string;
  userId?: string;
  username?: string;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: UnknownRecord, key: string): string | undefined {
  const item = value[key];
  return typeof item === "string" && item.length > 0 ? item : undefined;
}

function readId(value: unknown): string | undefined {
  if (typeof value === "string" && value.length > 0) return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

function parseMessage(value: unknown): ParsedMessage | null {
  if (!isRecord(value) || !isRecord(value.chat)) return null;

  const chatId = readId(value.chat.id);
  const text = readString(value, "text") ?? readString(value, "caption");
  if (!chatId || !text?.trim()) return null;

  const from = isRecord(value.from) ? value.from : undefined;
  return {
    chatId,
    chatTitle: readString(value.chat, "title"),
    firstName: from ? readString(from, "first_name") : undefined,
    lastName: from ? readString(from, "last_name") : undefined,
    text,
    userId: from ? readId(from.id) : undefined,
    username: from ? readString(from, "username") : undefined,
  };
}

function getMessageUpdate(update: UnknownRecord): {
  message: ParsedMessage;
  edited: boolean;
} | null {
  const message = parseMessage(update.message);
  if (message) return { message, edited: false };

  const editedMessage = parseMessage(update.edited_message);
  return editedMessage ? { message: editedMessage, edited: true } : null;
}

function isValidSecret(request: Request): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  const provided = request.headers.get("x-telegram-bot-api-secret-token");
  if (!expected || !provided) return false;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  return (
    expectedBuffer.length === providedBuffer.length &&
    timingSafeEqual(expectedBuffer, providedBuffer)
  );
}

function isAllowedChat(chatId: string): boolean {
  const configured = process.env.TELEGRAM_ALLOWED_CHAT_IDS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!configured || configured.length === 0) return true;
  return configured.includes(chatId);
}

function buildNotification(
  message: ParsedMessage,
  edited: boolean
): string {
  const name = [message.firstName, message.lastName].filter(Boolean).join(" ");
  const sender = name || (message.username ? `@${message.username}` : undefined);
  const lines = [
    `<b>${edited ? "Updated" : "New"} Telegram customer message</b>`,
    "",
    `<b>From:</b> ${escapeTelegramHtml(sender ?? "Unknown sender")}`,
  ];

  if (message.userId) {
    lines.push(`<b>User ID:</b> ${escapeTelegramHtml(message.userId)}`);
  }
  if (message.username) {
    lines.push(
      `<b>Username:</b> ${escapeTelegramHtml(`@${message.username}`)}`
    );
  }
  if (message.chatTitle) {
    lines.push(`<b>Chat:</b> ${escapeTelegramHtml(message.chatTitle)}`);
  }

  lines.push(
    "",
    "<b>Message</b>",
    `<pre>${escapeTelegramHtml(truncateTelegramText(message.text, 3000))}</pre>`
  );
  return lines.join("\n");
}

export async function POST(request: Request) {
  if (!process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Telegram webhook is not configured." },
      { status: 500 }
    );
  }

  if (!isValidSecret(request)) {
    return NextResponse.json(
      { ok: false, error: "Invalid webhook secret." },
      { status: 401 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid update payload." },
      { status: 400 }
    );
  }

  if (!isRecord(payload)) {
    return NextResponse.json(
      { ok: false, error: "Invalid update payload." },
      { status: 400 }
    );
  }

  const update = getMessageUpdate(payload);
  if (!update) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const { message, edited } = update;
  const adminChatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!adminChatId) {
    return NextResponse.json(
      { ok: false, error: "Telegram admin chat is not configured." },
      { status: 500 }
    );
  }

  if (message.chatId === adminChatId || !isAllowedChat(message.chatId)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    await sendTelegramMessage(buildNotification(message, edited), {
      chatId: adminChatId,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "[telegram] customer message delivery failed",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      { ok: false, error: "Could not deliver the message." },
      { status: 502 }
    );
  }
}
