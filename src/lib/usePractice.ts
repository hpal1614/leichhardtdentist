import { useSanityDoc } from "./useSanityDoc";
import { PRACTICE_SETTINGS_QUERY } from "./queries";
import { PRACTICE as STATIC_PRACTICE } from "./practice";

type SanityAddress = Partial<typeof STATIC_PRACTICE.address>;
type SanitySocial = Partial<typeof STATIC_PRACTICE.social>;
type SanityHoursRow = { days?: string; time?: string };

type SanityPracticeSettings = {
  name?: string;
  tagline?: string;
  phone?: string;
  phoneIntl?: string;
  phoneAlt?: string;
  email?: string;
  address?: SanityAddress;
  social?: SanitySocial;
  hours?: SanityHoursRow[];
};

/**
 * Returns the practice settings, preferring Sanity values when present and
 * falling back to the static defaults in src/lib/practice.ts.
 *
 * Fields not yet modelled in Sanity (openingHoursSpec, geo, url, legalName,
 * principal) always come from the static source — that's deliberate: machine-
 * readable JSON-LD hours, coordinates, and canonical URL don't need to live
 * in the CMS.
 */
export function usePractice(): typeof STATIC_PRACTICE {
  const data = useSanityDoc<SanityPracticeSettings>(PRACTICE_SETTINGS_QUERY);

  if (!data) return STATIC_PRACTICE;

  const validHours = data.hours?.filter(
    (h): h is { days: string; time: string } => Boolean(h.days && h.time)
  );

  return {
    ...STATIC_PRACTICE,
    name: data.name || STATIC_PRACTICE.name,
    phone: data.phone || STATIC_PRACTICE.phone,
    phoneIntl: data.phoneIntl || STATIC_PRACTICE.phoneIntl,
    phoneAlt: data.phoneAlt || STATIC_PRACTICE.phoneAlt,
    email: data.email || STATIC_PRACTICE.email,
    address: { ...STATIC_PRACTICE.address, ...(data.address || {}) },
    social: { ...STATIC_PRACTICE.social, ...(data.social || {}) },
    hours: (validHours?.length ? validHours : STATIC_PRACTICE.hours) as typeof STATIC_PRACTICE.hours,
  };
}
