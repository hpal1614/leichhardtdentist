import { trackEvent } from "./analytics";

/**
 * External booking portal — Dental4Windows (D4W) via Centaur.
 *
 * The practice already uses this portal on leichhardtdentist.com; all "Book"
 * CTAs across the site open it in a new tab. To change providers, update
 * BOOKING_URL here — every CTA picks it up automatically.
 *
 * NOTE: we use the token-less form of the URL on purpose. The tokenised link
 * (with a long `randomNumber`) loads the byte-for-byte identical booking page,
 * but a token can expire/rotate — so dropping it removes the only realistic way
 * the Book buttons could silently break.
 */
export const BOOKING_URL =
  "https://www.centaurportal.com/d4w/org-262/extended_search?location=283&shortVer=true";

export const BOOKING_LINK_PROPS = {
  href: BOOKING_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
  // Records a GA event so booking-click conversions are measurable (no-op until
  // a GA Measurement ID is configured).
  onClick: () => trackEvent("booking_click", { destination: "centaur_portal" }),
};
