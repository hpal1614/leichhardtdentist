/**
 * Dr. Nick's YouTube videos — the curated list that drives the home page's
 * "From Dr. Nick" section.
 *
 * ── FULL VIDEOS ONLY ───────────────────────────────────────────────────────
 * Vertical Shorts are not published on the site. `npm run sync-youtube`
 * filters them out of the channel feed so they're never even suggested, and
 * every card here is a standard 16:9 video.
 *
 * ── HOW TO CONTROL WHAT SHOWS ──────────────────────────────────────────────
 *
 *   ORDER     The order of this array is the order on the page. Move an entry
 *             up to move it up on the site.
 *   featured  Pulls one video to the front regardless of where it sits in the
 *             list. With a single video it gets the large solo player; with
 *             several it's simply first in the carousel.
 *   hidden    Keeps the video on file but off the website. Nothing with
 *             `hidden: true` is rendered or linked anywhere.
 *   title     The video's real YouTube title, shown under the player.
 *             `npm run sync-youtube` fetches these from YouTube and rewrites
 *             them here, so renaming a video on YouTube updates the site on
 *             the next sync. Don't hand-edit it — the next sync overwrites it.
 *
 * Run `npm run sync-youtube` to check the channel for new full videos. They
 * never appear on the site on their own — they have to be added here first.
 */

import { PRACTICE } from "./practice";

export type YouTubeVideo = {
  /** YouTube video ID — the part after youtu.be/ or watch?v= */
  id: string;
  /** The video's YouTube title. Kept in sync by `npm run sync-youtube`. */
  title: string;
  /** Runtime badge, e.g. "14:47". `npm run sync-youtube` reports the real value. */
  duration: string;
  /**
   * One-sentence summary of the video. Used for Google's video search result,
   * NOT shown on the page. Written by us rather than pulled from YouTube, so
   * the practice controls what search engines quote.
   */
  description: string;
  /** When YouTube published it (ISO 8601). Required by Google's video schema. */
  uploadDate: string;
  /** Pulls this video to the front of the list. */
  featured?: boolean;
  /** On file, but not rendered on the site. */
  hidden?: boolean;
};

/** Re-exported so the section and the footer can never drift apart. */
export const YOUTUBE_CHANNEL_URL = PRACTICE.social.youtube;

/** Used by `npm run sync-youtube` to read the channel's upload feed. */
export const YOUTUBE_CHANNEL_ID = "UCt3IKID2JdNTWO-kDcRJ3Ig";

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "1_R8eivV_MQ",
    title: "Thinking about dental implants? Dr Nick Kulkarni explains.",
    duration: "14:47",
    description:
      "Dr. Nick Kulkarni explains how a single dental implant works — its parts, the biology involved, and what the treatment entails — using a whiteboard, without clinical jargon.",
    uploadDate: "2026-09-01T02:30:16+00:00",
    featured: true,
  },
];
