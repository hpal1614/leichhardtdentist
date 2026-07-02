# Premium Dental Website Design — Project Guide

A multi-page React/Vite marketing site for an Australian dental practice (Leichhardt Dental Centre). **Because this is a regulated health service advertisement, all copy, imagery, and features on this site must comply with AHPRA / the Health Practitioner Regulation National Law.** Read [.claude/context/ahpra-compliance.md](.claude/context/ahpra-compliance.md) before changing any user-visible content.

> **Operating protocol:** This project is managed for a non-technical owner. Before investigating or changing anything, follow [.claude/context/working-protocol.md](.claude/context/working-protocol.md) — evidence over assumption, read before you change, investigate→plan→approve→change→verify, stay in scope, never publish without permission. These rules bind the main assistant and every sub-agent.

## Stack
- React 18 + TypeScript (strict, enforced via `npm run typecheck`) + Vite 6 (SWC)
- react-router-dom 7 (`createBrowserRouter`, client-rendered SPA — no SSR/prerender)
- Tailwind CSS 3 + a minimal shadcn set in [src/components/ui/](src/components/ui/) (accordion + button only)
- Motion (Framer Motion) for animation; `MotionConfig reducedMotion="user"` in App.tsx
- Sanity CMS (`useSanityDoc` + static fallbacks in `src/lib/*-fallbacks.ts`; Studio mounted at `/studio`)
- Cloudinary for all video + most imagery (`src/lib/cloudinary.ts` adds `q_auto,f_auto,vc_auto,w_,c_limit`)
- Booking = external Centaur/D4W portal via `src/lib/booking.ts` (`BOOKING_LINK_PROPS`); contact form posts to FormSubmit (`ENQUIRY_DELIVERY_EMAIL` in `src/lib/practice.ts`)
- Deployed on Vercel (`vercel.json` rewrites everything to `index.html`)

## Scripts
- `npm run dev` — Vite dev server (port 3000)
- `npm run build` — regenerates `public/sitemap.xml` then builds to `dist/`
- `npm run typecheck` — `tsc --noEmit` (run before committing; there is no CI)
- `npm run sync-media` / `npm run seed` — Cloudinary/Sanity utilities (need `.env`)
- No tests, no ESLint/Prettier configured yet

## Structure
- [src/routes.tsx](src/routes.tsx) — all routes; Home eager, everything else lazy
- [src/pages/](src/pages/) — Home, About, Contact, Privacy, Terms, NotFound, Studio + [src/pages/services/](src/pages/services/) (4 pillar pages, SubTreatmentPage catch-all, bespoke All-on-4 + Overdentures landing pages)
- [src/components/](src/components/) — section components (Hero, ServicesSection, ResultsGrid, TeamSection/TeamGrid, ClinicExperience, BookingSection…)
- [src/components/layout/](src/components/layout/) — SiteLayout (skip link, Navbar/Footer, analytics), PageHero, ScrollToHash
- [src/components/service/](src/components/service/) — service-page building blocks (MediaBlock, ProcessSteps, RisksSection, PricingCards, FAQ, CTA)
- [src/lib/](src/lib/) — Sanity client + queries, content fallbacks (`pillar-fallbacks.ts`, `clinician-fallbacks.ts`), `practice.ts` (single source of truth for phone/address/hours), `cloudinary.ts`, `booking.ts`, `analytics.ts`, `useAmbientVideo.ts`
- Content lives BOTH in `src/lib/*-fallbacks.ts` AND in Sanity — copy fixes must be applied in both places or the CMS will keep serving the old text

## Hard rules for this codebase (AHPRA)

When writing or editing **any user-visible copy, imagery, or UI**:

1. **No testimonials or patient reviews anywhere on the site** (s.133(1)(c) National Law). This includes star ratings, patient quotes, "success stories", Google-review embeds, and social proof lifted from reviews. `ResultsGrid`'s `Story` type still has empty `patient`/`quote` fields — never populate them.
2. **No before/after photos or videos of patients** without real, unaltered images, explicit disclaimers that results vary, and context (age, condition, treatment details). Keep the "individual results vary" disclaimers under every gallery.
3. **No prohibited language**: "guaranteed", "best", "pain-free", "risk-free", "perfect smile", "most advanced", "permanent", "instant results", "#1", "leading", "world-class" (unsubstantiated superlatives).
4. **No inducements**: no discounts, bundles, gifts, limited-time offers, referral rewards, "book now and save", free consults tied to a procedure.
5. **All clinical claims must be evidence-based** and, where appropriate, reference peer-reviewed sources. Prefer factual, descriptive language over marketing claims.
6. **Practitioner names** must appear with their AHPRA registration / qualifications where they are being advertised as providers, and the credential string must be identical everywhere it appears.
7. **If you are unsure whether copy is compliant, flag it to the user — do not merge.**

See [.claude/context/ahpra-compliance.md](.claude/context/ahpra-compliance.md) for the full checklist, citations, and rewrite patterns. Use the `/ahpra-review` skill before shipping any copy change.

## Known gaps (non-compliance / tech debt)
- **Open AHPRA copy findings from the July 2026 audit are NOT yet fixed** (in both `src/lib/*-fallbacks.ts` and Sanity): "registered specialist prosthodontist" claim must be verified against the AHPRA register and made consistent site-wide; free-consultation inducements; "permanent seal"/"100% of the infection"/"world-class"/"guaranteeing… perfect" language; "Stories of Transformation" video soundtracks need a testimonial check.
- Pure client-side rendering: per-route meta/JSON-LD only exist after JS runs, so AI crawlers and social scrapers see an empty shell — prerendering the ~27 routes is the known fix.
- `public/llms.txt` lists a non-existent "Single Visit Crowns" pillar and omits Orthodontics; claims BreadcrumbList schema that isn't implemented.
- Sanity Studio (5.3 MB lazy chunk) ships on the marketing domain at `/studio`; ideally move to a separate subdomain (`sanity deploy`).
- Contact-form leads deliver to a personal Gmail via free FormSubmit; move to a practice-controlled inbox / accountable form backend.
- `useSanityDoc` has no cache/dedup — the homepage fires the clinicians query 3× and practice settings up to 7×.
- `styled-components` looks unused in src/ but is a required peer dependency of Sanity Studio — do not remove it.
- No ESLint / Prettier / tests / CI.

## Conventions
- Prefer editing existing section components over adding new ones
- Tailwind utility classes only (no CSS modules, no inline `style` except dynamic values)
- Use `text-primary-bright` (not `text-primary`) for small orange text on dark `#1a1a1a` sections — the default primary fails WCAG contrast there
- Fonts are loaded per-weight in [src/index.css](src/index.css) — if you use a new `font-*` weight, import that weight or the browser will synthesize it
- Ambient/looping videos: no `autoPlay` attribute — use `useAmbientVideo` (`src/lib/useAmbientVideo.ts`) + `preload="none"` + a Cloudinary poster so nothing downloads until near the viewport
- Keep animations in Motion, not CSS keyframes; JS smooth-scrolling must check `prefersReducedMotion()`
- Image fallback via [src/components/figma/ImageWithFallback.tsx](src/components/figma/ImageWithFallback.tsx)
- Phone/address/hours/booking URL only ever come from `src/lib/practice.ts` / `src/lib/booking.ts`
