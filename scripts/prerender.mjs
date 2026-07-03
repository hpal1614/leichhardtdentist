/**
 * Prerenders every sitemap route to static HTML in dist/, so search engines and
 * AI crawlers that don't execute JavaScript get real content + per-route meta +
 * JSON-LD instead of an empty <div id="root">.
 *
 * Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`.
 * It's wired as a NON-BLOCKING build step: if anything here throws, the client
 * SPA in dist/ is already complete and deploys as before — prerendering is
 * purely additive. A route that fails simply falls back to the SPA shell via
 * the _redirects rule; a route that succeeds is served as static HTML (a real
 * file takes precedence over the SPA fallback on Cloudflare Pages).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");
const serverDir = resolve(root, "dist-server");

const template = readFileSync(resolve(distDir, "index.html"), "utf8");

// Guard: the template must be a pristine vite build output (markers intact).
// If they're missing, dist/index.html was already prerendered (e.g. running
// this script twice without a fresh `vite build`) — bail rather than bake the
// homepage's meta into every route.
if (!template.includes("<!--seo-start-->")) {
  throw new Error(
    "dist/index.html has no <!--seo-start--> markers — run `vite build` first"
  );
}

// The SSR build can emit imported assets (e.g. logo.svg) with an un-hashed path,
// while the client build hashes them. Map the plain name → the client's actual
// hashed file so prerendered pages never reference a missing asset.
const assetMap = new Map();
for (const file of readdirSync(resolve(distDir, "assets"))) {
  const m = file.match(/^(.*)-[A-Za-z0-9_-]{8}\.(\w+)$/);
  if (m) assetMap.set(`/assets/${m[1]}.${m[2]}`, `/assets/${file}`);
}
const fixAssets = (html) =>
  html.replace(
    /\/assets\/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp|svg|css|js)/g,
    (ref) => assetMap.get(ref) || ref
  );

// Source of truth for which routes to prerender = the generated sitemap.
const sitemap = readFileSync(resolve(distDir, "sitemap.xml"), "utf8");
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
  (m) => m[1] || "/"
);

const { render } = await import(
  pathToFileURL(resolve(serverDir, "entry-server.mjs")).href
);

let ok = 0;
let skipped = 0;
for (const path of paths) {
  try {
    const result = await render(path);
    if ("redirect" in result) {
      skipped++;
      continue;
    }
    const { html, head } = result;

    // Swap the marked per-route SEO block, then inject the rendered app.
    // Function replacers avoid `$` in content being treated as a backreference.
    let page = template.replace(
      /<!--seo-start-->[\s\S]*?<!--seo-end-->/,
      () => head
    );
    page = page.replace(
      '<div id="root"></div>',
      () => `<div id="root">${html}</div>`
    );
    page = fixAssets(page);

    const outDir = path === "/" ? distDir : join(distDir, path);
    if (path !== "/") mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), page);
    ok++;
  } catch (err) {
    console.warn(`  prerender skipped ${path}: ${err.message}`);
    skipped++;
  }
}

console.log(`prerendered ${ok} routes, skipped ${skipped}`);
