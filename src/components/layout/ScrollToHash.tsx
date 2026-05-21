import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to an `#anchor` after route changes — including the initial
 * page-load case where React Router's <ScrollRestoration> alone leaves
 * the viewport at the top because the target element hasn't rendered yet.
 *
 * The 150 ms delay covers Suspense fallbacks and Sanity-driven content
 * that hydrates a tick after the first paint.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };
    // Try immediately, then retry in case the section is below a Suspense boundary
    if (tryScroll()) return;
    const t1 = setTimeout(tryScroll, 150);
    const t2 = setTimeout(tryScroll, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, hash]);

  return null;
}
