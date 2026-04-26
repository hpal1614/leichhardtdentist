/**
 * External booking portal — Dental4Windows (D4W) via Centaur.
 *
 * The practice already uses this portal on leichhardtdentist.com; all "Book"
 * CTAs across the site open it in a new tab. To change providers, update
 * BOOKING_URL here — every CTA picks it up automatically.
 */
export const BOOKING_URL =
  "https://www.centaurportal.com/d4w/org-262/extended_search?location=283&sourceID=&randomNumber=9d42d1ed22c694bf1343686b3baf1523d06e70e17ac173e0f778bf199628aa3a&shortVer=true";

export const BOOKING_LINK_PROPS = {
  href: BOOKING_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
};
