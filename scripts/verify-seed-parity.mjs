/**
 * Verify that what `npm run seed` would write to Sanity is identical to what
 * the site actually renders from its static fallbacks.
 *
 * Why this exists: the seed content used to be a hand-maintained duplicate of
 * src/lib/*-fallbacks.ts. It drifted. By August 2026 the dataset still held
 * pre-audit wording ("optimal breathing position", "affordable, immediate
 * smile enhancement") and was missing pricing the live pages showed, so
 * enabling the CMS would have quietly rewritten a live health-service ad.
 *
 * Sanity overrides the fallbacks per field, so parity is the whole safety
 * property: if this passes, turning the CMS on changes nothing visible.
 *
 *   node scripts/verify-seed-parity.mjs      (exit 0 = in sync, 1 = drift)
 *
 * Needs no .env and no token — it only builds documents and compares them.
 */

import { execFileSync } from "child_process";
import { mkdtempSync, rmSync, readFileSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { pathToFileURL } from "url";

const ASSET_LOADERS = {
  ".webp": "text", ".jpg": "text", ".jpeg": "text",
  ".png": "text", ".svg": "text", ".avif": "text", ".gif": "text",
};

async function loadTs(entry) {
  const { build } = await import("esbuild");
  const dir = mkdtempSync(join(tmpdir(), "verify-parity-"));
  const outfile = join(dir, "bundle.mjs");
  try {
    await build({
      entryPoints: [entry], outfile, bundle: true, format: "esm",
      platform: "node", logLevel: "error",
      loader: ASSET_LOADERS, define: { "import.meta.env": "{}" },
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const norm = (t) =>
  String(t ?? "")
    .replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[—–]/g, "-")
    .replace(/\s+/g, " ").trim();

/** Portable-text blocks or plain strings -> comparable plain text. */
const text = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return norm(v);
  if (Array.isArray(v)) {
    if (v.length && v[0] && typeof v[0] === "object" && v[0]._type === "block")
      return norm(v.map((b) => (b.children || []).map((c) => c.text).join("")).join("\n"));
    return norm(v.map(text).join("\n"));
  }
  return norm(JSON.stringify(v));
};

const diffs = [];
const walk = (a, b, path) => {
  if (JSON.stringify(a) === JSON.stringify(b)) return;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      diffs.push(`${path}: LENGTH site=${a.length} seed=${b.length}`);
    for (let i = 0; i < Math.max(a.length, b.length); i++)
      walk(a[i], b[i], `${path}[${i}]`);
    return;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)]))
      walk(a[k], b[k], `${path}.${k}`);
    return;
  }
  diffs.push(
    `${path}\n      site: ${JSON.stringify(a)?.slice(0, 140)}\n      seed: ${JSON.stringify(b)?.slice(0, 140)}`
  );
};

const step = (s) => ({ title: norm(s.title), description: text(s.description) });
const faq = (f) => ({ q: norm(f.q), a: text(f.a) });

const canonSub = (s) => ({
  name: norm(s.name),
  description: text(s.description),
  longDescription: text(s.longDescription),
  whatToExpect: (s.whatToExpect || []).map(text),
  risksContent: text(s.risksContent),
  pricing: (s.pricing || []).map((p) => ({
    name: norm(p.name), price: norm(p.price), description: text(p.description),
  })),
  processSteps: (s.processSteps || []).map(step),
  faqs: (s.faqs || []).map(faq),
});

const canonPillar = (p) => ({
  number: norm(p.number), title: norm(p.title),
  tagline: text(p.tagline), shortDescription: text(p.shortDescription),
  intro: text(p.intro), risksContent: text(p.risksContent),
  ctaHeadline: text(p.ctaHeadline), ctaSubhead: text(p.ctaSubhead),
  secondaryProcessTitle: text(p.secondaryProcessTitle),
  processSteps: (p.processSteps || []).map(step),
  secondaryProcessSteps: (p.secondaryProcessSteps || []).map(step),
  faqs: (p.faqs || []).map(faq),
  subs: (p.subTreatments || []).map(canonSub),
});

// --- build what the seed would write, without touching Sanity -----------------

const root = resolve(process.argv[2] || process.cwd());
const built = JSON.parse(
  execFileSync("node", [join(root, "scripts/seed-sanity.mjs"), "--dry-run", "--json"], {
    cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
  })
);
const byType = (t) => built.filter((d) => d._type === t);

