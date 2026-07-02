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
 * The static PRACTICE object is `as const` (literal types); once CMS values
 * are merged in, the string fields have to be widened back to plain strings.
 */
type PracticeInfo = Omit<
  typeof STATIC_PRACTICE,
  "name" | "phone" | "phoneIntl" | "phoneAlt" | "email" | "address" | "social" | "hours"
> & {
  name: string;
  phone: string;
  phoneIntl: string;
  phoneAlt: string;
  email: string;
  address: { [K in keyof typeof STATIC_PRACTICE.address]: string };
  social: { [K in keyof typeof STATIC_PRACTICE.social]: string };
  hours: ReadonlyArray<{ days: string; time: string }>;
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
export function usePractice(): PracticeInfo {
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
    hours: validHours?.length ? validHours : STATIC_PRACTICE.hours,
  };
}
