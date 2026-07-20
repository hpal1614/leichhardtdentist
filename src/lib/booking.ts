import { trackEvent } from "./analytics";

/**
 * External booking portal — Dental4Windows (D4W) via Centaur, served on the
 * practice's branded portal.dental domain.
 *
 * All "Book" CTAs across the site open this in a new tab. To change providers
 * or links, update BOOKING_URL here — every CTA picks it up automatically.
 */
export const BOOKING_URL = "https://leichhardtdentist.portal.dental/";

export const BOOKING_LINK_PROPS = {
  href: BOOKING_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
  // Records a GA event so booking-click conversions are measurable (no-op until
  // a GA Measurement ID is configured).
  onClick: () => trackEvent("booking_click", { destination: "centaur_portal" }),
};
