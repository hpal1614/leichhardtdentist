import { urlFor } from "./sanity";

export type SubTreatment = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  videoUrl?: string;
  videoPoster?: string;
  imageUrl?: string;
  gallery?: string[];
  beforeAfter?: BeforeAfterPair[];
  pricing?: PricingTier[];
  whatToExpect?: string[];
  processSteps?: ProcessStep[];
  risksContent?: string;
  faqs?: FAQ[];
};
export type ProcessStep = { title: string; description: string };
export type FAQ = { q: string; a: string };
export type PricingTier = {
  name: string;
  price: string;
  priceLabel?: string;
  unit?: string;
  description?: string;
  items?: string[];
};
export type BeforeAfterDetail = { src: string; label: string };
export type BeforeAfterPair = {
  before: string;
  after: string;
  caption?: string;
  /** Optional clinical detail images (X-ray / CBCT) shown in a strip below the pair. */
  detail?: BeforeAfterDetail[];
};

/** Shape consumed by page components. Images already resolved to URL strings. */
export type PillarData = {
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  intro: string;
  image: string;
  /** Optional portrait used only for the pillar page hero (falls back to `image`). */
  heroImage?: string;
  bentoSpan: string;
  bentoAspect: string;
  slug: string;
  subTreatments: SubTreatment[];
  processSteps: ProcessStep[];
  secondaryProcessTitle?: string;
  secondaryProcessSteps?: ProcessStep[];
  risksContent: string;
  faqs: FAQ[];
  ctaHeadline: string;
  ctaSubhead: string;
};

/** Shape coming from Sanity via GROQ. Every field may be missing or empty. */
export type PillarSanity = {
  _id?: string;
  number?: string;
  title?: string;
  slug?: string;
  tagline?: string;
  shortDescription?: string;
  intro?: string;
  image?: unknown;
  bentoSpan?: string;
  bentoAspect?: string;
  subTreatments?: Partial<SubTreatment>[];
  processSteps?: Partial<ProcessStep>[];
  secondaryProcessTitle?: string;
  secondaryProcessSteps?: Partial<ProcessStep>[];
  risksContent?: string;
  faqs?: Partial<FAQ>[];
  ctaHeadline?: string;
  ctaSubhead?: string;
};

function cleanTreatments(
  items: Partial<SubTreatment>[] | undefined
): SubTreatment[] | null {
  if (!items?.length) return null;
  const cleaned: SubTreatment[] = [];
  for (const i of items) {
    if (!i.id || !i.name || !i.description) continue;
    // Sanity's slug field comes in as { current: string }
    const slug =
      typeof i.slug === "string"
        ? i.slug
        : ((i.slug as unknown as { current?: string } | undefined)?.current ?? i.id);
    cleaned.push({
      id: i.id,
      slug,
      name: i.name,
      description: i.description,
      longDescription: i.longDescription,
      videoUrl: i.videoUrl,
      videoPoster: i.videoPoster,
      imageUrl: i.imageUrl,
      gallery: i.gallery,
      beforeAfter: cleanBeforeAfter(i.beforeAfter) ?? undefined,
      pricing: cleanPricing(i.pricing) ?? undefined,
      whatToExpect: i.whatToExpect,
      processSteps: cleanSteps(i.processSteps) ?? undefined,
      risksContent: i.risksContent,
      faqs: cleanFaqs(i.faqs) ?? undefined,
    });
  }
  return cleaned.length ? cleaned : null;
}

function cleanSteps(
  items: Partial<ProcessStep>[] | undefined
): ProcessStep[] | null {
  const cleaned = items?.filter(
    (i): i is ProcessStep => Boolean(i.title && i.description)
  );
  return cleaned?.length ? cleaned : null;
}

function cleanFaqs(items: Partial<FAQ>[] | undefined): FAQ[] | null {
  const cleaned = items?.filter(
    (i): i is FAQ => Boolean(i.q && i.a)
  );
  return cleaned?.length ? cleaned : null;
}

function cleanBeforeAfter(
  items: Partial<BeforeAfterPair>[] | undefined
): BeforeAfterPair[] | null {
  const cleaned = items
    ?.filter((i): i is BeforeAfterPair => Boolean(i.before && i.after))
    .map((i) => ({
      before: i.before,
      after: i.after,
      caption: i.caption,
      detail: i.detail
        ?.filter((d): d is BeforeAfterDetail => Boolean(d?.src && d?.label))
        .map((d) => ({ src: d.src, label: d.label })),
    }));
  return cleaned?.length ? cleaned : null;
}

function cleanPricing(
  items: Partial<PricingTier>[] | undefined
): PricingTier[] | null {
  const cleaned = items
    ?.filter((i): i is PricingTier => Boolean(i.name && i.price))
    .map((i) => ({
      name: i.name,
      price: i.price,
      priceLabel: i.priceLabel,
      unit: i.unit,
      description: i.description,
      items: i.items,
    }));
  return cleaned?.length ? cleaned : null;
}

/** Merge one Sanity pillar document over a static fallback. */
export function mergePillar(
  remote: PillarSanity | null,
  fallback: PillarData
): PillarData {
  if (!remote) return fallback;

  const remoteImage = remote.image ? urlFor(remote.image) : null;

  return {
    number: remote.number || fallback.number,
    title: remote.title || fallback.title,
    slug: remote.slug || fallback.slug,
    tagline: remote.tagline || fallback.tagline,
    shortDescription: remote.shortDescription || fallback.shortDescription,
    intro: remote.intro || fallback.intro,
    image: remoteImage || fallback.image,
    heroImage: fallback.heroImage,
    bentoSpan: remote.bentoSpan || fallback.bentoSpan,
    bentoAspect: remote.bentoAspect || fallback.bentoAspect,
    subTreatments: cleanTreatments(remote.subTreatments) ?? fallback.subTreatments,
    processSteps: cleanSteps(remote.processSteps) ?? fallback.processSteps,
    secondaryProcessTitle:
      remote.secondaryProcessTitle || fallback.secondaryProcessTitle,
    secondaryProcessSteps:
      cleanSteps(remote.secondaryProcessSteps) ?? fallback.secondaryProcessSteps,
    risksContent: remote.risksContent || fallback.risksContent,
    faqs: cleanFaqs(remote.faqs) ?? fallback.faqs,
    ctaHeadline: remote.ctaHeadline || fallback.ctaHeadline,
    ctaSubhead: remote.ctaSubhead || fallback.ctaSubhead,
  };
}

/**
 * Merge a list of Sanity pillars over an ordered array of fallbacks.
 * Matches remote to fallback by `number` first, then preserves fallback order.
 */
export function mergePillarList(
  remote: PillarSanity[] | null,
  fallbacks: PillarData[]
): PillarData[] {
  if (!remote?.length) return fallbacks;
  return fallbacks.map((fb) => {
    const match = remote.find((r) => r.number === fb.number);
    return mergePillar(match || null, fb);
  });
}
