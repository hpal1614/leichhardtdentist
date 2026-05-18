# Website Content from Nick — Organised for Implementation

Source: emails forwarded from `leichhardtdentist@gmail.com`, originally sent by
**Dr Nick Kulkarni** (`mosmandentalsurgery@gmail.com`). Two batches:

- **20 Apr 2026** — 5 items, full text was in the email body → **captured below**.
- **12 May 2026** — 9 items, sent as **`.docx` attachments with empty email bodies** →
  **content could not be extracted** (see "Still Needed" at the end).

---

## ⚠️ AHPRA COMPLIANCE — READ BEFORE PUBLISHING

This is a regulated health-service advertisement. **None of the copy below is
publish-ready as written.** Nick's drafts contain multiple breaches of the
Health Practitioner Regulation National Law s.133 and the project's hard rules
(see `CLAUDE.md` / `.claude/context/ahpra-compliance.md`). Run `/ahpra-review`
and rewrite the flagged lines **before** any of this goes on the site.

Recurring problems across the drafts:

| Issue | Where it appears |
|---|---|
| Prohibited word **"permanent"** | All-on-X page, FAQ, Journey |
| Prohibited superlatives: "surgical excellence", "gold standard", "Key Opinion Leader", "masterpiece" | All-on-X page, Journey |
| **Inducement** — free/"complimentary" assessment "Valued at $500" tied to a procedure | All-on-X page |
| **Outcome guarantees** — "beautiful smile and a brand-new outlook on life", "transformed the lives of patients" | All-on-X page, Surgery prep |
| Near-**"pain-free"** claim — "you will not feel pain" | FAQ |
| Clinical claims (e.g. "98% survival at 10 years") cited to **competitor blogs, not peer-reviewed sources** | FAQ |

Each section below has an inline **⚠️ Flags** list. Treat the text as *source
material to rewrite*, not final copy.

---

## 1. All-on-X / All-on-4 Page Draft

> Email: "draft for all in 4 page" — 20 Apr 2026, 7:10 pm
> Target in codebase: a new All-on-X service page —
> `ServicePageHero.tsx` + `ProcessSteps.tsx` + `ServiceFAQ.tsx` +
> `ServiceCTA.tsx`, linked from `ServicesSection.tsx`.

**Hero**
- H1: All-on-X Full Arch Restoration | Leichhardt Dental Centre
- Tagline: "A Permanent Smile Transformation. Guided by Expertise."
- Intro: "The Inner West's centre for surgical excellence. Led by Dr Nick
  Kulkarni, we combine advanced on-site technology with the gentle,
  evidence-based care our community has trusted for over a decade."
- CTA button: "Claim Your Complimentary All-on-4 Assessment"

**Meet Your Surgeon: Dr Nick Kulkarni**
- "With over 20 years of international experience across four continents, Dr
  Nick Kulkarni (BDS, Grad Dip Clin Dent Oral Implants, University of Sydney)
  is a widely regarded Key Opinion Leader in implant dentistry."
- "…the founder of First Implant, Dr Nick regularly mentors and conducts
  hands-on training for fellow dentists…"
- Fellow of the International Congress of Oral Implantologists (ICOI)
- University of Sydney Graduate Diploma in Oral Implants
- Misch Implant Institute (USA) and Walpole Institute (London) trained

**The Leichhardt Standard: Technology & Care**
- On-Site 3D CBCT Imaging + CEREC 3D system; sub-millimetre accuracy;
  diagnostics in-house, no external referrals.

**Treatment Roadmap — Pricing**
- Phase 1: The Initial Transformation — **Investment: $19,500 AUD**
  - Immediate Load: provisional teeth placed within 24–48 hours of surgery
  - Clinical accuracy via in-house 3D CBCT
- Phase 2: The Definitive Upgrade (typically 3–6 months later)
  - Option 1 — Titanium Signature: **$8,000 AUD** (titanium bar + PMMA acrylic)
  - Option 2 — Zirconia Prestige: **$10,000 AUD** (monolithic zirconia)

