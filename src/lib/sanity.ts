import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

// The Sanity CMS is intentionally disabled: the site renders entirely from the
// static content in `src/lib/*-fallbacks.ts`, so every page has its real copy
// baked in. With the CMS off, no requests go to Sanity (which was returning
// 403s because the live domain isn't on its CORS allow-list) and `/studio`
// shows a "not configured" notice instead of loading the editor.
//
// To re-enable the CMS later: set CMS_ENABLED to true, then in sanity.io/manage
// add the live domain to the project's CORS origins and make the dataset public.
const CMS_ENABLED = false;

export const isSanityConfigured = CMS_ENABLED && Boolean(projectId);

export const sanity: SanityClient | null =
  CMS_ENABLED && projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        useCdn: true,
      })
    : null;

const builder = sanity ? imageUrlBuilder(sanity) : null;

export function urlFor(source: SanityImageSource): string | null {
  if (!builder) return null;
  try {
    return builder.image(source).auto("format").url();
  } catch {
    return null;
  }
}

/**
 * Safe fetch: returns null if Sanity isn't configured, or if the query fails.
 * Components should handle null by falling back to their static defaults.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!sanity) return null;
  try {
    return await sanity.fetch<T>(query, params);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[Sanity] fetch failed:", err);
    return null;
  }
}
