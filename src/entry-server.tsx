/**
 * Build-time server entry. Renders a single route to an HTML string (plus its
 * react-helmet-async <head> tags) so scripts/prerender.mjs can bake static HTML
 * for crawlers that don't run JavaScript. Not shipped to the browser — the
 * client still boots from src/main.tsx exactly as before.
 */
import { renderToString } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom";
import { serverRoutes } from "./routes-server";

const handler = createStaticHandler(serverRoutes);

export type RenderResult =
  | { redirect: string }
  | { html: string; head: string };

export async function render(url: string): Promise<RenderResult> {
  const context = await handler.query(new Request(`http://localhost${url}`));

  // A Response here means a route-level redirect (e.g. the old inlays URL).
  if (context instanceof Response) {
    return { redirect: context.headers.get("Location") || "/" };
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <MotionConfig reducedMotion="user">
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </MotionConfig>
    </HelmetProvider>
  );

  const h = helmetContext.helmet;
  const head = h
    ? [
        h.title.toString(),
        h.meta.toString(),
        h.link.toString(),
        h.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head };
}