// --- pillars ------------------------------------------------------------------

const { ALL_PILLARS } = await loadTs(join(root, "src/lib/pillar-fallbacks.ts"));
for (const fb of ALL_PILLARS) {
  const seeded = byType("servicePillar").find((d) => d.slug?.current === fb.slug);
  if (!seeded) { diffs.push(`pillar ${fb.slug}: MISSING from seed`); continue; }
  walk(canonPillar(fb), canonPillar(seeded), `pillar.${fb.slug}`);
}

// --- clinicians ---------------------------------------------------------------
// The site renders Sanity's portable-text `bio` when present, else the plain
// `bioFallback` paragraphs (see src/lib/clinician.ts), so those must match.

const { ALL_CLINICIANS } = await loadTs(join(root, "src/lib/clinician-fallbacks.ts"));
for (const fb of ALL_CLINICIANS) {
  const seeded = byType("clinician").find((d) => norm(d.name) === norm(fb.name));
  if (!seeded) { diffs.push(`clinician ${fb.name}: MISSING from seed`); continue; }
  for (const k of ["name", "role", "qualifications", "focus", "quote"])
    walk(norm(fb[k]), norm(seeded[k]), `clinician.${fb.name}.${k}`);
  walk(fb.isPrincipal ?? false, seeded.isPrincipal ?? false, `clinician.${fb.name}.isPrincipal`);
  walk(
    (fb.bioFallback || []).map(norm),
    (seeded.bio || []).map((b) => norm((b.children || []).map((c) => c.text).join(""))),
    `clinician.${fb.name}.bio`
  );
}

// --- practice settings --------------------------------------------------------

const { PRACTICE } = await loadTs(join(root, "src/lib/practice.ts"));
const ps = byType("practiceSettings")[0];
if (!ps) diffs.push("practiceSettings: MISSING from seed");
else {
  for (const k of ["name", "phone", "phoneIntl", "phoneAlt", "email"])
    walk(norm(PRACTICE[k]), norm(ps[k]), `practiceSettings.${k}`);
  for (const k of Object.keys(PRACTICE.address || {}))
    walk(norm(PRACTICE.address[k]), norm(ps.address?.[k]), `practiceSettings.address.${k}`);
  for (const k of Object.keys(PRACTICE.social || {}))
    walk(norm(PRACTICE.social[k]), norm(ps.social?.[k]), `practiceSettings.social.${k}`);
  walk(
    (PRACTICE.hours || []).map((h) => `${norm(h.days)} | ${norm(h.time)}`),
    (ps.hours || []).map((h) => `${norm(h.days)} | ${norm(h.time)}`),
    "practiceSettings.hours"
  );
}

// --- home hero ----------------------------------------------------------------
// DEFAULTS isn't exported from Hero.tsx, so read the literals out of the source.

const hero = readFileSync(join(root, "src/components/Hero.tsx"), "utf8");
const heroDefault = (k) => {
  const m = hero.match(new RegExp(`${k}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return m ? norm(m[1].replace(/\\n/g, " ")) : null;
};
const hh = byType("homeHero")[0];
if (!hh) diffs.push("homeHero: MISSING from seed");
else {
  for (const k of [
    "eyebrow", "headline", "subhead", "primaryCtaLabel",
    "secondaryCtaLabel", "secondaryCtaAnchor",
    "trustCardName", "trustCardRole", "trustCardCredentials",
  ]) {
    const site = heroDefault(k);
    if (site === null) { console.warn(`  ! could not read ${k} from Hero.tsx — skipped`); continue; }
    walk(site, norm(String(hh[k]).replace(/\n/g, " ")), `homeHero.${k}`);
  }
}

// --- report -------------------------------------------------------------------

if (diffs.length) {
  console.error(`\n${diffs.length} difference(s) between the live fallbacks and the seed:\n`);
  for (const d of diffs) console.error(`  ${d}`);
  console.error(
    "\nSeeding now would change the live site once the CMS is enabled. " +
      "Fix scripts/seed-sanity.mjs (or the fallback) until this passes.\n"
  );
  process.exit(1);
}

console.log("\nIn sync — the seed would write exactly what the site already renders.\n");