**The Comprehensive Assessment (Valued at $500)**
- Complimentary; Clinical consult with Dr Nick + on-site 3D CBCT + tailored
  fixed-price plan.
- Note (Nick's): "Our 3D CBCT scans … are not available for external download
  or transfer."

**Supportive, Judgment-Free Environment**
- IV Sedation / "Sleep Dentistry" options for anxious patients, failing
  bridges, loose dentures.

**Inquiry form / footer**
- Fields: Name | Phone | Email; "Tell us your goal" dropdown: Replace failing
  teeth / Fix loose dentures / Full smile makeover
- Footer: Leichhardt Dental Centre | Shop 4/39-45 Norton St, Leichhardt |
  (02) 9568 3593 | Nobel Biocare Trained Team

**⚠️ Flags:** "Permanent Smile Transformation", "surgical excellence", "Key
Opinion Leader", "gold standard in aesthetics", "masterpiece" → prohibited
superlatives / unsubstantiated. **"Complimentary assessment … Valued at $500"
tied to treatment = inducement (s.133).** Pricing display itself is allowed but
must be clear and not bundled with the inducement framing.

---

## 2. Process / Timeline — "The Path to Your New Smile"

> Email: "step by step journey with timelines for all on x" — 20 Apr 2026, 7:22 pm
> Target: `ProcessSteps.tsx` (or `WhatToExpect.tsx`).

- **Step 1 — Clinical Assessment (Day 1):** complimentary consult with Dr Nick;
  on-site 3D CBCT scan; suitability confirmed; fixed-price quote.
- **Step 2 — Surgical Appointment:** chosen sedation level; 4–6 titanium
  implants placed; Sleep Dentistry option.
- **Step 3 — Phase 1, Immediate Smile (24–48 h):** long-term provisional
  bridge (high-strength acrylic) fitted; soft-food diet.
- **Step 4 — Healing & Integration (3–6 months):** osseointegration; minor
  check-ups.
- **Step 5 — Phase 2, Definitive Upgrade:** final impressions;
  Titanium Signature (PMMA) or Zirconia Prestige.
- **Summary:** Total surgical time 2–4 h · First smile 24–48 h · Final upgrade
  3–6 months post-healing.

**⚠️ Flags:** "permanent part of your jawbone", "final, permanent teeth …
designed to last for decades" → "permanent" is prohibited + longevity outcome
claim. "masterpiece bridge" → puffery. "complimentary consultation" tied to
treatment → inducement risk.

---

## 3. FAQ — All-on-X Surgery & Recovery

> Email: "faq" — 20 Apr 2026, 7:17 pm
> Target: `ServiceFAQ.tsx` + `FAQStructuredData.tsx`.

1. **Am I a candidate if I have significant bone loss?** — All-on-4 angles rear
   implants to use denser front-jaw bone, often avoiding grafting; confirmed via
   on-site CBCT.
2. **How long do All-on-4 implants last?** — "titanium posts designed to be a
   permanent, life-long solution"; "clinical studies show survival rates of over
   98% after 10 years"; bridge typically upgraded/replaced every 10–15 years.
3. **What can I eat immediately after surgery?** — Liquid diet 24–72 h, then
   fork-mashable soft foods; avoid hard/crunchy/sticky for 3 months
   (osseointegration).
4. **How do I clean teeth that don't come out?** — Soft brush twice daily +
   water flosser / "X-Floss"; bridge designed with hygiene access.
5. **Will I be in pain during/after?** — Under local anaesthetic or IV
   sedation; "you will not feel pain during the process"; OTC pain relief;
   swelling peaks day 2–3, subsides within a week.
6. **Is there an age limit?** — No upper age limit; based on health + jawbone;
   "successfully transformed the lives of patients in their 70s, 80s".

Nick's cited sources (NOT peer-reviewed — competitor clinic blogs):
nextsmile.com.au, myimplantdentist.com.au, mountlawleydental.com.au,
darchdental.com.au, collingwooddentist.com.au.

**⚠️ Flags:** "permanent, life-long solution" → prohibited word + unqualified
longevity. "you will not feel pain" → near "pain-free", prohibited.
"98% survival at 10 years" → clinical claim needs a **peer-reviewed** citation,
not competitor blogs (hard rule 5). "transformed the lives of patients" →
outcome/testimonial-style claim.

---

## 4. Additional FAQ — Alternatives to All-on-X

> Email: "more faq" — 20 Apr 2026, 7:18 pm
> Target: same as section 3.

- **Q: Is All-on-X my only option?** — A: No. Determined at on-site CBCT
  assessment. Alternatives: single/multiple implants or implant-supported
  bridges; implant-retained "snap-on" overdentures (2–4 implants);
  traditional crown & bridge; advanced periodontal therapy to save natural
  teeth. "We only recommend All-on-X when it is the most predictable and
  long-term solution."

**⚠️ Flags:** Lower risk. "most predictable and long-term solution" — soften to
avoid an unsubstantiated superlative; keep the evidence-based framing.

---

## 5. Patient Resource — Surgery Day Preparation Checklist

> Email: "Surgery day prep guide" — 20 Apr 2026, 7:26 pm
> Target: a patient-resources / pre-op block (consider `WhatToExpect.tsx` or
> `FirstVisitSection.tsx`).

- **1. Grocery & Nutrition:** high-protein shakes, Greek yoghurt, apple sauce;
  smooth soups (no chunks/seeds); coconut water/electrolytes; eggs, avocado,
  mashed potato for Day 3+.
- **2. Home Comfort:** 2–3 firm pillows (elevation reduces swelling);
  podcasts/audiobooks/movies; 2+ ice packs.
- **3. Pharmacy:** fill any pre-op prescriptions; lip balm/Vaseline;
  extra ultra-soft toothbrush.
- **4. Logistics:** if IV sedation, a responsible adult must drive you home and
  stay 4–6 h (no taxi/rideshare alone); loose clothing/rollable sleeves;
  fasting ~6 h if sedated; leave valuables at home.
- **5. Mental prep:** keep the goal in mind.

**⚠️ Flags:** "stress-free transformation" and "you will have a fixed,
beautiful smile and a brand-new outlook on life" → outcome guarantee, rewrite.
Rest is practical/low-risk.

---

## Still Needed — 9 documents not retrievable (12 May 2026)

These were sent as **`.docx` attachments with no email body text**. The
available email tools cannot download attachments and the connected Drive is a
different account, so the content could not be read.

| # | Email subject | Attachment | Likely website target |
|---|---|---|---|
| 1 | dental implant page draft | `dental implants.docx` | Implants service page (`ServicesSection.tsx` / service/*) |
| 2 | dental Bridge additional write up | `dental bridge.docx` | Bridges service content |
| 3 | Write up on Root canal Treatment | `Root canal treatment.docx` | Root canal service content |
| 4 | write up on dental fillings | `Dental fillings.docx` | Fillings service content |
| 5 | inlay and onlay | `inlay onlay.docx` | Inlay/Onlay service content |
| 6 | dr Nick bio | `dr nick bio.docx` | `TeamGrid.tsx` / `ClinicianPortrait.tsx` |
| 7 | Dr Silvina Bio | `dr silvina bio.docx` | `TeamGrid.tsx` / `ClinicianPortrait.tsx` |
| 8 | dr leah bio | `dr leah bio.docx` | `TeamGrid.tsx` / `ClinicianPortrait.tsx` |
| 9 | Dr Sagar (Jimmy) Bio | `dr jimmy bio.docx` | `TeamGrid.tsx` / `ClinicianPortrait.tsx` |

**To get this content, pick one:**
- Re-send each as the **email body text** (not an attachment), or
- Paste the document text into chat, or
- Share the `.docx` files into the Google Drive account connected to this tool,
  or upload them to the repo and I'll parse them.
