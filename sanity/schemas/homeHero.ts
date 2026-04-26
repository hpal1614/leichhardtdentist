import { defineField, defineType } from "sanity";

export const homeHero = defineType({
  name: "homeHero",
  title: "Home Hero",
  type: "document",
  // Singleton.
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow (small uppercase line above headline)",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
      description: 'Use a line break for a two-line display. Example: "Dentistry,\\nled by Dr. Nick."',
    }),
    defineField({
      name: "subhead",
      title: "Subhead",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "videoUrl",
      title: "Background video URL (Cloudinary or similar)",
      type: "url",
      description: "Full MP4 / MOV URL. Loops silently in the background.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA label",
      type: "string",
      initialValue: "Book with Dr. Nick",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA label",
      type: "string",
      initialValue: "Meet Dr. Nick",
    }),
    defineField({
      name: "secondaryCtaAnchor",
      title: "Secondary CTA link (anchor or URL)",
      type: "string",
      initialValue: "#dr-nick",
    }),
    defineField({
      name: "trustCardName",
      title: "Trust card — name",
      type: "string",
      initialValue: "Dr. Nick Kulkarni",
    }),
    defineField({
      name: "trustCardRole",
      title: "Trust card — role",
      type: "string",
      initialValue: "Principal Dentist",
    }),
    defineField({
      name: "trustCardCredentials",
      title: "Trust card — credentials",
      type: "string",
      initialValue: "BDS · GradDipClinDent · PGDip Implant Dentistry",
    }),
    defineField({
      name: "trustCardImage",
      title: "Trust card — portrait",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({ title: "Home Hero", subtitle: title }),
  },
});
