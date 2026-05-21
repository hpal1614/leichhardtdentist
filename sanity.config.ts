import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media as mediaPlugin } from "sanity-plugin-media";
import { CogIcon, HomeIcon, BlockContentIcon, UsersIcon } from "@sanity/icons";

import { schemaTypes } from "./sanity/schemas";
import { WelcomePane } from "./sanity/components/WelcomePane";
import { VisitWebsiteAction } from "./sanity/actions/visitWebsite";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn("[Sanity] VITE_SANITY_PROJECT_ID is not set. Visit /studio to configure.");
}

export default defineConfig({
  name: "leichhardt-dental",
  title: "Leichhardt Dental",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      title: "Content",
      structure: (S) =>
        S.list()
          .title("Leichhardt Dental")
          .items([
            // Welcome pane — first thing Nick sees
            S.listItem()
              .title("Getting started")
              .id("welcome")
              .child(S.component(WelcomePane).title("Getting started")),

            S.divider(),

            // Singletons
            S.listItem()
              .title("Practice Settings")
              .id("practiceSettings")
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType("practiceSettings")
                  .documentId("practiceSettings")
                  .title("Practice Settings")
              ),
            S.listItem()
              .title("Home Hero")
              .id("homeHero")
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType("homeHero")
                  .documentId("homeHero")
                  .title("Home Hero")
              ),

            S.divider(),

            // Collections
            S.documentTypeListItem("servicePillar")
              .title("Treatments & Services")
              .icon(BlockContentIcon),
            S.documentTypeListItem("clinician")
              .title("Our Team")
              .icon(UsersIcon),
          ]),
    }),
    // Visual photo library — lets Nick browse and reuse uploaded photos
    mediaPlugin(),
    // GROQ query tester — useful for developers
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Lock singletons so Nick can't accidentally create duplicates
    templates: (prev) =>
      prev.filter(
        (t) => t.schemaType !== "practiceSettings" && t.schemaType !== "homeHero"
      ),
  },

  document: {
    // Add "Visit website" to the action bar of every document
    actions: (prev) => [...prev, VisitWebsiteAction],
  },
});
