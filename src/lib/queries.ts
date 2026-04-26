/**
 * GROQ queries for fetching content from Sanity.
 * Keep queries here so they're easy to find, reuse, and test.
 */

export const HOME_HERO_QUERY = `*[_type == "homeHero"][0]{
  eyebrow,
  headline,
  subhead,
  videoUrl,
  primaryCtaLabel,
  secondaryCtaLabel,
  secondaryCtaAnchor,
  trustCardName,
  trustCardRole,
  trustCardCredentials,
  trustCardImage
}`;

export const PRACTICE_SETTINGS_QUERY = `*[_type == "practiceSettings"][0]{
  name,
  tagline,
  phone,
  phoneIntl,
  phoneAlt,
  email,
  address,
  hours,
  social
}`;

export const SERVICE_PILLARS_QUERY = `*[_type == "servicePillar"] | order(number asc){
  _id,
  number,
  title,
  "slug": slug.current,
  tagline,
  shortDescription,
  intro,
  image,
  bentoSpan,
  bentoAspect,
  subTreatments,
  processSteps,
  secondaryProcessTitle,
  secondaryProcessSteps,
  risksContent,
  faqs,
  ctaHeadline,
  ctaSubhead,
  seoTitle,
  seoDescription
}`;

export const SERVICE_PILLAR_BY_SLUG_QUERY = `*[_type == "servicePillar" && slug.current == $slug][0]{
  _id,
  number,
  title,
  "slug": slug.current,
  tagline,
  shortDescription,
  intro,
  image,
  subTreatments,
  processSteps,
  secondaryProcessTitle,
  secondaryProcessSteps,
  risksContent,
  faqs,
  ctaHeadline,
  ctaSubhead,
  seoTitle,
  seoDescription
}`;

export const CLINICIANS_QUERY = `*[_type == "clinician"] | order(order asc){
  _id,
  name,
  role,
  isPrincipal,
  qualifications,
  focus,
  bio,
  quote,
  portrait
}`;
