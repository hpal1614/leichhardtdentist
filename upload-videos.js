/**
 * Upload every video in public/videos/ to Cloudinary and write the resulting
 * URLs to cloudinary-urls.json. Used to migrate / re-host video assets.
 *
 * Run with:
 *   node --env-file=.env upload-videos.js
 *
 * Required env vars (put in .env at project root):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 *
 * Both .env and cloudinary-urls.json are gitignored — credentials stay local.
 */

const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const required = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    "\n❌ Missing required env vars: " + missing.join(", ") +
    "\n\nAdd them to .env at the project root, then run:\n" +
    "  node --env-file=.env upload-videos.js\n"
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videosDir = path.join(__dirname, "public", "videos");
if (!fs.existsSync(videosDir)) {
  console.error(`\n❌ ${videosDir} doesn't exist. Drop your .mp4/.mov files there first.\n`);
  process.exit(1);
}

const videos = fs
  .readdirSync(videosDir)
  .filter((file) => file.endsWith(".mp4") || file.endsWith(".mov"));

if (videos.length === 0) {
  console.error("\n❌ No .mp4/.mov files in public/videos/.\n");
  process.exit(1);
}

console.log(
  `\nUploading ${videos.length} video(s) to Cloudinary cloud "${process.env.CLOUDINARY_CLOUD_NAME}"...\n`
);

async function uploadVideo(filename) {
  const filePath = path.join(videosDir, filename);
  const stats = fs.statSync(filePath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`→ ${filename} (${fileSizeMB}MB)...`);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "dental-website",
      public_id: path.parse(filename).name,
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
      overwrite: true,
    });

    console.log(`  ✅ ${result.secure_url}`);
    return {
      filename,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error(`  ❌ ${filename} failed: ${error.message}`);
    return null;
  }
}

async function main() {
  const results = [];
  for (const video of videos) {
    const r = await uploadVideo(video);
    if (r) results.push(r);
  }

  fs.writeFileSync(
    path.join(__dirname, "cloudinary-urls.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\n=== Done ===");
  console.log(`Uploaded ${results.length}/${videos.length} videos.`);
  console.log(`URL map written to cloudinary-urls.json`);
  console.log(
    `\nNext: tell Claude (or your dev) the new cloud name "${process.env.CLOUDINARY_CLOUD_NAME}" so the hardcoded URLs in src/ can be updated.`
  );
}

main().catch((err) => {
  console.error("\n❌ Unexpected error:", err);
  process.exit(1);
});
