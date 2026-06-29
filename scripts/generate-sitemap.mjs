/**
 * Generates public/sitemap.xml from the real routes + the pillar/sub-treatment
 * slugs defined in src/lib/pillar-fallbacks.ts, so the sitemap can never drift
 * from the actual site. Runs automatically before each build (see package.json).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://leichhardtdentist.com";

// Static, indexable routes (everything that isn't a /services/* page).
const staticPaths = ["/", "/about", "/contact", "/privacy", "/terms"];

// Sub-pages that resolve to a redirect — exclude so we never submit a 3xx.
const excludeSubKeys = new Set(["general-dentistry/ceramic-inlays-onlays"]);

// Parse the pillar (2-space `slug:`) and sub-treatment (6-space `slug:`) slugs
// directly from the source of truth.
const src = readFileSync(resolve(root, "src/lib/pillar-fallbacks.ts"), "utf8");
const pillars = [];
let current = null;
for (const line of src.split("\n")) {
  const pillar = line.match(/^ {2}slug:\s*"([^"]+)"/);
  if (pillar) {
    current = { slug: pillar[1], subs: [] };
    pillars.push(current);
    continue;
  }
  const sub = line.match(/^ {6}slug:\s*"([^"]+)"/);
  if (sub && current) current.subs.push(sub[1]);
}

const paths = [...staticPaths];
for (const p of pillars) {
  paths.push(`/services/${p.slug}`);
  for (const sub of p.subs) {
    if (excludeSubKeys.has(`${p.slug}/${sub}`)) continue;
    paths.push(`/services/${p.slug}/${sub}`);
  }
}

// De-dupe while preserving order.
const seen = new Set();
const ordered = paths.filter((p) => !seen.has(p) && seen.add(p));

const lastmod = new Date().toISOString().slice(0, 10);
const body = ordered
  .map((p) => `  <url>\n    <loc>${BASE}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written with ${ordered.length} URLs (${pillars.length} pillars)`);
