import { NextResponse } from "next/server";
import {
  escapeTelegramHtml,
  sendTelegramMessage,
  truncateTelegramText,
} from "@/lib/telegram";
import { siteConfig } from "@/data/site";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  description?: string;
}

function buildTelegramHtml(payload: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["Name", payload.name ?? "-"],
    ["Company", payload.company ?? "-"],
    ["Email", payload.email ?? "-"],
    ["Phone", payload.phone ?? "-"],
    ["Type", payload.projectType ?? "-"],
    ["Budget", payload.budget ?? "-"],
  ];
  const width = Math.max(...rows.map(([label]) => label.length));
  const fieldLines = rows
    .map(
      ([label, value]) =>
        `${label.padEnd(width)} : ${truncateTelegramText(value, 200)}`
    )
    .join("\n");

  return [
    "<b>New Project Inquiry</b>",
    "",
    `<code>${escapeTelegramHtml(fieldLines)}</code>`,
    "",
    "<b>Description</b>",
    `<code>${escapeTelegramHtml(truncateTelegramText(payload.description ?? "-", 3000))}</code>`,
  ].join("\n");
}

function buildEmailHtml(payload: ContactPayload): string {
  const fields: Array<[string, string]> = [
    ["Name", payload.name ?? "-"],
    ["Company / Organization", payload.company ?? "-"],
    ["Email", payload.email ?? "-"],
    ["Phone / Telegram", payload.phone ?? "-"],
    ["Project type", payload.projectType ?? "-"],
    ["Budget", payload.budget ?? "-"],
  ];

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f5f0;">
    <div style="max-width:560px;margin:24px auto;background:#ffffff;border:1px solid #e2e6da;border-radius:12px;overflow:hidden;font-family:Segoe UI, Arial, sans-serif;">
      <div style="background:#0a0c09;color:#b7ff3c;padding:18px 24px;">
        <span style="font-weight:700;font-size:16px;">2Brothers Services — New Project Inquiry</span>
      </div>
      <div style="padding:24px;">
        <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;color:#1c1f18;">
          ${fields
            .map(
              ([label, value]) => `
          <tr>
            <td style="padding:8px 8px 8px 0;width:42%;vertical-align:top;color:#6a7360;font-weight:600;">${escapeTelegramHtml(label)}</td>
            <td style="padding:8px 0;vertical-align:top;color:#1c1f18;">${escapeTelegramHtml(value)}</td>
          </tr>`
            )
            .join("")}
        </table>
        <div style="margin-top:16px;padding:14px 16px;background:#f4f5f0;border-left:3px solid #b7ff3c;border-radius:6px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6a7360;margin-bottom:6px;">Description</div>
          <div style="font-size:14px;color:#1c1f18;white-space:pre-wrap;">${escapeTelegramHtml(payload.description ?? "-")}</div>
        </div>
      </div>
      <div style="padding:12px 24px;background:#fafbf8;border-top:1px solid #e2e6da;font-size:12px;color:#9aa28d;">
        Sent from the 2Brothers Services website.
      </div>
    </div>
  </body>
</html>`;
}

async function deliverTelegram(payload: ContactPayload): Promise<void> {
  await sendTelegramMessage(buildTelegramHtml(payload));
}

async function deliverEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM ?? "2Brothers Services <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL_TO ?? siteConfig.email;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New 2Brothers Services inquiry from ${payload.name ?? "the website"}`,
      html: buildEmailHtml(payload),
      reply_to: payload.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}`);
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

  const submission: ContactPayload = {
    name: (payload.name ?? "").trim(),
    company: (payload.company ?? "").trim(),
    email: (payload.email ?? "").trim(),
    phone: (payload.phone ?? "").trim(),
    projectType: (payload.projectType ?? "").trim(),
    budget: (payload.budget ?? "").trim(),
    description: (payload.description ?? "").trim(),
  };

  if (!submission.name || !submission.description) {
    return NextResponse.json(
      { ok: false, error: "Name and description are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email ?? "")) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  const results: string[] = [];
  const errors: string[] = [];

  try {
    await deliverTelegram(submission);
    results.push("telegram");
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Telegram delivery failed");
  }

  try {
    await deliverEmail(submission);
    results.push("email");
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Email delivery failed");
  }

  if (results.length > 0) {
    return NextResponse.json({
      ok: true,
      delivered: results,
      warning: results.length === 2 ? null : "One delivery channel was unavailable.",
    });
  }

  console.error("[contact] all delivery channels failed", errors);
  return NextResponse.json(
    {
      ok: false,
      error: "Could not deliver the message.",
      hint: "Configure the contact delivery environment variables.",
    },
    { status: 502 }
  );
}
