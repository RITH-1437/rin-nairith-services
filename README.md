# RIN NAIRITH — Software Developer Services Website

A professional, technical, dark/light-themed landing page for a Software Developer. Built to turn social-media visitors into clients.

## 1. Project Overview

A single-page services website with a subtle animated network background and a clean black + lime + white + green identity. It presents who I am (RIN Nairith — Software Developer), the services I provide, real projects, starting prices, and multiple ways to get in contact.

## 2. Tech Stack

- Next.js (App Router)
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

Open [http://localhost:3000](http://localhost:3000).

## 5. Production Build

```bash
npm run build
npm start
```

## 6. Environment Variables

Create a `.env.local` file from the example:

```
# Public site URL (used for SEO, sitemap, and social sharing)
NEXT_PUBLIC_SITE_URL=https://rin-nairith.vercel.app

# Default contact destination email
NEXT_PUBLIC_CONTACT_EMAIL=nairithrin143@gmail.com
```

All variables are public-safe. No API keys are required for the first version.

## 7. Vercel Deployment

1. Push this repository to GitHub.
2. On [Vercel](https://vercel.com), click **New Project** and import the repository.
3. Vercel auto-detects Next.js — no configuration needed.
4. Add the environment variables under **Project → Settings → Environment Variables**.
5. Click **Deploy**.

The project is production-safe: no localhost-specific configuration and no hardcoded API keys.

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

Update these files to reflect your name, links, and projects. The contact form is frontend-only for now; connect it to an email service (e.g. Resend) or a backend API inside `components/Contact.tsx`.
