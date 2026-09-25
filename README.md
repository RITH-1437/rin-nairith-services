# 2Brothers Services

Official website for 2Brothers Services, a two-person digital solutions company focused on tailored websites, business management systems, AI applications, APIs, and cloud-supported software.

## Stack

- Next.js 16 App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation and production build

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and provide the values needed for contact delivery:

- `SITE_URL=https://2brothers-services.vercel.app`
- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` for Telegram delivery
- `TELEGRAM_WEBHOOK_SECRET` for the customer-message webhook
- `TELEGRAM_ALLOWED_CHAT_IDS` for optional customer chat filtering
- `RESEND_API_KEY` for email delivery
- `CONTACT_EMAIL_FROM` and `CONTACT_EMAIL_TO` for the verified sender and destination

Never commit `.env.local` or other secrets.

## Contact delivery

`POST /api/contact` accepts the contact form payload and attempts both Telegram and Resend delivery. The form reports success when at least one channel succeeds and returns a warning when only one channel is available.

`POST /api/telegram/webhook` accepts Telegram updates and forwards text or photo-caption messages to `TELEGRAM_CHAT_ID`. After deployment, register the webhook with the site URL and a long random `TELEGRAM_WEBHOOK_SECRET`.

## GitHub Actions

- `telegram-push-notification.yml` sends a Telegram notification for repository pushes when its repository secrets are configured.
- `ci.yml` runs install, lint, typecheck, and a production build for pushes and pull requests targeting `main`.
- `deploy.yml` builds and deploys `main` to Vercel after pull, or manually from the Actions tab.

Configure these GitHub repository secrets for Vercel deployment:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The Telegram notification workflow uses `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` repository secrets. The contact delivery variables belong in the Vercel project environment as well as the deployment environment when those features are used.

## Content model

Verified site content is kept in `data/`:

- `site.ts` — brand, description, location, and social links
- `services.ts` — service areas
- `projects.ts` — existing project records and links
- `technologies.ts` — technology groups
- `pricing.ts` — starting packages
- `collaborators.ts` — team profiles and links
- `faqs.ts` — frequently asked questions
- `social.ts` — contact channels

The site is a single-page experience. `app/sitemap.ts` intentionally includes only the canonical homepage; section links are anchors on that page rather than separate indexable URLs.
