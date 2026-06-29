/**
 * Google Analytics 4 — free, and loaded ONLY when VITE_GA_MEASUREMENT_ID is set.
 * With no ID configured every function below is a no-op, so the site ships with
 * zero tracking and zero cost until you add a Measurement ID (G-XXXXXXXXXX).
 *
 * Because this is a single-page app, page views are sent manually on each route
 * change (see SiteLayout) rather than relying on GA's automatic pageview.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialised = false;

export const isAnalyticsEnabled = Boolean(GA_ID);

/** Injects the gtag script once. Safe to call repeatedly. */
export function initAnalytics(): void {
  if (initialised || !GA_ID || typeof window === "undefined") return;
  initialised = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // We fire page_view ourselves on route change, so turn the automatic one off.
  window.gtag("config", GA_ID, { send_page_view: false });
}

/** Records a single-page-app page view. */
export function trackPageView(path: string): void {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Records a custom event (e.g. a booking-button click). */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
