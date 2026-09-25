const TELEGRAM_API_BASE = "https://api.telegram.org";

export function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function truncateTelegramText(value: string, maxLength = 3500): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1))}…`;
}

type SendTelegramMessageOptions = {
  chatId?: string;
  disableWebPagePreview?: boolean;
};

export async function sendTelegramMessage(
  text: string,
  options: SendTelegramMessageOptions = {}
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = (options.chatId ?? process.env.TELEGRAM_CHAT_ID)?.trim();
  if (!token || !chatId) throw new Error("TELEGRAM env vars not set");

  const response = await fetch(
    `${TELEGRAM_API_BASE}/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: options.disableWebPagePreview ?? true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    }
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Telegram ${response.status}: ${body.slice(0, 500)}`);
  }
}
