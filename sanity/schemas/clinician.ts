import { defineField, defineType } from "sanity";

export const clinician = defineType({
  name: "clinician",
  title: "Clinician",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / title", type: "string" }),
    defineField({
      name: "isPrincipal",
      title: "Principal dentist?",
      type: "boolean",
      initialValue: false,
      description: "The principal appears in the editorial Team section on the Home page.",
    }),
    defineField({ name: "qualifications", title: "Qualifications (short line)", type: "string" }),
    defineField({ name: "focus", title: "Clinical focus (short)", type: "text", rows: 3 }),
    defineField({
      name: "bio",
      title: "Full bio (paragraphs)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "quote",
      title: "Signature quote (first-person)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "portrait",
      title: "Portrait photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "portrait" },
  },
});
