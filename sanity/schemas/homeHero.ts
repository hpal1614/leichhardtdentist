import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homeHero = defineType({
  name: "homeHero",
  title: "Home Hero",
  type: "document",
  icon: HomeIcon,
  // Singleton — only one instance of this document should exist.
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow text",
      type: "string",
      description: "Small uppercase line above the headline. E.g. 'Leichhardt Dental Centre · Inner West Sydney'.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 2,
      description: "The large headline on the home page. Use a line break for two lines — e.g. 'Dentistry,\\nled by Dr. Nick.'",
      validation: (r) => r.required().error("Headline is required."),
    }),
    defineField({
      name: "subhead",
      title: "Subheading",
      type: "text",
      rows: 3,
      description: "Supporting sentence beneath the headline. Keep it to 1–2 lines.",
    }),
    defineField({
      name: "videoUrl",
      title: "Background video URL",
      type: "url",
      description: "Full Cloudinary URL for the looping ambient video (MP4 or MOV). Leave blank to keep the existing video.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary button label",
      type: "string",
      initialValue: "Book with Dr. Nick",
      description: "Label on the orange booking button. E.g. 'Book with Dr. Nick'.",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary button label",
      type: "string",
      initialValue: "Meet Dr. Nick",
      description: "Label on the ghost button. E.g. 'Meet Dr. Nick'.",
    }),
    defineField({
      name: "secondaryCtaAnchor",
      title: "Secondary button link",
      type: "string",
      initialValue: "#dr-nick",
      description: "Where the secondary button scrolls to. Use '#dr-nick' to scroll to the team section.",
    }),
    defineField({
      name: "trustCardName",
      title: "Trust card — name",
      type: "string",
      initialValue: "Dr. Nick Kulkarni",
      description: "Name shown on the clinician card in the bottom-left of the hero.",
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
      description: "Short credential line on the trust card.",
    }),
    defineField({
      name: "trustCardImage",
      title: "Trust card — portrait",
      type: "image",
      description: "Portrait photo shown on the trust card. Use the Media library to select Dr. Nick's photo.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({ title: "Home Hero", subtitle: title }),
  },
});
