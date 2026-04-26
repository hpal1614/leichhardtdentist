import { urlFor } from "./sanity";

// Loose types — `bio` is portable text (any[]) when from Sanity.
export type ClinicianData = {
  _id?: string;
  name: string;
  role: string;
  isPrincipal: boolean;
  qualifications: string;
  focus: string;
  bio: unknown[] | null; // portable text blocks from Sanity (rendered with @portabletext/react)
  bioFallback: string[]; // plain paragraphs used when `bio` is null
  quote: string;
  portrait: string | null; // resolved image URL, or null → component shows initials placeholder
  order: number;
};

export type ClinicianSanity = {
  _id?: string;
  name?: string;
  role?: string;
  isPrincipal?: boolean;
  qualifications?: string;
  focus?: string;
  bio?: unknown[];
  quote?: string;
  portrait?: unknown;
  order?: number;
};

export function mergeClinician(
  remote: ClinicianSanity | null,
  fallback: ClinicianData
): ClinicianData {
  if (!remote) return fallback;
  const remoteImage = remote.portrait ? urlFor(remote.portrait) : null;
  return {
    _id: remote._id ?? fallback._id,
    name: remote.name || fallback.name,
    role: remote.role || fallback.role,
    isPrincipal: remote.isPrincipal ?? fallback.isPrincipal,
    qualifications: remote.qualifications || fallback.qualifications,
    focus: remote.focus || fallback.focus,
    bio: remote.bio?.length ? remote.bio : null,
    bioFallback: fallback.bioFallback,
    quote: remote.quote || fallback.quote,
    portrait: remoteImage || fallback.portrait,
    order: remote.order ?? fallback.order,
  };
}

/** Match remote clinicians to fallbacks by name; preserve fallback order. */
export function mergeClinicians(
  remote: ClinicianSanity[] | null,
  fallbacks: ClinicianData[]
): ClinicianData[] {
  if (!remote?.length) return fallbacks;
  return fallbacks.map((fb) => {
    const match = remote.find((r) => r.name === fb.name);
    return mergeClinician(match || null, fb);
  });
}

/** Returns initials (max 2 chars) for a name. */
export function initialsFor(name: string): string {
  const parts = name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]!.toUpperCase();
  return (parts[0][0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
