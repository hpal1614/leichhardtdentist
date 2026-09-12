import type { YouTubeVideo } from "./youtube-fallbacks";

/**
 * Helpers for the YouTube section. All URL builders are pure string work —
 * nothing here talks to YouTube, so the section prerenders and costs the
 * visitor nothing until they press play.
 */

/**
 * YouTube's "this size wasn't generated" image is exactly 120x90 — and it is
 * served with HTTP 200, not a 404, so an <img onError> handler never fires on
 * it. Anything this small means "try the next candidate".
 */
export const PLACEHOLDER_THUMBNAIL_WIDTH = 120;

/**
 * Poster frames to try, best first — `maxresdefault` (1280x720) isn't
 * generated for every upload, so the component walks this list until it gets a
 * real image. `hqdefault` (480x360) always exists, so it terminates the chain.
 */
export function thumbnailCandidates(id: string): string[] {
  const url = (size: string) => `https://i.ytimg.com/vi/${id}/${size}.jpg`;
  return [url("maxresdefault"), url("sddefault"), url("hqdefault")];
}

/**
 * Player URL, built only at the moment someone clicks play.
 * `youtube-nocookie.com` means no YouTube cookies are set on visitors who
 * never watch; `rel=0` keeps the end screen to this channel's own videos.
 */
export function embedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

/** Turns "14:47" into "14 minutes 47 seconds" for screen readers. */
export function spokenDuration(duration: string): string {
  const [min, sec] = duration.split(":");
  const m = Number(min);
  const s = Number(sec);
  if (Number.isNaN(m) || Number.isNaN(s)) return duration;
  const minutes = m === 1 ? "1 minute" : `${m} minutes`;
  const seconds = s === 1 ? "1 second" : `${s} seconds`;
  return m === 0 ? seconds : `${minutes} ${seconds}`;
}

/**
 * The videos to show, in page order: anything not hidden, with the `featured`
 * one pulled to the front. Returns an empty array when nothing is switched on,
 * in which case the section renders nothing at all.
 */
export function orderedVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
  const visible = videos.filter((v) => !v.hidden);
  const featuredIndex = visible.findIndex((v) => v.featured);
  if (featuredIndex <= 0) return visible;
  const featured = visible[featuredIndex];
  return [featured, ...visible.filter((v) => v !== featured)];
}

/** Turns "14:47" into "PT14M47S", the duration format Google's video schema wants. */
export function isoDuration(duration: string): string {
  const [min, sec] = duration.split(":").map(Number);
  if (Number.isNaN(min) || Number.isNaN(sec)) return "";
  return `PT${min}M${sec}S`;
}
