# AHPRA / National Law Compliance Context

This site advertises a **regulated health service** (dentistry) in Australia. Every piece of user-visible content — copy, images, videos, meta tags, structured data, social share text — is subject to:

- **Section 133 of the Health Practitioner Regulation National Law** (advertising offences)
- **AHPRA Guidelines for advertising a regulated health service** (current revision)
- Australian Consumer Law (misleading & deceptive conduct)
- The Dental Board of Australia's professional standards

Penalties (from Sept 2025): up to **$60,000 per offence for an individual, $120,000 for a body corporate**, plus disciplinary action against the registered practitioner.

The "advertiser" (whoever controls the content) is liable. For this site, that's the practice — and by extension, us.

---

## Section 133 prohibitions — what advertising MUST NOT do

An advertisement of a regulated health service must not:

| § | Prohibition | What this means on the site |
|---|-------------|-----------------------------|
| 133(1)(a) | Be false, misleading or deceptive, or likely to be | No unsupported claims, no puffery dressed as fact |
| 133(1)(b) | Offer a gift, discount or other inducement without terms | No "$99 checkup", "free whitening with veneers", "book now save $X", limited-time offers, referral rewards |
| 133(1)(c) | **Use testimonials or purported testimonials** | **No patient quotes, reviews, star ratings, success stories, "before I came here…" narratives — anywhere, including social share cards** |
| 133(1)(d) | Create an unreasonable expectation of beneficial treatment | No "perfect smile guaranteed", "pain-free", "permanent results", "risk-free" |
| 133(1)(e) | Directly or indirectly encourage indiscriminate or unnecessary use of a health service | No pushing of elective treatment via urgency tactics |

---

## Specific content rules for this site

### Testimonials (the biggest risk on this codebase)

- [src/components/Testimonials.tsx](../../src/components/Testimonials.tsx) in its current form is **non-compliant**. Patient quotes and star ratings are testimonials per s.133(1)(c), even if paraphrased or anonymised.
- Third-party reviews **on platforms the practice does not control** (Google, Facebook) are exempt — but we **must not** embed, scrape, or republish them on the website.
- Acceptable alternatives: factual statements about the practice ("Established 2009", "Accredited by [body]"), clinician qualifications, practice awards from regulated bodies, neutral case-study *descriptions* without patient identification or outcome claims.

### Before/after imagery

- [src/components/ResultsGrid.tsx](../../src/components/ResultsGrid.tsx) needs audit. Before/after is not outright banned, but it must:
  - Be real, unaltered, and typical (no cherry-picking or AI enhancement)
  - Include context: patient age, condition, treatment performed, timeframe
  - Carry a clear disclaimer: *"Individual results vary. This is not a guarantee of outcome."*
  - Not be paired with patient quotes (that turns it into a testimonial)
- When in doubt, remove rather than qualify.

### Prohibited / high-risk words (grep these before shipping)

```
guarantee(d)?   best   #1   leading   world[- ]?class   top[- ]?rated
pain[- ]?free   risk[- ]?free   permanent   instant   miracle
perfect smile   most advanced   cutting[- ]?edge   state[- ]?of[- ]?the[- ]?art
transform your life   life[- ]?changing
```

These aren't auto-illegal but each triggers a compliance review and usually needs a rewrite.

### Inducements (s.133(1)(b))

Anything of the form "offer + price/gift/discount + call to action" is suspect. If commercial offers are needed, they require the full terms, qualifying conditions, expiry, and may still be disallowed for some procedure types. Default: don't advertise price on the site.

### Practitioner information

When naming a dentist (e.g. in [src/components/TeamGrid.tsx](../../src/components/TeamGrid.tsx)):

- Use their registered name
- State their AHPRA registration category (e.g. "Dentist") — not self-declared specialties unless they hold the specialist registration
- "Specialist", "Specialises in", "Specialist in [field]" are **protected titles** — only usable if the practitioner holds specialist registration in that field

### Scope claims

- Don't claim the practice "specialises in" a treatment area unless a registered specialist in that field practices there
- "Cosmetic dentistry", "smile makeover" are marketing terms, not specialties — fine to describe, but don't imply a cosmetic-dentistry specialty (it doesn't exist in the AHPRA register)

---

## Rewrite patterns

| Non-compliant | Compliant rewrite |
|---|---|
| "Sarah L. — 'They gave me the perfect smile I always wanted. Life-changing!'" | *Remove entirely.* |
| "#1 rated dental clinic in Sydney" | "Dental clinic serving Sydney since 20XX" |
| "Pain-free dentistry, guaranteed" | "We offer a range of techniques, including [local anaesthesia / sedation where indicated], to help manage discomfort" |
| "Get a perfect smile — book your free consult today" | "Book a consultation to discuss treatment options suitable for you" |
| "$500 off Invisalign this month" | *Remove, or replace with non-price CTA* |
| "Our advanced laser technology gives instant results" | "We use [specific named technology], which [factual description of what it does]" |

---

## Checklist before merging any copy / image / video change

- [ ] No patient quotes, reviews, stars, or success stories (incl. alt text, meta description, OG tags)
- [ ] No superlatives without evidence (best, #1, leading, most advanced…)
- [ ] No outcome guarantees (guaranteed, permanent, pain-free, risk-free…)
- [ ] No discounts, gifts, bundles, limited-time offers, referral rewards
- [ ] Any before/after imagery has context + disclaimer + is real and typical
- [ ] Clinical claims cite or can be backed by peer-reviewed evidence
- [ ] "Specialist" only used for practitioners with specialist registration
- [ ] Risks / material information disclosed for any procedure discussed in depth
- [ ] Practitioner names carry registration category where advertised as providers

---

## Sources

- [AHPRA — Guidelines for advertising a regulated health service](https://www.ahpra.gov.au/Resources/Advertising-hub/Advertising-guidelines-and-other-guidance/Advertising-guidelines.aspx)
- [AHPRA — Advertising and the law](https://www.ahpra.gov.au/Resources/Advertising-hub/Advertising-guidelines-and-other-guidance/Advertising-and-the-law.aspx)
- [AHPRA — Testimonials: Understand the requirements](https://www.ahpra.gov.au/Resources/Advertising-hub/Resources-for-advertisers/Testimonial-tool.aspx)
- [AHPRA — Summary of the advertising requirements](https://www.ahpra.gov.au/Resources/Advertising-hub/Advertising-guidelines-and-other-guidance/Summary-of-the-advertising-requirements.aspx)
- [AHPRA — Compliance and enforcement strategy](https://www.ahpra.gov.au/Resources/Advertising-hub/Advertising-complaints/Advertising-compliance-and-enforcement-strategy.aspx)
- [Jensen et al. (2023), Australian Dental Journal — Advertising and general dental practice: how compliant are practice websites in Australia](https://onlinelibrary.wiley.com/doi/full/10.1111/adj.12953)

This document is a working reference — not legal advice. Before launch, have the site reviewed by the practice's professional indemnity insurer (e.g. Guild, Dental Protection) or a health-law solicitor.
