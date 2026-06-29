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
      <Navbar />
      <main>
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
