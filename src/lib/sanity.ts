import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

export const isSanityConfigured = Boolean(projectId);

export const sanity: SanityClient | null = projectId
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
