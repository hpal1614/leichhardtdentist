import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { StickyBookButton } from "../StickyBookButton";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <StickyBookButton />
      <ScrollRestoration />
    </div>
  );
}
