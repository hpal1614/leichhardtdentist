import { useEffect } from "react";
import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Seo } from "../components/Seo";

/**
 * Detects "stale chunk after deploy" errors. When Vercel ships a new build
 * the chunk hashes change, and any browser tab still on the old HTML will
 * 404 when it lazy-loads a route. We catch that specific class of error and
 * reload the page silently so the user gets the fresh HTML + chunks.
 */
function isChunkLoadError(err: unknown): boolean {
  if (!err) return false;
  const message =
    typeof err === "object" && err !== null && "message" in err
      ? String((err as { message?: unknown }).message ?? "")
      : String(err);
  return (
    /Failed to fetch dynamically imported module/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /Loading chunk \d+ failed/i.test(message) ||
    /Importing a module script failed/i.test(message)
  );
}

const RELOAD_FLAG = "ldc:auto-reloaded-once";

export function RouteError() {
  const error = useRouteError();
  const chunkLoad = isChunkLoadError(error);

  // Auto-reload once on a chunk-load error. The flag in sessionStorage
  // prevents an infinite reload loop if the new deploy is genuinely broken.
  useEffect(() => {
    if (!chunkLoad) return;
    const alreadyReloaded =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(RELOAD_FLAG);
    if (alreadyReloaded) return;
    try {
      sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
    } catch {}
    // Small delay so React has time to render this UI in case the reload fails
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }, [chunkLoad]);

  // Clear the reload flag once we've successfully rendered any other route.
  // (Handled in main.tsx — see that file.)

  const status = isRouteErrorResponse(error) ? error.status : null;
  const statusText = isRouteErrorResponse(error) ? error.statusText : null;

  return (
    <>
      <Seo
        title="Something went wrong — Leichhardt Dental"
        description="An unexpected error occurred. Try refreshing the page."
        path="/error"
        noIndex
      />
      <section className="min-h-[80vh] flex items-center justify-center bg-secondary/30 px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-center"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
            {status ? `Error ${status}` : "Something went wrong"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.05] mb-6">
            {chunkLoad
              ? "Refreshing for the latest version..."
              : "We hit a snag loading that page."}
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed mb-10">
            {chunkLoad
              ? "The site has just been updated. We're reloading to pick up the fresh version. If this page sticks around, click the refresh button below."
              : statusText ||
                "Try refreshing, or head back to the homepage. If this keeps happening, let us know."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem(RELOAD_FLAG);
                } catch {}
                window.location.reload();
              }}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)]"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh page
            </button>
            <Link
              to="/"
              onClick={() => {
                try {
                  sessionStorage.removeItem(RELOAD_FLAG);
                } catch {}
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-foreground/20 text-foreground hover:bg-foreground hover:text-background text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
