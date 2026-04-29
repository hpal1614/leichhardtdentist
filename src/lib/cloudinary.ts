/**
 * Wraps a Cloudinary URL with auto-format + auto-quality transformations so
 * the CDN serves the smallest, fastest format the visitor's browser supports
 * (WebM/AV1 to Chromium/Firefox, MP4 to Safari) and tunes bitrate for the
 * detected connection speed.
 *
 * Typically halves bandwidth vs. serving the raw uploaded file. Applies to
 * any URL of the form `https://res.cloudinary.com/<cloud>/video/upload/...`
 * Returns the URL unchanged if it isn't a Cloudinary URL or already carries
 * transformations.
 */
export function optimizeVideoUrl(url?: string | null): string | undefined {
  if (!url) return url ?? undefined;
  if (!url.includes("res.cloudinary.com")) return url;
  if (!url.includes("/video/upload/")) return url;
  // Don't double-transform if a transform segment already exists
  if (/\/video\/upload\/(?:[a-z]{1,3}_[^/]+(?:,|\/))/i.test(url)) return url;
  return url.replace("/video/upload/", "/video/upload/q_auto,f_auto/");
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
