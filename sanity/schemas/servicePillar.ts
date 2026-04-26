import { defineField, defineType } from "sanity";

export const servicePillar = defineType({
  name: "servicePillar",
  title: "Service Pillar",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Pillar number (01, 02, 03, 04)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL path after /services/)",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description (for bento card)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph (for pillar page hero)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "image",
      title: "Pillar image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bentoSpan",
      title: "Bento grid span (Tailwind classes)",
      type: "string",
      description: "e.g. 'lg:col-span-7 lg:row-span-2'",
    }),
    defineField({
      name: "bentoAspect",
      title: "Bento grid aspect (Tailwind)",
      type: "string",
      description: "e.g. 'aspect-[4/5] lg:aspect-auto'",
    }),
    defineField({
      name: "subTreatments",
      title: "Sub-treatments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string", title: "ID (short key)" },
            { name: "slug", type: "slug", title: "URL slug", options: { source: "name", maxLength: 80 } },
            { name: "name", type: "string", title: "Name" },
            { name: "description", type: "text", rows: 3, title: "Short description (card)" },
            { name: "longDescription", type: "text", rows: 6, title: "Long description (detail page intro)" },
            {
              name: "videoUrl",
              type: "url",
              title: "Video URL (Cloudinary / Vimeo / YouTube-embed)",
              description: "Paste a direct video URL. Falls back to the pillar image if not provided.",
            },
            { name: "videoPoster", type: "url", title: "Video poster URL (optional)" },
            { name: "imageUrl", type: "url", title: "Image URL (if no video)", description: "Alternative to video — paste a direct image URL." },
            {
              name: "whatToExpect",
              type: "array",
              of: [{ type: "string" }],
              title: "What to expect (short bullets)",
            },
            {
              name: "processSteps",
              type: "array",
              title: "Process steps",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string", title: "Step title" },
                    { name: "description", type: "text", rows: 3, title: "Description" },
                  ],
                },
              ],
            },
            { name: "risksContent", type: "text", rows: 4, title: "Risks & considerations (paragraph)" },
            {
              name: "faqs",
              type: "array",
              title: "FAQs",
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
    defineField({
      name: "processSteps",
      title: "Process steps (your journey)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step title" },
            { name: "description", type: "text", rows: 3, title: "Description" },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "secondaryProcessTitle",
      title: "Secondary process title (optional, e.g. All-on-4 journey)",
      type: "string",
    }),
    defineField({
      name: "secondaryProcessSteps",
      title: "Secondary process steps (optional)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step title" },
            { name: "description", type: "text", rows: 3, title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "risksContent",
      title: "Risks & considerations (paragraph)",
      type: "text",
      rows: 5,
      description: "Specific clinical risks for this pillar. A standard AHPRA disclaimer is appended automatically.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
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
    defineField({
      name: "ctaHeadline",
      title: "CTA headline",
      type: "string",
    }),
    defineField({
      name: "ctaSubhead",
      title: "CTA subhead",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    { title: "Pillar number", name: "number", by: [{ field: "number", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "image" },
  },
});
