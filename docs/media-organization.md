# Media organisation — Cloudinary folder map

This is the folder structure on Cloudinary for **every video and every image** the website serves. Each folder maps to a specific section / page / sub-treatment so Nick can drag-drop a file into the right place and it appears in the right slot on the site automatically.

**Cloudinary cloud:** `dzydzte9h`

**URL pattern:** `https://res.cloudinary.com/dzydzte9h/{image|video}/upload/{folder-path}/{filename}.{ext}`

---

## Folder map

```
dental-website/
│
├── home/                            HOME PAGE
│   ├── hero/                        ← /  (top of homepage)
│   │   ├── ambient.{mov|mp4}        ← background video (currently in use)
│   │   └── poster.jpg               ← still frame fallback
│   │
│   ├── case-studies/                ← homepage "Clinical Cases" section
│   │   ├── case-1.mp4
│   │   ├── case-2.mp4
│   │   ├── case-3.mp4
│   │   ├── placeholder-1.mp4        (current placeholder)
│   │   └── full-walkthrough.mp4     (full-length HQ version)
│   │
│   ├── philosophy/                  ← homepage "philosophy" background
│   │   └── background.jpg
│   │
│   └── clinic-experience/           ← homepage "Our Space" section
│       ├── reception.jpg
│       ├── treatment-room.jpg
│       └── waiting-area.jpg
│
├── team/                            TEAM SECTION + ABOUT PAGE
│   ├── nick/
│   │   ├── editorial.jpg            ← large editorial portrait (TeamSection)
│   │   ├── trust-card.jpg           ← small square headshot (Hero pill)
│   │   └── about-portrait.jpg       ← About page sticky portrait
│   ├── silvina/
│   │   └── portrait.jpg
│   └── leah/
│       └── portrait.jpg
│
├── clinic/                          GENERAL CLINIC PHOTOGRAPHY
│   ├── exterior.jpg
│   ├── reception-detail.jpg
│   ├── treatment-room-1.jpg
│   └── ...                          (drop any non-section-specific photos here)
│
└── services/                        4 SERVICE PILLARS
    │
    ├── general/                     /services/general-dentistry
    │   ├── hero/
    │   │   ├── pillar.jpg           ← bento card on home + page hero
    │   │   └── intro.mp4            ← optional explainer video
    │   ├── check-up-and-clean/      /services/general-dentistry/check-up-and-clean
    │   │   ├── thumbnail.jpg
    │   │   ├── poster.jpg
    │   │   └── video.mp4
    │   ├── dental-fillings/
    │   │   ├── thumbnail.jpg
    │   │   └── video.mp4
    │   ├── dental-bridges/
    │   ├── wisdom-teeth/
    │   ├── root-canal/
    │   └── preventative-and-family/
    │
    ├── implants/                    /services/dental-implants
    │   ├── hero/
    │   │   ├── pillar.jpg
    │   │   └── intro.mp4
    │   ├── single-tooth/            /services/dental-implants/single-tooth-implants
    │   │   ├── thumbnail.jpg
    │   │   └── video.mp4
    │   ├── overdentures/
    │   │   ├── thumbnail.jpg
    │   │   └── video.mp4
    │   └── all-on-4/                /services/dental-implants/all-on-4-implants
    │       ├── hero.mp4             ← top of the dedicated landing page
    │       ├── poster.jpg
    │       ├── procedure-walkthrough.mp4
    │       ├── before-and-after.jpg
    │       └── ...                  (the flagship — multiple assets expected)
    │
    ├── crowns/                      /services/single-visit-crowns
    │   ├── hero/
    │   ├── cerec-same-day/
    │   │   ├── thumbnail.jpg
    │   │   └── video.mp4
    │   ├── digital-impressions/
    │   └── inlays-onlays/
    │
    └── same-day-smile/              /services/same-day-smile
        ├── hero/
        ├── cerec-crowns-veneers/
        ├── whitening/
        ├── bonding/
        ├── gum-contouring/
        └── scale-and-polish/
```

---

## Quick reference — which folder for which page?

| Site location | Cloudinary folder |
|---|---|
| Homepage hero ambient video | `dental-website/home/hero/` |
| Homepage Clinical Cases section (3 clips) | `dental-website/home/case-studies/` |
| Homepage philosophy background | `dental-website/home/philosophy/` |
| Homepage clinic experience photos | `dental-website/home/clinic-experience/` |
| Bento card image for a pillar (e.g. General Dentistry) | `dental-website/services/{pillar}/hero/pillar.jpg` |
| Sub-treatment thumbnail (card on pillar page) | `dental-website/services/{pillar}/{sub}/thumbnail.jpg` |
| Sub-treatment lightbox video | `dental-website/services/{pillar}/{sub}/video.mp4` |
| Sub-treatment video poster (preview frame) | `dental-website/services/{pillar}/{sub}/poster.jpg` |
| Dr. Nick's portraits | `dental-website/team/nick/` |
| Dr. Silvina's portrait | `dental-website/team/silvina/portrait.jpg` |
| Dr. Leah's portrait | `dental-website/team/leah/portrait.jpg` |
| About page Nick portrait | `dental-website/team/nick/about-portrait.jpg` |
| About page clinic strip | `dental-website/clinic/` (any image) |

