/**
 * Walk media/ recursively. For each video or image found:
 *   - if it's a video > 80 MB, compress with ffmpeg (CRF 24)
 *   - upload to Cloudinary at dental-website/{matching-folder-path}
 *   - print a paste-ready Sanity entry with the resulting URL
 *
 * Workflow:
 *   1. Drag files from your synced Drive folder into the matching media/
 *      subfolder (e.g. media/services/implants/all-on-4/walkthrough.mp4)
 *   2. Run:
 *        npm run sync-media
 *      (or: node --env-file=.env sync-media.js)
 *   3. Paste the printed URLs into the matching Sanity Studio fields.
 *
 * Requires:
 *   .env with CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
 *   ffmpeg installed (brew install ffmpeg) — only needed for >80 MB videos
 */

const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const required = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    "\n❌ Missing env vars: " +
      missing.join(", ") +
      "\n\nRun:\n  node --env-file=.env sync-media.js\n"
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const VIDEO_EXT = /\.(mp4|mov|webm|m4v|ogg)$/i;
const IMAGE_EXT = /\.(jpg|jpeg|png|webp|gif|avif)$/i;
const VIDEO_COMPRESS_THRESHOLD = 80 * 1024 * 1024; // 80 MB
const SKIP = new Set([".gitkeep", ".DS_Store", "Thumbs.db"]);

// Where to read files from. Defaults to ./media in the project, but can be
// pointed at a synced Google Drive folder via MEDIA_DIR in .env, e.g.:
//   MEDIA_DIR="/Users/you/Library/CloudStorage/GoogleDrive-.../My Drive/media"
const mediaRoot = process.env.MEDIA_DIR
  ? path.resolve(process.env.MEDIA_DIR)
  : path.join(__dirname, "media");

if (!fs.existsSync(mediaRoot)) {
  console.error(
    `\n❌ Media folder not found: ${mediaRoot}\n` +
    `   Set MEDIA_DIR in .env or create ./media in the project root.\n`
  );
  process.exit(1);
}
console.log(`📂 Reading from: ${mediaRoot}`);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (!SKIP.has(entry.name) && !entry.name.startsWith(".")) files.push(full);
  }
  return files;
}

function classify(filename) {
  if (VIDEO_EXT.test(filename)) return "video";
  if (IMAGE_EXT.test(filename)) return "image";
  return null;
}

function compressVideo(inputPath) {
  const tmpPath = path.join(
    "/tmp",
    `synced-${Date.now()}-${path.basename(inputPath, path.extname(inputPath))}.mp4`
  );
  console.log(`   ⚙️  compressing with ffmpeg (CRF 24)...`);
  execSync(
    `ffmpeg -y -loglevel error -i "${inputPath}" -c:v libx264 -preset slow -crf 24 -movflags +faststart -c:a aac -b:a 128k "${tmpPath}"`
  );
  const newSize = fs.statSync(tmpPath).size;
  console.log(`   ⚙️  → ${(newSize / 1024 / 1024).toFixed(1)} MB`);
  return tmpPath;
}

async function uploadFile(localPath) {
  const relPath = path.relative(mediaRoot, localPath);
  const folderRel = path.posix.dirname(relPath.split(path.sep).join("/"));
  const filenameNoExt = path.parse(relPath).name;
  const kind = classify(localPath);

  if (!kind) {
    console.log(`⏭  ${relPath}  (unknown file type)`);
    return null;
  }

  const stats = fs.statSync(localPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`\n→ ${relPath}  (${sizeMB} MB · ${kind})`);

  let toUpload = localPath;
  let compressed = false;

  if (kind === "video" && stats.size > VIDEO_COMPRESS_THRESHOLD) {
    try {
      toUpload = compressVideo(localPath);
      compressed = true;
    } catch (e) {
      console.error(`   ❌ ffmpeg failed: ${e.message}`);
      return null;
    }
  }

  const cloudFolder = `dental-website${folderRel === "." ? "" : "/" + folderRel}`;

  try {
    const result = await cloudinary.uploader.upload(toUpload, {
      resource_type: kind,
      folder: cloudFolder,
      public_id: filenameNoExt,
      overwrite: true,
      ...(kind === "video" && {
        chunk_size: 6_000_000,
        eager: [
          {
            width: 1920,
            height: 1080,
            crop: "limit",
            quality: "auto:good",
            fetch_format: "auto",
          },
        ],
        eager_async: true,
      }),
    });

    if (compressed) {
      try {
        fs.unlinkSync(toUpload);
      } catch {}
    }

    console.log(`   ✅ ${result.secure_url}`);
    return {
      localPath: relPath,
      cloudPath: `${cloudFolder}/${filenameNoExt}`,
      url: result.secure_url,
      kind,
    };
  } catch (e) {
    console.error(`   ❌ upload failed: ${e.message}`);
    if (compressed) {
      try {
        fs.unlinkSync(toUpload);
      } catch {}
    }
    return null;
  }
}

async function main() {
  const files = walk(mediaRoot);
  if (files.length === 0) {
    console.log("\n⏭  media/ is empty — nothing to upload.\n");
    return;
  }

  console.log(
    `\nFound ${files.length} file(s) in media/. Cloud: "${process.env.CLOUDINARY_CLOUD_NAME}"`
  );

  const results = [];
  for (const f of files) {
    const r = await uploadFile(f);
    if (r) results.push(r);
  }

  fs.writeFileSync(
    path.join(__dirname, "cloudinary-urls.json"),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n=== Done · ${results.length}/${files.length} uploaded ===\n`);
  console.log("📋 Paste-ready URLs (open Sanity Studio at /studio):\n");
  for (const r of results) {
    console.log(`📁 ${r.localPath}`);
    console.log(`   ${r.url}\n`);
  }

  console.log(
    "Tip: also written to cloudinary-urls.json in case you want to copy from there."
  );
}

main().catch((err) => {
  console.error("\n❌ Unexpected error:", err);
  process.exit(1);
});
