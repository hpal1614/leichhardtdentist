import { defineField, defineType } from "sanity";

export const practiceSettings = defineType({
  name: "practiceSettings",
  title: "Practice Settings",
  type: "document",
  // Singleton — only one instance of this document should exist.
  fields: [
    defineField({
      name: "name",
      title: "Practice name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (short)",
      type: "string",
      description: "Appears in nav / footer / meta descriptions.",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phoneIntl",
      title: "Phone (international, e.g. +61...)",
      type: "string",
      description: "Used for tel: links.",
    }),
    defineField({
      name: "phoneAlt",
      title: "Phone — alternate",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "streetAddress", type: "string", title: "Street address" },
        { name: "addressLocality", type: "string", title: "Suburb" },
        { name: "addressRegion", type: "string", title: "State" },
        { name: "postalCode", type: "string", title: "Postcode" },
        { name: "addressCountry", type: "string", title: "Country code (AU)" },
      ],
    }),
    defineField({
      name: "hours",
      title: "Opening hours (display)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "days", type: "string", title: "Days" },
            { name: "time", type: "string", title: "Time" },
          ],
        },
      ],
    }),
    defineField({
      name: "social",
      title: "Social media",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "tiktok", type: "url", title: "TikTok" },
        { name: "twitter", type: "url", title: "Twitter / X" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Practice Settings" }),
  },
});
