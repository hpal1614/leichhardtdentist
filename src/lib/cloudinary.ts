/**
 * Wraps a Cloudinary URL with auto-format + auto-quality + a width cap so the
 * CDN serves the smallest, fastest format the visitor's browser supports
 * (WebM/AV1 to Chromium/Firefox, MP4 to Safari) and never ships pixels larger
 * than they'll be displayed.
 *
 * `c_limit` only ever scales DOWN (never upscales), so source masters bigger
 * than the cap are shrunk while smaller ones are left alone. Pass `width` to
 * tune the cap per placement (e.g. a small card vs. a full-bleed hero).
 *
 * Applies to any URL of the form `https://res.cloudinary.com/<cloud>/video/upload/...`
 * Returns the URL unchanged if it isn't a Cloudinary URL or already carries
 * transformations.
 */
export function optimizeVideoUrl(
  url?: string | null,
  opts: { width?: number; quality?: string } = {}
): string | undefined {
  if (!url) return url ?? undefined;
  if (!url.includes("res.cloudinary.com")) return url;
  if (!url.includes("/video/upload/")) return url;
  // Don't double-transform if a transform segment already exists
  if (/\/video\/upload\/(?:[a-z]{1,3}_[^/]+(?:,|\/))/i.test(url)) return url;
  const width = opts.width ?? 1280;
  const quality = opts.quality ?? "auto";
  const transform = `q_${quality},f_auto,w_${width},c_limit`;
  return url.replace("/video/upload/", `/video/upload/${transform}/`);
}

/**
 * Builds a lightweight still-frame JPG from a Cloudinary video URL, to use as a
 * `poster` so a card can show an image instantly without downloading the video.
 * `second` picks the frame; `width` caps the poster size. Returns undefined for
 * non-Cloudinary or already-transformed URLs.
 */
export function videoPosterUrl(
  url?: string | null,
  opts: { second?: number; width?: number } = {}
): string | undefined {
  if (!url) return undefined;
  if (!url.includes("res.cloudinary.com")) return undefined;
  if (!url.includes("/video/upload/")) return undefined;
  if (/\/video\/upload\/(?:[a-z]{1,3}_[^/]+(?:,|\/))/i.test(url)) return undefined;
  const second = opts.second ?? 0;
  const width = opts.width ?? 800;
  return url
    .replace(
      "/video/upload/",
      `/video/upload/so_${second},w_${width},q_auto,f_auto/`
    )
    .replace(/\.(mp4|mov|webm|m4v|ogg)($|\?)/i, ".jpg$2");
}

/**
 * Same idea for Cloudinary image URLs. Adds q_auto,f_auto so the CDN serves
 * AVIF/WebP to capable browsers and JPEG to fallbacks, with adaptive quality.
 */
export function optimizeImageUrl(url?: string | null): string | undefined {
  if (!url) return url ?? undefined;
  if (!url.includes("res.cloudinary.com")) return url;
  if (!url.includes("/image/upload/")) return url;
  if (/\/image\/upload\/(?:[a-z]{1,3}_[^/]+(?:,|\/))/i.test(url)) return url;
  return url.replace("/image/upload/", "/image/upload/q_auto,f_auto/");
}
