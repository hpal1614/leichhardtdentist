/**
 * Checks Dr. Nick's YouTube channel for uploads that aren't in
 * `src/lib/youtube-fallbacks.ts` yet.
 *
 *   npm run sync-youtube
 *
 * It does two things:
 *   1. Refreshes the TITLES of videos already on the site, straight from
 *      YouTube — so renaming a video on YouTube renames it on the site.
 *   2. Reports full videos on the channel that aren't on the site yet, and
 *      prints a ready-to-paste entry for each.
 *
 * It never PUBLISHES a video on its own: a new upload only goes live once
 * someone adds it to the list. Rebuild/redeploy for changes to reach the
 * live site.
 *
 * Vertical Shorts are filtered out — the site publishes full videos only, so
 * Shorts are counted and skipped rather than offered.
 *
 * Reads the public channel feed — no API key, no quota, no credentials.
 * Note: YouTube's feed only returns the ~15 most recent uploads, so older
 * videos won't be listed as "new".
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(resolve(root, "src/lib/youtube-fallbacks.ts"), "utf8");

const channelId = (source.match(/YOUTUBE_CHANNEL_ID\s*=\s*"([^"]+)"/) || [])[1];
if (!channelId) {
  console.error("Could not find YOUTUBE_CHANNEL_ID in src/lib/youtube-fallbacks.ts");
  process.exit(1);
}

// Pull the curated entries straight out of the source file (no TS build step).
// Only the exported YOUTUBE_VIDEOS array counts. Dev-only preview samples live
// in their own const and must never be treated as published videos.
const listStart = source.indexOf("export const YOUTUBE_VIDEOS");
const listEnd = listStart === -1 ? -1 : source.indexOf("\n];", listStart);
if (listStart === -1 || listEnd === -1) {
  console.error("Could not find the YOUTUBE_VIDEOS array in src/lib/youtube-fallbacks.ts");
  process.exit(1);
}
const list = source.slice(listStart, listEnd);

const curated = [...list.matchAll(/\{\s*id:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?\}/g)].map(
  (m) => ({
    id: m[1],
    title: m[2].replace(/\\"/g, '"'),
    hidden: /hidden:\s*true/.test(m[0]),
  })
);

/** The exact YouTube title, via the public oEmbed endpoint (no API key). */
async function fetchTitle(id) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.title === "string" ? data.title : null;
  } catch {
    return null;
  }
}

const fmtDuration = (seconds) => {
  const n = Number(seconds);
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
};

async function describe(id) {
  let duration = "?";
  let orientation = "landscape";
  try {
    const watch = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await watch.text();
    const len = (html.match(/"lengthSeconds":"(\d+)"/) || [])[1];
    if (len) duration = fmtDuration(len);
    // A real Short serves 200 at /shorts/<id>; anything else redirects to /watch.
    const probe = await fetch(`https://www.youtube.com/shorts/${id}`, { redirect: "manual" });
    if (probe.status === 200) orientation = "short";
  } catch {
    /* network hiccup — reported as "?" rather than guessed */
  }
  return { duration, orientation };
}

const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
const res = await fetch(feedUrl);
if (!res.ok) {
  console.error(`Could not read the channel feed (HTTP ${res.status}).`);
  process.exit(1);
}
const xml = await res.text();

const feed = xml
  .split("<entry>")
  .slice(1)
  .map((entry) => ({
    id: (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1],
    title: (entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "",
    published: ((entry.match(/<published>(.*?)<\/published>/) || [])[1] || "").slice(0, 10),
  }))
  .filter((v) => v.id);

// ── 1. Refresh the titles of videos already on the site ──────────────────────
const renamed = [];
let updatedList = list;
for (const video of curated) {
  const title = await fetchTitle(video.id);
  if (!title || title === video.title) continue;
  // Rewrite just this entry's title, leaving the rest of the file untouched.
  const entry = new RegExp(
    `(id:\\s*"${video.id}",\\s*\\n\\s*title:\\s*)"(?:[^"\\\\]|\\\\.)*"`
  );
  if (!entry.test(updatedList)) continue;
  updatedList = updatedList.replace(entry, `$1${JSON.stringify(title)}`);
  renamed.push({ from: video.title, to: title });
  video.title = title;
}
if (renamed.length > 0) {
  writeFileSync(
    resolve(root, "src/lib/youtube-fallbacks.ts"),
    source.slice(0, listStart) + updatedList + source.slice(listEnd)
  );
}

const known = new Set(curated.map((v) => v.id));
const shown = curated.filter((v) => !v.hidden);

// Look up anything we haven't seen before, then drop the Shorts.
const unseen = [];
for (const video of feed.filter((v) => !known.has(v.id))) {
  unseen.push({ ...video, ...(await describe(video.id)) });
}
const fresh = unseen.filter((v) => v.orientation !== "short");
const skippedShorts = unseen.length - fresh.length;

console.log("");
console.log(`  Channel feed     ${feed.length} recent upload(s)`);
console.log(`  On file          ${curated.length}  (${shown.length} shown, ${curated.length - shown.length} hidden)`);
console.log("");
console.log("  Showing on the website right now:");
for (const v of shown) console.log(`    • ${v.title}`);
console.log("");

if (renamed.length > 0) {
  console.log(`  ✎ Updated ${renamed.length} title(s) from YouTube:`);
  for (const r of renamed) {
    console.log(`      was:  ${r.from}`);
    console.log(`      now:  ${r.to}`);
  }
  console.log("    Rebuild to push these to the live site.");
  console.log("");
}

if (skippedShorts > 0) {
  console.log(`  Skipped          ${skippedShorts} new Short(s) — the site publishes full videos only`);
  console.log("");
}

if (fresh.length === 0) {
  console.log("  ✓ No new videos. Nothing to do.");
  console.log("");
  process.exit(0);
}

console.log(`  ! ${fresh.length} video(s) NOT on the site yet:`);
console.log("");
for (const v of fresh) {
  const { duration } = v;
  const looksAutoTitled = /^\d{1,2} \w+ \d{4}$/.test(v.title.trim());
  console.log(`    ${v.title}${looksAutoTitled ? "   <-- auto-generated title, needs a real one" : ""}`);
  console.log(`    uploaded ${v.published} · ${orientation} · ${duration}`);
  console.log("");
  console.log("    Paste into src/lib/youtube-fallbacks.ts to show it:");
  console.log("");
  console.log(`      {`);
  console.log(`        id: "${v.id}",`);
  console.log(`        title: ${JSON.stringify(v.title)},`);
  console.log(`        duration: "${duration}",`);
  console.log(`      },`);
  console.log("");
}
console.log("  Until then, these stay off the website.");
console.log("");
