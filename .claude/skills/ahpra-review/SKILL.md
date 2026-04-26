---
name: ahpra-review
description: Audit user-visible content on the dental website for AHPRA / National Law s.133 compliance — testimonials, superlatives, outcome guarantees, inducements, before/after imagery, and protected titles. Invoke before shipping any copy, image, or meta-tag change, or when the user asks to "check AHPRA", "compliance review", "review copy", or similar.
---

# AHPRA Compliance Review

Run this skill to audit the site for compliance with the Australian Health Practitioner Regulation National Law (s.133) and the AHPRA advertising guidelines. Full context and citations are in [../../context/ahpra-compliance.md](../../context/ahpra-compliance.md).

## When to run
- User asks for an AHPRA / compliance review
- Before merging any change that touches user-visible copy, alt text, meta tags, or imagery
- Before a launch / deploy
- When adding or modifying [Testimonials.tsx](../../../src/components/Testimonials.tsx), [ResultsGrid.tsx](../../../src/components/ResultsGrid.tsx), [TeamGrid.tsx](../../../src/components/TeamGrid.tsx), [ServicesSection.tsx](../../../src/components/ServicesSection.tsx), or [Hero.tsx](../../../src/components/Hero.tsx)

## Procedure

1. **Scope the audit**. If the user named specific files, audit those. Otherwise audit everything under [src/components/](../../../src/components/) plus [index.html](../../../index.html) and any public-facing JSON/markdown.

2. **Testimonials sweep** (s.133(1)(c) — highest risk).
   - Grep for: `testimonial`, `review`, `rating`, `stars`, `"` (inside JSX quoted copy attributed to a patient), patient first-name + last-initial patterns (`/[A-Z][a-z]+ [A-Z]\./`).
   - Flag every patient-attributed quote, star rating, numeric review score, and "success story" narrative. These are non-compliant regardless of consent.

3. **Prohibited-language sweep** (s.133(1)(a), (d)). Grep case-insensitive for:
   ```
   guarantee|\bbest\b|#1|leading|world[- ]?class|top[- ]?rated|
   pain[- ]?free|risk[- ]?free|permanent|\binstant\b|miracle|
   perfect smile|most advanced|cutting[- ]?edge|state[- ]?of[- ]?the[- ]?art|
   life[- ]?changing|transform your life
   ```
   For each hit, propose a factual rewrite.

4. **Inducement sweep** (s.133(1)(b)). Search for `$`, `%`, `free`, `discount`, `bundle`, `offer`, `save`, `limited time`, `referral`, `gift`. Flag any price-linked CTA.

5. **Before/after audit**. For every image/video in [ResultsGrid.tsx](../../../src/components/ResultsGrid.tsx) (and anywhere else):
   - Real, unaltered? (check alt text / filename for hints)
   - Patient age, condition, treatment, and timeframe shown?
   - "Individual results vary" disclaimer visible near the image?
   - Not paired with a patient quote?
   Any "no" → flag.

6. **Protected-title audit**. In [TeamGrid.tsx](../../../src/components/TeamGrid.tsx) and anywhere practitioners are named, flag uses of `specialist`, `specialises in`, `specialty` unless the context confirms AHPRA specialist registration.

7. **Claims / evidence audit**. For any clinical claim (efficacy, safety, speed, comfort), note whether evidence is cited or available. Unsupported clinical claims → flag.

8. **Meta-layer audit**. Check [index.html](../../../index.html) `<title>`, `<meta name="description">`, Open Graph tags, and any JSON-LD. Testimonials and superlatives leak into meta tags and social cards — audit those too.

## Output format

Produce a single report with these sections:

```
## AHPRA Review — {date}

### 🔴 Blocking issues (must fix before ship)
- [file:line](path#Lxx) — {what} — {which s.133 clause} — {suggested rewrite}

### 🟡 Review needed (judgement call)
- [file:line](path#Lxx) — {what} — {why it's borderline}

### 🟢 Clean
- {areas audited with no findings}

### Suggested rewrites
{before → after table for the biggest issues}
```

Use clickable `[file.ext:line](path#Lline)` links.

## Hard rules
- **Do not rewrite files automatically.** Present findings and proposed rewrites, then wait for the user to approve before editing.
- **When in doubt, flag.** False positives cost a conversation; a missed testimonial costs up to $120,000.
- **Remember**: consent from the patient does NOT make a testimonial compliant. Anonymising does NOT make it compliant. Paraphrasing does NOT make it compliant. Only removal does.
- This skill produces a working review, **not legal advice**. Always recommend the practice's indemnity insurer or a health-law solicitor review the site before launch.
