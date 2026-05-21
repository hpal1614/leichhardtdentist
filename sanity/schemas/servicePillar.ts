import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const servicePillar = defineType({
  name: "servicePillar",
  title: "Treatments & Services",
  type: "document",
  icon: BlockContentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "treatments", title: "Treatments" },
    { name: "journey", title: "Patient Journey" },
    { name: "clinical", title: "Clinical Info" },
    { name: "cta", title: "Call to Action" },
    { name: "seo", title: "SEO" },
    {
      name: "developer",
      title: "Developer",
      hidden: ({ currentUser }) =>
        !currentUser?.roles.some((r) => r.name === "administrator"),
    },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────────
    defineField({
      name: "number",
      title: "Pillar number",
      type: "string",
      group: "developer",
      description: "01, 02, 03, or 04 — controls sort order. Don't change unless you're adding a new pillar.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      group: "content",
      description: "The main heading on the treatment page. E.g. 'Dental Implants.'",
      validation: (r) => r.required().error("The page title is required."),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "developer",
      description: "The URL path after /services/ — e.g. 'dental-implants'. Only change if you rename the page.",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description: "Short line shown in the services grid card on the home page. Keep it under 50 characters.",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      description: "A 1–2 sentence summary shown on the services bento card. Keep it brief.",
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 5,
      group: "content",
      description: "The introductory paragraph at the top of the treatment page, below the title.",
    }),
    defineField({
      name: "image",
      title: "Pillar image",
      type: "image",
      group: "content",
      description: "Background image for the services bento card and the treatment page hero. Landscape photos work best.",
      options: { hotspot: true },
    }),

    // ── Treatments ───────────────────────────────────────────────────────────
    defineField({
      name: "subTreatments",
      title: "Individual treatments",
      type: "array",
      group: "treatments",
      description: "Each card on the treatment grid. Add, remove, or reorder treatments here.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              title: "ID",
              description: "Short internal key (e.g. 'checkup'). No spaces. Developers use this to link pages.",
            },
            {
              name: "slug",
              type: "slug",
              title: "URL slug",
              description: "URL path for this treatment's sub-page.",
              options: { source: "name", maxLength: 80 },
            },
            { name: "name", type: "string", title: "Treatment name" },
            {
              name: "description",
              type: "text",
              rows: 3,
              title: "Short description",
              description: "Shown on the treatment card. 1–2 sentences.",
            },
            {
              name: "longDescription",
              type: "text",
              rows: 6,
              title: "Full description",
              description: "Shown on the individual treatment sub-page. Can be a few paragraphs.",
            },
            {
              name: "imageUrl",
              type: "url",
              title: "Image URL",
              description: "Paste a direct image URL for this treatment card. Use Cloudinary or the practice's own photos.",
            },
            {
              name: "videoUrl",
              type: "url",
              title: "Video URL (optional)",
              description: "Paste a Cloudinary video URL if you'd prefer a video over a photo.",
            },
            {
              name: "videoPoster",
              type: "url",
              title: "Video poster (optional)",
              description: "Thumbnail shown before the video plays.",
            },
            {
              name: "gallery",
              type: "array",
              of: [{ type: "url" }],
              title: "Photo gallery (optional)",
              description: "Extra images shown in a gallery on the treatment sub-page. Paste direct image URLs (Cloudinary or the practice's own photos).",
            },
            {
              name: "pricing",
              type: "array",
              title: "Pricing tiers (optional)",
              description: "Card-based pricing shown on the sub-page — each tier is its own card (matches the All-on-4 pricing design).",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "name", type: "string", title: "Tier name" },
                    { name: "price", type: "string", title: "Price", description: "e.g. $200, $280–$360, Up to $490" },
                    { name: "priceLabel", type: "string", title: "Label above price (optional)", description: "e.g. From" },
                    { name: "unit", type: "string", title: "Unit after price (optional)", description: "e.g. AUD" },
                    { name: "description", type: "text", rows: 2, title: "Description" },
                    { name: "items", type: "array", of: [{ type: "string" }], title: "Inclusions (optional)" },
                  ],
                  preview: { select: { title: "name", subtitle: "price" } },
                },
              ],
            },
            {
              name: "whatToExpect",
              type: "array",
              of: [{ type: "string" }],
              title: "What to expect",
              description: "Short bullet points. Shown in a list on the treatment sub-page.",
            },
            {
              name: "processSteps",
              type: "array",
              title: "Process steps (optional)",
              description: "Step-by-step breakdown for this specific treatment, if it differs from the pillar-level journey.",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string", title: "Step name" },
                    { name: "description", type: "text", rows: 3, title: "What happens" },
                  ],
                },
              ],
            },
            {
              name: "risksContent",
              type: "text",
              rows: 4,
              title: "Risks & considerations",
              description: "AHPRA-required disclosure paragraph for this specific treatment.",
            },
            {
              name: "faqs",
              type: "array",
              title: "FAQs (optional)",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "q", type: "string", title: "Question" },
                    { name: "a", type: "text", rows: 4, title: "Answer" },
                  ],
                  preview: { select: { title: "q" } },
                },
              ],
            },
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        },
      ],
    }),

    // ── Patient Journey ───────────────────────────────────────────────────────
    defineField({
      name: "processSteps",
      title: "Patient journey steps",
      type: "array",
      group: "journey",
      description: "The numbered steps shown in the 'Your journey' section on the treatment page.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step name" },
            { name: "description", type: "text", rows: 3, title: "What happens at this step" },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "secondaryProcessTitle",
      title: "Secondary journey title (optional)",
      type: "string",
      group: "journey",
      description: "Used when there's a second journey section on the page — e.g. 'The All-on-4 journey.'",
    }),
    defineField({
      name: "secondaryProcessSteps",
      title: "Secondary journey steps (optional)",
      type: "array",
      group: "journey",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step name" },
            { name: "description", type: "text", rows: 3, title: "What happens" },
          ],
        },
      ],
    }),

    // ── Clinical Info ─────────────────────────────────────────────────────────
    defineField({
      name: "risksContent",
      title: "Risks & considerations",
      type: "text",
      rows: 5,
      group: "clinical",
      description: "AHPRA-required risks paragraph for this treatment pillar. A standard footer disclaimer is added automatically.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "clinical",
      description: "Questions and answers shown at the bottom of the treatment page.",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", type: "string", title: "Question" },
            { name: "a", type: "text", rows: 4, title: "Answer" },
          ],
          preview: { select: { title: "q" } },
        },
      ],
    }),

    // ── Call to Action ────────────────────────────────────────────────────────
    defineField({
      name: "ctaHeadline",
      title: "CTA headline",
      type: "string",
      group: "cta",
      description: "The big text in the booking prompt at the bottom of the page. E.g. 'Thinking about an implant?'",
    }),
    defineField({
      name: "ctaSubhead",
      title: "CTA subhead",
      type: "text",
      rows: 3,
      group: "cta",
      description: "Supporting sentence beneath the CTA headline.",
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Title shown in Google search results. Keep under 60 characters. Leave blank to use the page title.",
      validation: (r) => r.max(60).warning("Titles over 60 characters may be cut off in search results."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Description shown in Google search results. Keep under 160 characters.",
      validation: (r) => r.max(160).warning("Descriptions over 160 characters may be cut off in search results."),
    }),

    // ── Developer ─────────────────────────────────────────────────────────────
    defineField({
      name: "bentoSpan",
      title: "Bento grid column span (Tailwind)",
      type: "string",
      group: "developer",
      description: "Controls the width of this card on the home page services grid. Don't change.",
    }),
    defineField({
      name: "bentoAspect",
      title: "Bento grid aspect ratio (Tailwind)",
      type: "string",
      group: "developer",
      description: "Controls the height of this card on the home page services grid. Don't change.",
    }),
  ],
  orderings: [
    { title: "Pillar number", name: "number", by: [{ field: "number", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "image" },
  },
});
