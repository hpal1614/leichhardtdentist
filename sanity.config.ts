import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

if (!projectId) {
  // Studio won't work without a projectId, but we don't want to crash the whole app.
  // eslint-disable-next-line no-console
  console.warn(
    "[Sanity] VITE_SANITY_PROJECT_ID is not set. Visit /studio to configure."
  );
}

export default defineConfig({
  name: "leichhardt-dental",
  title: "Leichhardt Dental CMS",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Practice Settings")
              .id("practiceSettings")
              .child(
                S.document()
                  .schemaType("practiceSettings")
                  .documentId("practiceSettings")
              ),
            S.listItem()
              .title("Home Hero")
              .id("homeHero")
              .child(
                S.document().schemaType("homeHero").documentId("homeHero")
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem("servicePillar").title("Service Pillars"),
            S.documentTypeListItem("clinician").title("Clinicians"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Lock singletons to a single document each
    templates: (prev) =>
      prev.filter(
        (t) => t.schemaType !== "practiceSettings" && t.schemaType !== "homeHero"
      ),
  },
});