---

## How Nick uploads & wires a video / image

### 1. Upload to Cloudinary
1. Sign in at [cloudinary.com/console](https://cloudinary.com/console) (cloud `dzydzte9h`)
2. Open the **Media Library**
3. Navigate to the right folder (or create it by uploading into a typed-in path)
4. Drag-drop the file
5. Click the file → **Copy URL**

### 2. Paste the URL into Sanity Studio
1. Go to `/studio` on the site (e.g. `https://leichhardtdentist.com/studio` once deployed, or `http://localhost:3001/studio` in dev)
2. Sign in with the practice's Sanity account
3. Pick the right document. Common ones:
   - **Practice Settings** — site-wide info
   - **Home Hero** — homepage hero copy & video URL
   - **Service Pillars → [pillar name] → Sub-treatments → [sub] → videoUrl / imageUrl** — for any sub-treatment media
   - **Clinicians → [name] → portrait** — for team photos
4. Paste the Cloudinary URL into the **Video URL** or **Image URL** field
5. **Publish**

### 3. Live within 60 seconds
The site's CDN cache for Sanity content is 60 seconds. Refresh the page and the new media appears.

---

## Naming conventions

Keep filenames lowercase with hyphens (no spaces, no caps):

✅ `nick-portrait.jpg` · `single-tooth-thumbnail.jpg` · `all-on-4-walkthrough.mp4`
❌ `Nick Portrait.JPG` · `IMG_1234.MOV` · `single tooth thumbnail.jpg`

**Standard filenames per folder:**

| File | When to use |
|---|---|
| `pillar.jpg` | The big card image for a pillar (used in homepage bento + pillar page hero) |
| `thumbnail.jpg` | Card image for a sub-treatment (4:3 ratio works best) |
| `poster.jpg` | Still frame shown before a video plays |
| `video.mp4` | The main video for a sub-treatment |
| `hero.mp4` | A featured / top-of-page video (for landing pages like All-on-4) |
| `intro.mp4` | A short pillar-level explainer video |

---

## Format & size recommendations

### Video
- **Format:** MP4 (H.264). MOV works but MP4 is universally supported.
- **Resolution:** 1080p (1920×1080). 4K is overkill and 4× the bandwidth.
- **Length:** 30–90 seconds for thumbnails / explainer clips. Up to 2 minutes for procedure walkthroughs.
- **Size:** Aim for under 80 MB per clip (Cloudinary free-tier upload cap is 100 MB, so leave headroom).
- **Compression:** if a clip is over 100 MB, compress with HandBrake (free, GUI) or this `ffmpeg` command:
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 24 -c:a aac -b:a 128k output.mp4
  ```

### Images
- **Format:** JPG for photographs, PNG for logos / graphics with transparency, WebP if you have it.
- **Resolution:** 2400px on the long edge is plenty. Cloudinary auto-resizes for different screen sizes.
- **Don't pre-compress aggressively** — Cloudinary handles compression on its end.

---

## What's already there

```
dental-website/home/hero/ambient.mov              7.1 MB   ← homepage hero video (current)
dental-website/home/case-studies/placeholder-1.mp4 40 MB    ← ResultsGrid placeholder (current)
dental-website/home/case-studies/full-walkthrough.mp4 60 MB ← HQ version (available)
```

Everything else is empty and ready for Nick to populate.

---

## Bulk uploading

For uploading many files at once (e.g. after a photo shoot), use the script:

```bash
# 1. Drop files into public/videos/ (videos) or public/images/ (images — create folder)
# 2. Run:
node --env-file=.env upload-videos.js
```

The script reads everything in `public/videos/` and uploads each to Cloudinary, returning URLs in `cloudinary-urls.json`. You'd still need to paste the URLs into Sanity manually.

For one-off uploads, the Cloudinary web dashboard is easier.

---

## When you outgrow the free tier

Cloudinary free tier = 25 credits/month (~25 GB combined bandwidth + storage + transformations).

At ~10 MB per 30s clip and a busy month, you might serve ~2,500 video plays before hitting the cap. If you exceed it:

- **Bunny.net Stream** — pay-as-you-go (~$1 per 1,000 views), cheapest paid option
- **Cloudflare Stream** — $5/month + usage, includes adaptive bitrate

Migration is just changing URLs in Sanity — no code changes required.
