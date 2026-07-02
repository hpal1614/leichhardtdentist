import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { StickyBookButton } from "../StickyBookButton";
import { ScrollToHash } from "./ScrollToHash";
import { initAnalytics, trackPageView } from "../../lib/analytics";

export function SiteLayout() {
  const location = useLocation();
  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Skip link — visually hidden until keyboard-focused (WCAG 2.4.1) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:rounded-full focus:bg-primary focus:text-white focus:text-sm focus:font-semibold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <StickyBookButton />
      <ScrollRestoration
        getKey={(location) => {
          // Treat each unique pathname+hash as its own scroll position
          // so navigating to /about#dr-jimmy doesn't get clobbered by the
          // default top-of-page restoration.
          return location.pathname + location.hash;
        }}
      />
      <ScrollToHash />
    </div>
  );
}
