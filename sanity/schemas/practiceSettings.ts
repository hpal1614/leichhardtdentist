import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const practiceSettings = defineType({
  name: "practiceSettings",
  title: "Practice Settings",
  type: "document",
  icon: CogIcon,
  // Singleton — only one instance of this document should exist.
  fields: [
    defineField({
      name: "name",
      title: "Practice name",
      type: "string",
      description: "The official name of the practice, as it appears across the website.",
      validation: (r) => r.required().error("Practice name is required."),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "A short descriptor used in some SEO and footer contexts. E.g. 'General and implant dentistry, Inner West Sydney'.",
    }),
    defineField({
      name: "phone",
      title: "Phone (display)",
      type: "string",
      description: "Formatted as shown on the website. E.g. '02 9568 3593'.",
      validation: (r) => r.required().error("Phone number is required."),
    }),
    defineField({
      name: "phoneIntl",
      title: "Phone (international format)",
      type: "string",
      description: "Used for 'tel:' links on mobile. E.g. '+61295683593' — no spaces.",
    }),
    defineField({
      name: "phoneAlt",
      title: "Alternate phone (display)",
      type: "string",
      description: "A second number shown as an alternative. E.g. '0475 742 607'.",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      description: "The main contact email. Appears in the footer and contact page.",
      validation: (r) => r.required().email().error("A valid email address is required."),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "streetAddress", type: "string", title: "Street address", description: "E.g. 'Shop 4/39-45 Norton Street'" },
        { name: "addressLocality", type: "string", title: "Suburb", description: "E.g. 'Leichhardt'" },
        { name: "addressRegion", type: "string", title: "State", description: "E.g. 'NSW'" },
        { name: "postalCode", type: "string", title: "Postcode", description: "E.g. '2040'" },
        { name: "addressCountry", type: "string", title: "Country code", description: "E.g. 'AU'" },
      ],
    }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      description: "Displayed on the Contact page and in the footer. Add one row per day group.",
      of: [
        {
          type: "object",
          fields: [
            { name: "days", type: "string", title: "Days", description: "E.g. 'Mon – Fri'" },
            { name: "time", type: "string", title: "Hours", description: "E.g. '9:00 AM – 6:00 PM'" },
          ],
          preview: { select: { title: "days", subtitle: "time" } },
        },
      ],
    }),
    defineField({
      name: "social",
      title: "Social media",
      type: "object",
      description: "Full URLs including https://. Linked in the footer.",
      fields: [
        { name: "instagram", type: "url", title: "Instagram URL" },
        { name: "facebook", type: "url", title: "Facebook URL" },
        { name: "tiktok", type: "url", title: "TikTok URL" },
        { name: "twitter", type: "url", title: "Twitter / X URL" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Practice Settings" }),
  },
});
