import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const clinician = defineType({
  name: "clinician",
  title: "Our Team",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      description: "Include the title — e.g. 'Dr. Nick Kulkarni'.",
      validation: (r) => r.required().error("Full name is required."),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "E.g. 'Principal Dentist' or 'Dentist'.",
    }),
    defineField({
      name: "isPrincipal",
      title: "Principal dentist?",
      type: "boolean",
      initialValue: false,
      description: "The principal appears in the large editorial section on the home page. Only one person should have this checked.",
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications",
      type: "string",
      description: "Short credential line shown below the name. E.g. 'BDS · GradDipClinDent (Oral Implants) · Fellow ICOI'.",
    }),
    defineField({
      name: "focus",
      title: "Clinical focus",
      type: "text",
      rows: 3,
      description: "1–2 sentences summarising their specialty area. Shown on the team card when hovered.",
    }),
    defineField({
      name: "bio",
      title: "Full bio",
      type: "array",
      description: "Full biography shown on the About page. Write in paragraphs — use the toolbar to add formatting if needed.",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "quote",
      title: "Signature quote",
      type: "text",
      rows: 3,
      description: "A short first-person quote from the clinician. Shown in blockquote styling on the team and about sections.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait photo",
      type: "image",
      description: "Professional portrait. Tall/portrait orientation works best (3:4 ratio). Use the Media library to upload.",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 10,
      description: "Lower numbers appear first. Dr. Nick is 1, associates follow.",
    }),
  ],
  orderings: [
    { title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "portrait" },
  },
});
