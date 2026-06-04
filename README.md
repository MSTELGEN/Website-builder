# ManyRituals — 7-Night Sleep Reset

A research-led, mobile-first web guide and interactive tracker built with Next.js 15 + Tailwind CSS.

## Tech choice

**Next.js (App Router) + TypeScript** — chosen over Astro because the interactive tracker requires client-side `localStorage` state and canvas-based share-card generation. Next.js gives us SSR for SEO on the guide pages while keeping the interactive components client-rendered. Tailwind CSS for all styling — no UI kit, custom brand tokens only.

---

## Getting started

```bash
cd manyrituals
npm install
cp .env.example .env.local   # fill in your Kit credentials
npm run dev                  # → http://localhost:3000
```

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel: **Add New Project** → import the repo → set **Root Directory** to `manyrituals`.
3. Add the three environment variables below.
4. Deploy.

## Deploy to Netlify

1. Push to GitHub.
2. New site → import → **Base directory**: `manyrituals`, **Build command**: `npm run build`, **Publish directory**: `.next`.
3. Add the Next.js runtime plugin (`@netlify/plugin-nextjs`) or use Netlify's auto-detection.
4. Add the environment variables below.

---

## Environment variables

| Variable | Where to find it | Required? |
|---|---|---|
| `NEXT_PUBLIC_KIT_FORM_ID` | Kit > Forms > [Your form] > Settings > **Form ID** | Yes |
| `KIT_API_SECRET` | Kit > Account Settings > Developer > **API Secret** | Yes |
| `NEXT_PUBLIC_KIT_WAITLIST_TAG_ID` | Kit > Subscribers > Tags > create tag `sleep-reset-waitlist` > note its ID | Optional |

**Never hardcode these values.** They must live in `.env.local` (local) or your hosting platform's environment variable UI (production).

---

## Routes

| Path | Description |
|---|---|
| `/` | Full guide: hero, how-to, 7 nights, tracker embed, waitlist |
| `/tracker` | Standalone interactive tracker |
| `/references` | Full citation list with status badges and PubMed links |

---

## Updating content before launch

- **Product name / price**: search for `[Product name and price TBC` in `components/WhatNext.tsx` — replace with final copy.
- **Instagram handle**: update `https://instagram.com/manyrituals` in `components/Footer.tsx` and `components/WhatNext.tsx`.
- **VERIFY citations**: open `lib/nights.ts` and confirm every citation tagged `VERIFY` against PubMed before publishing.

---

## Lighthouse targets

- Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ (mobile).
- Fonts loaded via `display=swap` to avoid layout shift.
- `prefers-reduced-motion` respected throughout (`.reveal` class skips animation; canvas share card is always functional).
- Semantic HTML throughout; all interactive elements keyboard-operable.
