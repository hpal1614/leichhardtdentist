import { useEffect, useState } from "react";
import { safeFetch } from "./sanity";

/**
 * Fetch a single Sanity document (or shape) with safe fallback.
 * Returns `null` while loading or if Sanity isn't configured or the query fails.
 * Components should fall back to hardcoded defaults when null.
 */
export function useSanityDoc<T>(
  query: string,
  params: Record<string, unknown> = {}
): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let cancelled = false;
    safeFetch<T>(query, params).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)]);

  return data;
}
