# Premium Dental Website Design — Project Guide

A single-page React/Vite marketing site for an Australian dental practice. **Because this is a regulated health service advertisement, all copy, imagery, and features on this site must comply with AHPRA / the Health Practitioner Regulation National Law.** Read [.claude/context/ahpra-compliance.md](.claude/context/ahpra-compliance.md) before changing any user-visible content.

## Stack
- React 18 + TypeScript (strict) + Vite 6 (SWC)
- Tailwind CSS 3 + Radix UI / shadcn wrappers in [src/components/ui/](src/components/ui/)
- Motion (Framer Motion) for animation
- React Hook Form + Zod for the booking form
- Cloudinary for hero / transformation videos
- No router, no backend — single page, anchor links, booking wizard is a modal

## Scripts
- `npm run dev` — Vite dev server (port 3000)
- `npm run build` — production build to `dist/`
- No tests, no linter configured yet

## Structure
- [src/App.tsx](src/App.tsx) — section orchestrator
- [src/components/](src/components/) — section components (Hero, Services, ResultsGrid, Testimonials, TeamGrid, etc.)
- [src/components/booking/](src/components/booking/) — 5-step wizard + `BookingContext`
- [src/lib/availabilityEngine.ts](src/lib/availabilityEngine.ts) — hardcoded doctors/services + slot logic

## Hard rules for this codebase (AHPRA)

When writing or editing **any user-visible copy, imagery, or UI**:

1. **No testimonials or patient reviews anywhere on the site** (s.133(1)(c) National Law). This includes star ratings, patient quotes, "success stories", Google-review embeds, and social proof lifted from reviews. The existing `Testimonials.tsx` component and any patient-quote content is a compliance risk — flag it before adding to it.
2. **No before/after photos or videos of patients** without real, unaltered images, explicit disclaimers that results vary, and context (age, condition, treatment details). The `ResultsGrid` section must be reviewed against this.
3. **No prohibited language**: "guaranteed", "best", "pain-free", "risk-free", "perfect smile", "most advanced", "permanent", "instant results", "#1", "leading", "world-class" (unsubstantiated superlatives).
4. **No inducements**: no discounts, bundles, gifts, limited-time offers, referral rewards, "book now and save", free consults tied to a procedure.
5. **All clinical claims must be evidence-based** and, where appropriate, reference peer-reviewed sources. Prefer factual, descriptive language over marketing claims.
6. **Practitioner names** must appear with their AHPRA registration / qualifications where they are being advertised as providers.
7. **If you are unsure whether copy is compliant, flag it to the user — do not merge.**

See [.claude/context/ahpra-compliance.md](.claude/context/ahpra-compliance.md) for the full checklist, citations, and rewrite patterns. Use the `/ahpra-review` skill before shipping any copy change.

## Known gaps (non-compliance / tech debt)
- Booking form does not submit anywhere ([BookingDetailsStep.tsx](src/components/booking/steps/BookingDetailsStep.tsx) uses a fake `setTimeout`)
- [index.html](index.html) has no meta description, Open Graph, or `Dentist` JSON-LD
- No `loading="lazy"` on non-hero images
- No ESLint / Prettier / tests configured
- [vite.config.ts](vite.config.ts) has ~50 Radix version aliases left over from the Figma export — safe to clean up

## Conventions
- Prefer editing existing section components over adding new ones
- Tailwind utility classes only (no CSS modules, no inline `style` except dynamic values)
- Keep animations in Motion, not CSS keyframes, for consistency
- Image fallback via [src/components/figma/ImageWithFallback.tsx](src/components/figma/ImageWithFallback.tsx)
