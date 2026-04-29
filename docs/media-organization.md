# Media organisation — page-by-page folder map

Folders are organised **by page**, then **by section within each page**. Drag a video or image into the matching subfolder and it shows up in that section of that page.

The same folder structure exists in three places — they mirror each other:

| Location | Path | Who touches it |
|---|---|---|
| **Google Drive** | `My Drive/media/` | Dr. Nick uploads here |
| **Your Mac** (auto-synced) | `~/Library/CloudStorage/GoogleDrive-.../My Drive/media/` and the project's `media/` | You see Nick's uploads here once Drive desktop has synced |
| **Cloudinary** | `dental-website/...` | Where the website actually serves from after `npm run sync-media` |

---

## The full folder map

```
media/
│
├── home/                         ← homepage  (/)
│   ├── hero/                       Big top section — ambient video + Nick trust card
│   ├── philosophy/                 "Gentle. Caring. Precision Dentistry." background
│   ├── services-bento/             4 pillar tile images (the big bento grid)
│   ├── clinic-experience/          "Our Space" photo grid
│   └── case-studies/               Clinical Cases video carousel (3 clips)
│
├── about/                        ← /about page
│   ├── nick-portrait/              Sticky editorial portrait
│   ├── values/                     Four-values cards (icons today; image option future)
│   ├── team/                       3-clinician team grid
│   └── clinic-strip/               21:9 banner near the bottom
│
├── contact/                      ← /contact page
│                                   (no media slots currently — folder reserved)
│
├── general-dentistry/            ← /services/general-dentistry pillar page
│   ├── pillar-hero/                Top of the pillar page + bento card on home
│   ├── check-up-and-clean/         Sub-treatment page (its own URL)
│   ├── dental-fillings/            Sub-treatment page
│   ├── dental-bridges/
│   ├── wisdom-teeth/
│   ├── root-canal/
│   └── preventative-and-family/
│
├── dental-implants/              ← /services/dental-implants pillar page
│   ├── pillar-hero/
│   ├── single-tooth/               /services/dental-implants/single-tooth-implants
│   └── overdentures/               /services/dental-implants/implant-supported-overdentures
│
├── all-on-4/                     ← /services/dental-implants/all-on-4-implants  (FLAGSHIP)
│   ├── hero/                       Top of page (currently uses clinic-2 photo)
│   ├── meet-your-dentist/          Nick credentials section
│   ├── technology/                 CBCT / CEREC / Sedation cards
│   ├── pricing/                    Two-phase treatment roadmap section
│   ├── journey/                    The 5-step "Path to Your New Smile"
│   ├── prep-checklist/             Surgery-day prep cards (5 cards)
│   ├── consultation/               "A conversation, not a commitment" card
│   └── final-cta/                  Bottom CTA banner
│
├── single-visit-crowns/          ← /services/single-visit-crowns pillar page
│   ├── pillar-hero/
│   ├── cerec-same-day/             Sub-treatment page
│   ├── digital-impressions/
│   └── inlays-onlays/
│
├── same-day-smile/               ← /services/same-day-smile pillar page
│   ├── pillar-hero/
│   ├── cerec-crowns-veneers/
│   ├── whitening/
│   ├── bonding/
│   ├── gum-contouring/
│   └── scale-and-polish/
│
└── shared/                       ← assets used across multiple pages
    ├── team-nick/                  Nick's portraits — Hero trust card, TeamSection,
    │                               About-page sticky, ServiceCTA card, AllOnFour
    ├── team-silvina/               TeamGrid (home) + About team grid
    ├── team-leah/                  TeamGrid (home) + About team grid
    └── clinic/                     General clinic photography (interior, exterior)
```

---

## Naming files

Use lowercase + hyphens. No spaces, no caps:

✅ `nick-portrait.jpg` · `walkthrough.mp4` · `before-and-after-1.jpg`
❌ `Nick's Portrait.JPG` · `IMG_1234.MOV` · `before and after.jpg`

Within each folder, conventional filenames the team can rely on:

| Filename pattern | When to use |
|---|---|
| `hero.{jpg,mp4}` | The lead/featured asset of the section |
| `pillar.jpg` | Pillar tile image (used on home bento + pillar page hero) |
| `thumbnail.jpg` | The card image on a sub-treatment grid |
| `poster.jpg` | Still frame shown before a video plays |
| `video.mp4` | The main video for that section |
| `intro.mp4` | A short explainer / overview clip |
| `case-1.mp4`, `case-2.mp4`, … | Numbered clips when multiple of the same kind exist |

---

## Format & size

### Video
- **MP4 (H.264)** preferred. MOV works.
- **1080p** (1920×1080). 4K is overkill.
- **30–90s** for thumbnails / explainers, up to 2 min for procedure walk-throughs.
- **Under 80 MB** ideally. The sync script auto-compresses anything over 80 MB with ffmpeg.

