# Adding videos to sub-treatment pages

The site supports a video on every sub-treatment page. Click the play button on the page, the video opens in a full-screen modal with native browser controls (no third-party branding, no recommended-videos panel after).

## Step 1 — Get the video into Cloudinary

We're already on Cloudinary (the homepage hero clip is hosted there). The free tier is generous and there's no fixed monthly cost.

**Web upload (one-off, ~30 sec per video):**

1. Sign in at [cloudinary.com/console](https://cloudinary.com/console) — same account that hosts the hero clip
2. Go to **Media Library** → drag-drop your `.mp4` (or `.mov`) into the `dental-website/` folder
3. Click the uploaded file → **Copy URL** → grab the `https://res.cloudinary.com/.../upload/.../filename.mp4` URL

**Bulk uploads (10+ videos at a time):**

The repo has an `upload-videos.js` script (already in `.gitignore`). Drop the `.mov`/`.mp4` files into `public/videos/` and run:

```bash
node upload-videos.js
```

It uploads each one and writes URLs into `cloudinary-urls.json` for you.

## Step 2 — Wire the video into a sub-treatment

Open Sanity Studio at `/studio` (sign in with the practice account):

1. **Service Pillars** → pick the relevant pillar (e.g. *Dental Implants*)
2. Scroll to **Sub-treatments** → expand the one you want a video on (e.g. *Single Tooth Implants*)
3. Paste the Cloudinary URL into the **Video URL** field
4. (Optional) **Video poster URL** — paste a still-frame URL to show as the thumbnail before the video opens. If empty, the sub-treatment's image is used as the poster.
5. Click **Publish**

The site picks it up immediately on next page load (CDN cache is 60s).

## Cloudinary tips for fast video

- **Format**: upload `.mp4` (H.264). MOV works but MP4 is smaller and supported everywhere.
- **Resolution**: 1080p is plenty. 4K is overkill for a website and 4× the bandwidth.
- **Duration**: shorter is better. Aim for 30–90s clips. A "what is All-on-4" explainer can be 60s; a procedure walk-through can be 2 min max.
- **Cloudinary auto-format**: Cloudinary automatically serves WebM/AV1 to browsers that support them. You don't need to upload multiple formats.
- **Compression**: don't pre-compress aggressively — Cloudinary handles compression. Upload the original quality.

## When you outgrow the free tier

Cloudinary free tier = 25 credits/month. Each credit ≈ 1 GB of bandwidth/storage/transformations. At ~10 MB per 30s clip and ~1500 video views per pillar per month, you have plenty of headroom.

If you ever exceed it:

- **Bunny.net Stream** — pay-as-you-go, ~$1 per 1,000 views. Cheapest paid option.
- **Cloudflare Stream** — $5/mo + usage. Built-in adaptive bitrate.

To switch providers, just paste the new direct video URL into the same Sanity field. The site doesn't care which CDN serves the video.

## What videos to prioritise

The All-on-4 page is the highest-impact spot. After that, in rough order of value:

1. `/services/dental-implants/all-on-4-implants` — overview of the journey
2. `/services/dental-implants/single-tooth-implants` — single-tooth procedure
3. `/services/single-visit-crowns/cerec-same-day-crowns` — a CEREC milling time-lapse would be perfect
4. `/services/same-day-smile/cerec-crowns-veneers`
5. `/services/general-dentistry/check-up-and-clean` — a "what to expect at your first visit" intro

The MediaBlock component shows the play button only when a video URL is set, so there's no dead state — empty videos = clean image. Add as you go.
