# Sanity CMS — setup & first-time wiring

This project ships with an embedded Sanity Studio at `/studio`. When configured, the practice can edit every piece of content (hero copy, pillars, team bios, case studies, NAP, hours, socials) from a drag-and-drop admin — no code changes, no redeploys needed for content updates.

## Step 1 — create the Sanity project (one-time, ~5 min)

1. Sign up for a free account at **https://www.sanity.io/manage** (free tier is generous — 3 users, 500k API requests/mo, 10GB assets).
2. In the dashboard, click **+ Create new project**.
3. Name it **Leichhardt Dental** (or whatever). Pick dataset name **production**.
4. Copy the **Project ID** from the project overview page.

## Step 2 — local environment (~2 min)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Paste your Project ID:
   ```
   VITE_SANITY_PROJECT_ID=abc123xyz
   VITE_SANITY_DATASET=production
   ```
3. Restart the dev server (`npm run dev`). Visit [`http://localhost:3000/studio`](http://localhost:3000/studio) — the Studio should load and prompt you to log in.

## Step 3 — CORS (~1 min)

Sanity needs to know which domains can talk to it. In **sanity.io/manage → your project → API → CORS Origins**, add:

- `http://localhost:3000` (dev)
- `http://localhost:3000/studio` (dev studio)
- `https://leichhardtdentist.com` (production, once deployed)
- Any staging URLs

Tick **"Allow credentials"** for the studio URLs so authoring works.

## Step 4 — seed initial content (~15 min)

Once logged into the Studio, create the first documents:

- **Practice Settings** (singleton): fill in name, phone, email, address, hours, socials. This is the source of truth for the footer, contact page, and JSON-LD schema.
- **Home Hero** (singleton): headline, subhead, video URL, primary/secondary CTA labels, trust card.
- **Service Pillars** (4 documents — one per pillar): General Dentistry, Dental Implants, Single Visit Crowns, Same Day Smile. Each has sub-treatments, process steps, FAQs, risks, and CTA copy.
- **Clinicians**: Dr. Nick (mark as Principal), Dr. Silvina, Dr. Leah.

The page components fall back to the hardcoded defaults already in the repo — nothing breaks if content isn't yet entered.

## Step 5 — deploy the Studio (optional, ~5 min)

Two options:

- **Embedded (default):** The Studio lives at `/studio` on the main site. Convenient but means staff log into the same URL as the public site. Adequate for a small practice.
- **Standalone:** Run `npx sanity deploy` from the project root to push the Studio to a dedicated `*.sanity.studio` URL. Recommended for production — staff don't need to touch the public site.

## Architecture

- **Schemas** live in [sanity/schemas/](../sanity/schemas/). Each schema maps one content type to a field configuration.
- **Studio config** in [sanity.config.ts](../sanity.config.ts) — plugins, singleton locking, structure tree.
- **Client** in [src/lib/sanity.ts](../src/lib/sanity.ts) — exports `sanity` client, `urlFor` image builder, and `safeFetch` that returns `null` when Sanity isn't configured (components then fall back to their static defaults).
- **Route** in [src/pages/Studio.tsx](../src/pages/Studio.tsx) — mounts `<Studio config={config} />` at `/studio` inside the normal SiteLayout.

## Progressive migration

Pages are migrated one at a time to pull from Sanity. Each page starts out using hardcoded content, and is incrementally refactored to fetch from the CMS. The pattern:

```tsx
// before
const hero = { headline: "Dentistry,\nled by Dr. Nick.", ... }

// after
const remote = await safeFetch<HomeHero>(HOME_HERO_QUERY)
const hero = remote ?? FALLBACK_HERO
```

If the fetch fails (network error, CMS not configured, bad query), the page still renders with sensible defaults. This means you can deploy Sanity incrementally without breaking the site.

## Adding a new schema

1. Create `sanity/schemas/myType.ts` using `defineType`.
2. Register it in `sanity/schemas/index.ts`.
3. Add it to the structure list in `sanity.config.ts` if it needs custom placement.
4. Write a GROQ query in the component that consumes it.

## Publishing workflow

Every document has **Draft** and **Published** states. Staff edit the draft, click **Publish**, and the CDN picks up the change within seconds (because `useCdn: true` in the client — cached for 60s globally).

## If something breaks

- **Studio won't load** — check `.env`, check CORS, check you're logged into the right Sanity account.
- **Site shows stale content** — hard-refresh; CDN cache is 60s.
- **"Project not found"** — wrong Project ID in `.env`.
- **"Not authorized"** — the Sanity account you're logged into doesn't have access to the project. Invite yourself from the project dashboard.
