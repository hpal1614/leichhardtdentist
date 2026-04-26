# Deploy — Leichhardt Dental Website

End-to-end checklist for taking the rebuild live. Skim it before the first deploy, then again before any major content migration.

---

## 0. Prerequisites

- [ ] Production domain confirmed (assumed: `leichhardtdentist.com`)
- [ ] Hosting decided — **Vercel** (recommended) or **Netlify**. Both auto-build from git, handle HTTPS, CDN, and SPA routing.
- [ ] DNS credentials available for the production domain (to point A/CNAME records).

---

## 1. Build locally, one last time

```bash
npm install
npm run build
```

You should see `dist/` populated. Confirm no type errors and these files shipped:

- `dist/index.html`
- `dist/robots.txt`
- `dist/sitemap.xml`
- `dist/llms.txt`
- `dist/assets/*.js` (bundle chunks)
- `dist/assets/*.webp`, `.jpg` (compressed imagery)

---

## 2. Deploy the main site

### Option A — Vercel (fastest)

1. `npm install -g vercel` (if not installed)
2. From the project root: `vercel` (follow prompts; framework = Vite)
3. Add the production environment variables in Vercel dashboard → Project → Settings → Environment Variables:
   - `VITE_SANITY_PROJECT_ID` = `ez5kieuq`
   - `VITE_SANITY_DATASET` = `production`
4. Deploy to production: `vercel --prod`
5. Add custom domain in Vercel dashboard → Domains → add `leichhardtdentist.com` and `www.leichhardtdentist.com`.

### Option B — Netlify

1. Connect the git repo via Netlify dashboard.
2. Build command: `npm run build` · Publish directory: `dist`.
3. Add a `_redirects` file in `public/` with:
   ```
   /*  /index.html  200
   ```
   (SPA fallback so `/services/dental-implants` resolves without a 404 on refresh.)
4. Add `VITE_SANITY_PROJECT_ID` + `VITE_SANITY_DATASET` in Site Settings → Environment.

---

## 3. Wire up Sanity for production

The site is running the CMS against project **`ez5kieuq`** dataset **`production`**.

### 3a. CORS origins (required before the Studio works on the live URL)

Go to **[sanity.io/manage/project/ez5kieuq](https://www.sanity.io/manage/project/ez5kieuq)** → **API** tab → **CORS origins** → **Add CORS origin**.

Add each of these (tick **Allow credentials** on each):

- `https://leichhardtdentist.com`
- `https://www.leichhardtdentist.com`
- `https://leichhardtdentist.com/studio`
- `https://www.leichhardtdentist.com/studio`
- Any Vercel/Netlify preview URL you actively use (e.g. `https://leichhardt-dental.vercel.app`)

Already added locally: `http://localhost:3000` + `http://localhost:3000/studio`.

### 3b. Seed the singleton content

The site works with zero content in Sanity (it falls back to committed defaults), but here's what to create at launch for editability:

In [`/studio`](https://leichhardtdentist.com/studio) → **Practice Settings** → create the one document with: name, phone, email, address, hours, socials. Source the values from [`src/lib/practice.ts`](src/lib/practice.ts) as a starting point.

Then **Home Hero**, **Service Pillars** (4 — match the `number` fields 01-04 to the fallbacks), and **Clinicians** (3 — Nick marked as Principal).

### 3c. Invite the practice

sanity.io/manage → Members → Invite — send an invite to Dr. Nick's email. Role: **Editor** is enough; keep **Administrator** on your account.

---

## 4. Post-deploy sanity checks

Hit the live site and confirm:

- [ ] **Homepage loads** — hero video plays, bento grid renders, Nick's photo shows
- [ ] **Navigation works** on desktop + mobile hamburger
- [ ] **Services dropdown** links to all 4 pillars
- [ ] **Each pillar page** renders (test each slug)
- [ ] **Sub-treatment tags** on bento grid are clickable — each one loads its own page
- [ ] **About page** shows Nick's story + team grid
- [ ] **Contact page** — phone, email, map all work
- [ ] **Book buttons** — every "Book" CTA opens the D4W Centaur portal in a new tab
- [ ] **Privacy / Terms** pages load
- [ ] **404** — visit `/does-not-exist` → friendly NotFound page
- [ ] **`/robots.txt`** serves plain text
- [ ] **`/sitemap.xml`** serves XML
- [ ] **`/llms.txt`** serves plain text
- [ ] **Studio** at `/studio` — log in, verify no CORS errors

Then run the URL through these validators:

- [Google Rich Results Test](https://search.google.com/test/rich-results) — expect `Dentist` and `FAQPage` structured data detected
- [PageSpeed Insights](https://pagespeed.web.dev/) — aim for LCP < 2.5s, CLS < 0.1 on mobile
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — OG tags render
- [Twitter Card Validator](https://cards-dev.twitter.com/validator) — summary card renders

---

## 5. Submit to search engines

- **Google Search Console** — add property, verify via DNS or HTML file, submit `https://leichhardtdentist.com/sitemap.xml`
- **Bing Webmaster Tools** — same drill
- **Google Business Profile** — claim / update the existing listing so the site URL points to the new domain

---

## 6. AHPRA / legal review before launch

Don't go live until:

- [ ] Solicitor has signed off on [src/pages/Privacy.tsx](src/pages/Privacy.tsx) and [src/pages/Terms.tsx](src/pages/Terms.tsx) drafts
- [ ] Practice's indemnity insurer (Guild, Dental Protection) has reviewed the site against AHPRA advertising guidelines
- [ ] `TransformationGallery` images are either real cases with signed consent OR the section is removed. Current Unsplash placeholders are **not compliant** for launch.

---

## 7. Ongoing

- **Content updates** → Sanity Studio, no redeploy needed (CDN cache ~60s)
- **Code updates** → push to main; Vercel/Netlify redeploys automatically
- **Booking portal changes** → edit [`src/lib/booking.ts`](src/lib/booking.ts) `BOOKING_URL`
- **Contact info updates** → Practice Settings in Sanity (updates Footer + Contact + JSON-LD simultaneously)
- **Adding a new sub-treatment** → add to that pillar's sub-treatments array in Sanity with a unique slug; the route handles it automatically

---

## 8. Known non-critical follow-ups

- Replace Silvina + Leah's portrait placeholders with real headshots (Clinicians in Sanity → upload portrait)
- Swap `TransformationGallery` Unsplash images for real clinic photos (with patient consent)
- Add per-sub-treatment videos (paste Cloudinary/Vimeo URLs into each sub-treatment's `videoUrl` field in Sanity)
- Run Lighthouse once more after deploy — image optimization has taken us from 5MB of hero assets to 1.7MB, but fonts are still a ~100KB download on first paint; could be subset further if needed
