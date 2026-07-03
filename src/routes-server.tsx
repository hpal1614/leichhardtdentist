/**
 * Server-render route table, used ONLY at build time by scripts/prerender.mjs
 * via src/entry-server.tsx. It mirrors the client router in src/routes.tsx but
 * with eager (non-lazy) imports so React Router's static handler can render each
 * page to HTML in Node without a browser.
 *
 * The client SPA (src/routes.tsx + src/main.tsx) is intentionally left
 * untouched — this file is a parallel, build-only definition. If you add or
 * rename a route in routes.tsx, mirror it here too (the /studio Studio route is
 * deliberately omitted: it's a client-only CMS app, never prerendered).
 */
import type { RouteObject } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { GeneralDentistry } from "./pages/services/GeneralDentistry";
import { DentalImplants } from "./pages/services/DentalImplants";
import { SameDaySmile } from "./pages/services/SameDaySmile";
import { Orthodontics } from "./pages/services/Orthodontics";
import { AllOnFourPage } from "./pages/services/AllOnFourPage";
import { Overdentures } from "./pages/services/Overdentures";
import { SubTreatmentPage } from "./pages/services/SubTreatmentPage";
import { NotFound } from "./pages/NotFound";

export const serverRoutes: RouteObject[] = [
  {
    Component: SiteLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "services/general-dentistry", Component: GeneralDentistry },
      { path: "services/dental-implants", Component: DentalImplants },
      { path: "services/same-day-smile", Component: SameDaySmile },
      { path: "services/orthodontics", Component: Orthodontics },
      { path: "services/dental-implants/all-on-4-implants", Component: AllOnFourPage },
      { path: "services/dental-implants/implant-supported-overdentures", Component: Overdentures },
      { path: "services/:pillarSlug/:subSlug", Component: SubTreatmentPage },
      { path: "*", Component: NotFound },
    ],
  },
];