### Images
- **JPG** for photos, **PNG** for logos with transparency.
- **2400px** on the long edge is plenty. Cloudinary auto-resizes.
- Don't pre-compress aggressively — Cloudinary handles it.

---

## The whole workflow, end-to-end

```
 ┌────────────────────────────────────────────────┐
 │  Nick uploads to Drive                         │
 │  e.g.  My Drive/media/all-on-4/journey/        │
 │              walkthrough.mp4                   │
 └─────────────────────┬──────────────────────────┘
                       │ Google Drive Desktop syncs
                       ▼
 ┌────────────────────────────────────────────────┐
 │  ~/Library/CloudStorage/GoogleDrive-.../       │
 │      My Drive/media/all-on-4/journey/          │
 │           walkthrough.mp4                      │
 │  appears on your Mac's filesystem              │
 └─────────────────────┬──────────────────────────┘
                       │ you run:  npm run sync-media
                       ▼
 ┌────────────────────────────────────────────────┐
 │  Script reads Drive folder (MEDIA_DIR in .env) │
 │  → compresses any video > 80 MB with ffmpeg    │
 │  → uploads to Cloudinary at:                   │
 │      dental-website/all-on-4/journey/          │
 │           walkthrough.mp4                      │
 │  → prints paste-ready URL                      │
 └─────────────────────┬──────────────────────────┘
                       │
                       ▼
 ┌────────────────────────────────────────────────┐
 │  https://res.cloudinary.com/dzydzte9h/         │
 │      video/upload/dental-website/all-on-4/     │
 │           journey/walkthrough.mp4              │
 └─────────────────────┬──────────────────────────┘
                       │ paste into Sanity Studio
                       ▼
                Live on the website
```

### `.env` (one-time, on your Mac)

```
MEDIA_DIR=/Users/himanshupal/Library/CloudStorage/GoogleDrive-info.firstimplant@gmail.com/My Drive/media
CLOUDINARY_CLOUD_NAME=dzydzte9h
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Once that's in `.env`, all you ever run is:

```bash
npm run sync-media
```

---

## Where each Cloudinary URL ends up on the site

This is the reverse lookup — given a section, what URL gets pasted where in Sanity Studio?

| Page | Section | Cloudinary path | Sanity field |
|---|---|---|---|
| Home | Hero ambient video | `home/hero/ambient.mp4` | Home Hero → Background video URL |
| Home | Hero trust card portrait | `shared/team-nick/trust-card.jpg` | Home Hero → Trust card portrait |
| Home | Philosophy background | `home/philosophy/background.jpg` | (currently a hardcoded local asset; future: Sanity field) |
| Home | Services bento (4 tiles) | `home/services-bento/{general,implants,crowns,same-day-smile}.jpg` | Each Service Pillar → Image |
| Home | Clinic experience | `home/clinic-experience/*.jpg` | (currently hardcoded; future: Sanity gallery) |
| Home | Case studies | `home/case-studies/case-{1,2,3}.mp4` | (currently hardcoded; future: Sanity case-study schema) |
| About | Nick portrait | `shared/team-nick/about-portrait.jpg` | Clinician (Nick) → Portrait |
| About | Team grid | `shared/team-{nick,silvina,leah}/portrait.jpg` | Each Clinician → Portrait |
| About | Clinic strip | `shared/clinic/*.jpg` | (currently hardcoded) |
| Pillar page hero (any) | Top image | `{pillar-name}/pillar-hero/pillar.jpg` | Service Pillar → Image |
| Sub-treatment page | Hero image | `{pillar-name}/{sub-treatment}/thumbnail.jpg` | Service Pillar → Sub-treatment → Image URL |
| Sub-treatment page | Hero video | `{pillar-name}/{sub-treatment}/video.mp4` | Service Pillar → Sub-treatment → Video URL |
| Sub-treatment page | Video poster | `{pillar-name}/{sub-treatment}/poster.jpg` | Service Pillar → Sub-treatment → Video poster URL |
| All-on-4 (flagship) | Top hero video | `all-on-4/hero/hero.mp4` | (currently hardcoded; future: Sanity field) |
| All-on-4 (flagship) | Meet your dentist | `shared/team-nick/all-on-4.jpg` | (currently uses default Nick portrait) |
| All-on-4 (flagship) | Procedure walkthrough | `all-on-4/journey/walkthrough.mp4` | (currently hardcoded; future: Sanity field) |

---

## Free tier capacity

Cloudinary free tier = 25 credits/month (~25 GB combined bandwidth + storage + transformations).

At ~10 MB per 30s clip and a busy month, you can serve roughly 2,500 video plays before hitting the cap. If you exceed it:

- **Bunny.net Stream** — pay-as-you-go (~$1 per 1,000 views)
- **Cloudflare Stream** — $5/month + usage, includes adaptive bitrate

Migration is just changing URLs in Sanity. No code changes.
