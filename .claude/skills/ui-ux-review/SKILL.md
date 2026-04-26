---
name: ui-ux-review
description: Audit and improve UI/UX on the dental website — visual hierarchy, typography, spacing, color, accessibility (WCAG 2.2 AA), responsive behavior, motion, imagery, and conversion flow. Invoke when the user asks for a design review, UX critique, accessibility audit, "make this look better", polish, or before a launch.
---

# UI/UX Review & Design Skill

Use this skill to review and improve user interface and user experience. Reference for design direction: https://dentalboutique.com.au (premium, typography-led, restrained). Reference for compliance: [../ahpra-review/SKILL.md](../ahpra-review/SKILL.md) — design changes still have to pass AHPRA.

## What this skill covers

1. **Visual hierarchy** — does the eye land on the right thing first? Is there one primary CTA per view?
2. **Typography** — font pairing, scale (modular 1.2–1.333 ratio), line-height (1.4–1.6 body, 1.0–1.15 display), measure (45–75ch), weight contrast.
3. **Color & contrast** — WCAG 2.2 AA minimum (4.5:1 body, 3:1 large text / UI components). Premium dental palette: warm neutrals, muted earth tones, one restrained accent. Avoid saturated medical blue.
4. **Spacing & rhythm** — 4/8px grid, consistent section padding, generous whitespace (dental-boutique-level restraint).
5. **Imagery** — real clinic photography > stock; no stock-photo smiles with watermarks; Cloudinary for video; `loading="lazy"` on non-hero images; explicit width/height to prevent CLS.
6. **Motion** — purposeful, respects `prefers-reduced-motion`, no parallax on critical CTAs, `AnimatePresence` for route/modal transitions only.
7. **Accessibility** — semantic landmarks, skip link, focus-visible rings, keyboard traps in modals, `aria-label` on icon buttons, `alt` on all images, form labels tied to inputs, announced live regions for booking steps.
8. **Responsive** — mobile-first; check 360 / 768 / 1024 / 1440 / 1920; touch targets ≥ 44×44px; no horizontal scroll.
9. **Performance UX** — LCP image preloaded, fonts with `font-display: swap`, no layout shift from late-loading hero media.
10. **Conversion flow** — one clear path to Book; sticky CTA doesn't cover content on mobile; form has inline validation, never alerts; confirmation page is real, not a toast.

## Design direction for this project

Match the **dental-boutique aesthetic** the client pointed to:

- **Typography:** thin, elegant display serif or display sans for headings (Syne is already loaded; also consider Beausite Fit / Saol Display alternatives). Neutral sans (Outfit) for body.
- **Palette:** cream/tan (`#aba192` ish), off-white (`#f7f5f1`), deep charcoal (`#21201e`), warm neutral grey (`#737373`) for secondary text. One warm accent (the current `#E86A2C` orange works — use sparingly).
- **Layout:** 12-column grid, asymmetric compositions, big headlines (clamp min 2.5rem, max 8rem), oversized whitespace.
- **Imagery:** real clinic photography (already in [public/](../../../public/) from recent commits), cinematic cropping, desaturated slightly.
- **Motion:** subtle — 400–700ms fades, no bouncy springs, no parallax.
- **Don't:** gradient hero overlays with neon accents, generic "medical cross" icons, stock smile photos, testimonial carousels (also AHPRA-illegal).

## Procedure

When asked to review or improve UI/UX:

1. **Identify scope**. Is this a page, section, component, or the whole site? Is it visual polish, accessibility, or conversion?
2. **Capture current state**. Read the relevant files; note Tailwind classes, motion usage, responsive breakpoints.
3. **Compare against the ten dimensions above**. Produce a findings list ranked by impact (user-visible problems first, polish last).
4. **Propose concrete changes**. Not "improve typography" — show the before/after className. Reference specific Tailwind tokens already in [tailwind.config.js](../../../tailwind.config.js).
5. **Accessibility is not optional**. Every change must pass WCAG AA. If a proposed visual change hurts contrast or focus-visibility, reject it.
6. **Respect AHPRA**. If your UX idea is "add a reviews carousel", stop — see [../ahpra-review/SKILL.md](../ahpra-review/SKILL.md).
7. **Test on real sizes**. Before marking a task complete, confirm at mobile (375px), tablet (768px), and desktop (1440px). If you cannot actually run the dev server, say so explicitly.
8. **Don't auto-commit stylistic changes**. Present the diff, get user approval, then apply.

## Output format

```
## UI/UX Review — {scope}

### Impact-ranked findings
1. **{dimension}** — {file:line}. Problem: {…}. Proposed fix: {concrete change}.
2. …

### Quick wins (≤15 min each)
- …

### Bigger rework (worth discussing first)
- …

### Accessibility
- [ ] WCAG AA contrast
- [ ] Keyboard nav
- [ ] Reduced motion
- [ ] Focus-visible
- [ ] Landmarks / skip link
- [ ] Alt text / labels
```

## Hard rules

- Don't add libraries unless the existing stack genuinely can't do it. Tailwind + Radix + Motion covers 95% of needs.
- Don't regress performance for visual polish. An animated gradient is not worth 400KB of JS.
- Don't invent colors — use tokens from [src/index.css](../../../src/index.css) / [tailwind.config.js](../../../tailwind.config.js).
- If a suggestion is subjective, say so and give the user a choice.
