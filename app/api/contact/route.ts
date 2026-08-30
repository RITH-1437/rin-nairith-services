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

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function buildTelegramHtml(p: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["Name", p.name ?? "-"],
    ["Email", p.email ?? "-"],
    ["Phone", p.phone ?? "-"],
    ["Type", p.projectType ?? "-"],
    ["Budget", p.budget ?? "-"],
  ];
  // Left-align labels to the widest one so the monospace block lines up.
  const width = Math.max(...rows.map(([l]) => l.length));
  const fieldLines = rows
    .map(([label, value]) => `${label.padEnd(width)} : ${value}`)
    .join("\n");

  return [
    "<b>New Project Inquiry</b>",
    "",
    `<code>${esc(fieldLines)}</code>`,
    "",
    "<b>Description</b>",
    `<code>${esc(p.description ?? "-")}</code>`,
  ].join("\n");
}

function buildEmailHtml(p: ContactPayload): string {
  const fields: Array<[string, string]> = [
    ["Name", p.name ?? "-"],
    ["Email", p.email ?? "-"],
    ["Phone / Telegram", p.phone ?? "-"],
    ["Project type", p.projectType ?? "-"],
    ["Budget", p.budget ?? "-"],
  ];
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f5f0;">
    <div style="max-width:560px;margin:24px auto;background:#ffffff;border:1px solid #e2e6da;border-radius:12px;overflow:hidden;font-family:Segoe UI, Arial, sans-serif;">
      <div style="background:#0a0c09;color:#b7ff3c;padding:18px 24px;">
        <span style="font-weight:700;font-size:16px;">New Project Inquiry</span>
      </div>
      <div style="padding:24px;">
        <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;color:#1c1f18;">
          ${fields
            .map(
              ([label, value]) => `
          <tr>
            <td style="padding:8px 8px 8px 0;width:42%;vertical-align:top;color:#6a7360;font-weight:600;">${esc(label)}</td>
            <td style="padding:8px 0;vertical-align:top;color:#1c1f18;">${esc(value)}</td>
          </tr>`
            )
            .join("")}
        </table>
        <div style="margin-top:16px;padding:14px 16px;background:#f4f5f0;border-left:3px solid #b7ff3c;border-radius:6px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6a7360;margin-bottom:6px;">Description</div>
          <div style="font-size:14px;color:#1c1f18;white-space:pre-wrap;">${esc(p.description ?? "-")}</div>
        </div>
      </div>
      <div style="padding:12px 24px;background:#fafbf8;border-top:1px solid #e2e6da;font-size:12px;color:#9aa28d;">
        Sent from the RIN Nairith services site.
      </div>
    </div>
  </body>
</html>`;
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
        text: buildTelegramHtml(p),
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
      html: buildEmailHtml(p),
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

  console.log(
    `[contact] "${name}" <${email}> → delivered: ${results.join(", ") || "NONE"}` +
      (errors.length ? ` | errors: ${errors.join(" | ")}` : "")
  );

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