import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { Home } from "./pages/Home";
import { RouteError } from "./pages/RouteError";

const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const Privacy = lazy(() => import("./pages/Privacy").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Terms").then((m) => ({ default: m.Terms })));
const GeneralDentistry = lazy(() =>
  import("./pages/services/GeneralDentistry").then((m) => ({ default: m.GeneralDentistry }))
);
const DentalImplants = lazy(() =>
  import("./pages/services/DentalImplants").then((m) => ({ default: m.DentalImplants }))
);
const SameDaySmile = lazy(() =>
  import("./pages/services/SameDaySmile").then((m) => ({ default: m.SameDaySmile }))
);
const Orthodontics = lazy(() =>
  import("./pages/services/Orthodontics").then((m) => ({ default: m.Orthodontics }))
);
const SubTreatmentPage = lazy(() =>
  import("./pages/services/SubTreatmentPage").then((m) => ({
    default: m.SubTreatmentPage,
  }))
);
const AllOnFourPage = lazy(() =>
  import("./pages/services/AllOnFourPage").then((m) => ({
    default: m.AllOnFourPage,
  }))
);
const Overdentures = lazy(() =>
  import("./pages/services/Overdentures").then((m) => ({
    default: m.Overdentures,
  }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);
const StudioPage = lazy(() =>
  import("./pages/Studio").then((m) => ({ default: m.StudioPage }))
);

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

const withSuspense = (el: React.ReactElement) => (
  <Suspense fallback={<RouteFallback />}>{el}</Suspense>
);

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    errorElement: <RouteError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: withSuspense(<About />) },
      { path: "/contact", element: withSuspense(<Contact />) },
      { path: "/privacy", element: withSuspense(<Privacy />) },
      { path: "/terms", element: withSuspense(<Terms />) },
      { path: "/services/general-dentistry", element: withSuspense(<GeneralDentistry />) },
      { path: "/services/dental-implants", element: withSuspense(<DentalImplants />) },
      { path: "/services/same-day-smile", element: withSuspense(<SameDaySmile />) },
      { path: "/services/orthodontics", element: withSuspense(<Orthodontics />) },
      // Dedicated landing pages — must come before the catch-all sub-treatment route
      {
        path: "/services/dental-implants/all-on-4-implants",
        element: withSuspense(<AllOnFourPage />),
      },
      {
        path: "/services/dental-implants/implant-supported-overdentures",
        element: withSuspense(<Overdentures />),
      },
      // Inlays/onlays live under same-day-smile only — redirect the old
      // general-dentistry URL so it isn't a dead duplicate.
      {
        path: "/services/general-dentistry/ceramic-inlays-onlays",
        element: (
          <Navigate to="/services/same-day-smile/ceramic-inlays-onlays" replace />
        ),
      },
      {
        path: "/services/:pillarSlug/:subSlug",
        element: withSuspense(<SubTreatmentPage />),
      },
      // 404 catch-all — must be last inside the SiteLayout block
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
  // Sanity Studio — mounted outside the SiteLayout so the Navbar/Footer don't wrap it.
  { path: "/studio/*", element: withSuspense(<StudioPage />), errorElement: <RouteError /> },
]);
