# RIN NAIRITH — Software Developer Services Website

A professional, technical, dark/light-themed landing page for a Software Developer. Built to turn social-media visitors into clients.

## 1. Project Overview

A single-page services website with a subtle animated network background and a clean black + lime + white + green identity. It presents who I am (RIN Nairith — Software Developer), the services I provide, real projects, starting prices, and multiple ways to get in contact. Visitors can submit a project inquiry directly from the site.

## 2. Tech Stack

- Next.js 16 (App Router, Turbopack)
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Framer Motion (subtle animations)

## 3. Installation

```bash
npm install
```

## 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the dev server warns about a "Slow filesystem", that is expected when the project lives on a network/Windows mount — it does not affect the build or production.

## 5. Production Build

```bash
npm run build
npm start
```

## 6. Environment Variables

Create a `.env` file from the example:

```
# Public site URL
SITE_URL=https://rin-nairith-services.vercel.app

# Telegram delivery (bot token + your personal chat ID)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=7523303813
TELEGRAM_WEBHOOK_SECRET=use-a-long-random-secret
# Optional comma-separated customer chat IDs; leave empty to accept all chats.
TELEGRAM_ALLOWED_CHAT_IDS=

# Email delivery via Resend
RESEND_API_KEY=re_xxxxxxxx

# Where the contact form email is sent
CONTACT_EMAIL_TO=nairithrin143@gmail.com
```

- **Telegram**: create a bot via [@BotFather](https://t.me/BotFather) and get your personal chat ID (e.g. contact [@userinfobot](https://t.me/userinfobot)).
- **Webhook**: set a long random `TELEGRAM_WEBHOOK_SECRET`; Telegram sends it in the `X-Telegram-Bot-Api-Secret-Token` header.
- **Resend**: create an API key at https://resend.com. The free "onboarding" sender works until you verify your own domain.
- `.env` must never be committed — it is already covered by `.gitignore`.

## 7. Contact Form and Telegram Bot Delivery

Submissions are posted to `POST /api/contact` (`app/api/contact/route.ts`), which delivers the inquiry:

1. **Telegram** — via the Bot API `sendMessage`, formatted as a monospace card.
2. **Email** — via the Resend REST API, formatted as a styled HTML email.

At least one channel must succeed for the form to show success; if only one channel delivers, the response includes a `warning` and the UI shows an amber note instead of a clean success.

### Customer messages from the Telegram bot

The server endpoint `POST /api/telegram/webhook` accepts Telegram updates and forwards text or photo-caption messages to `TELEGRAM_CHAT_ID`. It validates `TELEGRAM_WEBHOOK_SECRET`, escapes customer text, and optionally limits incoming chats with `TELEGRAM_ALLOWED_CHAT_IDS`.

After deploying, register the webhook once:

```bash
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  --data-urlencode "url=${SITE_URL}/api/telegram/webhook" \
  --data-urlencode "secret_token=${TELEGRAM_WEBHOOK_SECRET}"
```

To verify the registered URL and secret, run:

```bash
curl --silent "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo"
```

Run the commands with `SITE_URL`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_WEBHOOK_SECRET` exported in the shell.

Do not use `getUpdates` polling while this webhook is active. Telegram retries a failed webhook delivery, so the endpoint returns a server error when forwarding fails.

### Git push notifications

`.github/workflows/telegram-push-notification.yml` sends a Telegram message for every repository push. Add these repository secrets in GitHub: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. The workflow skips notification when either secret is missing.

## 8. Vercel Deployment

1. Push this repository to GitHub.
2. On [Vercel](https://vercel.com), click **New Project** and import the repository.
3. Vercel auto-detects Next.js — no configuration needed.
4. Add the same environment variables under **Project → Settings → Environment Variables** (`SITE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET`, `TELEGRAM_ALLOWED_CHAT_IDS`, `RESEND_API_KEY`, `CONTACT_EMAIL_TO`).
5. Deploy, then register the Telegram webhook with the command in section 7.
6. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as GitHub repository secrets for push notifications.

## Theme System

Dark and light themes are supported. Dark is the default. A toggle lives in the navbar, and the choice is persisted in `localStorage`; if nothing is stored, the user's system preference is used. A tiny inline script prevents a flash of the wrong theme on load.

All theme colors are defined as CSS variables in `app/globals.css` under `:root[data-theme="dark"]` and `:root[data-theme="light"]`, so updating the palette is a single-file change.

## Customization

All site content is stored in the `data/` folder:

- `site.ts` — name, role, location, description, social URLs
- `services.ts` — the six services
- `projects.ts` — real portfolio projects (GitHub + live URLs, statuses)
- `technologies.ts` — tech stack groups
- `pricing.ts` — pricing packages
- `faqs.ts` — FAQ questions
- `social.ts` — social links
- `branding.ts` — footer ASCII signature

The contact form and its serverless route live in `components/Contact.tsx` and `app/api/contact/route.ts`. Update the `data/` files to reflect your name, links, and projects.