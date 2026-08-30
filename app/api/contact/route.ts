import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Receives the contact form submission and delivers it to:
 *   1. Telegram (Bot API -> your chat) if TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are set
 *   2. Email (Resend API -> your inbox) if RESEND_API_KEY is set
 * Returns success only when at least one channel delivered.
 */

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  description?: string;
}

function buildTelegramText(p: ContactPayload): string {
  return [
    "New project inquiry",
    `Name: ${p.name ?? "-"}`,
    `Email: ${p.email ?? "-"}`,
    `Phone / Telegram: ${p.phone ?? "-"}`,
    `Project type: ${p.projectType ?? "-"}`,
    `Budget: ${p.budget ?? "-"}`,
    ``,
    `Description:`,
    `${p.description ?? "-"}`,
  ].join("\n");
}

async function deliverTelegram(p: ContactPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM env vars not set");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramText(p),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram ${res.status}: ${body}`);
  }
}

async function deliverEmail(p: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM ?? "RIN NAIRITH <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL_TO ?? "nairithrin143@gmail.com";
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New project inquiry from ${p.name ?? "the site"}`,
      text: buildTelegramText(p),
      reply_to: p.email,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const description = (payload.description ?? "").trim();

  if (!name || !description) {
    return NextResponse.json(
      { ok: false, error: "Name and description are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  const exc = payload;
  const results: string[] = [];
  const errors: string[] = [];

  // Try Telegram first; if it fails, fall through to email.
  const tg = await deliverTelegram(exc).then(
    () => results.push("telegram"),
    (e: unknown) => errors.push(String((e as Error).message))
  );
  void tg;

  // Always try email too (both channels were requested).
  const em = await deliverEmail(exc).then(
    () => results.push("email"),
    (e: unknown) => errors.push(String((e as Error).message))
  );
  void em;

  if (results.length > 0) {
    // Partial success: flag it when only one channel delivered.
    const everythingOk = results.length === 2;
    return NextResponse.json(
      {
        ok: true,
        delivered: results,
        warning: everythingOk ? null : errors[0] ?? "One channel failed.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Could not deliver the message.",
      details: errors,
      hint: "Configure TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID and RESEND_API_KEY.",
    },
    { status: 502 }
  );
}