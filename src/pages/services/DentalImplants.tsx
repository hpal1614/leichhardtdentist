import { Seo } from "../../components/Seo";
import { FAQStructuredData } from "../../components/FAQStructuredData";
import { ServicePageHero } from "../../components/service/ServicePageHero";
import { SubTreatmentGrid } from "../../components/service/SubTreatmentGrid";
import { ProcessSteps } from "../../components/service/ProcessSteps";
import { RisksSection } from "../../components/service/RisksSection";
import { ServiceFAQ } from "../../components/service/ServiceFAQ";
import { ServiceCTA } from "../../components/service/ServiceCTA";

import { useSanityDoc } from "../../lib/useSanityDoc";
import { SERVICE_PILLAR_BY_SLUG_QUERY } from "../../lib/queries";
import { mergePillar, type PillarSanity } from "../../lib/pillar";
import { DENTAL_IMPLANTS } from "../../lib/pillar-fallbacks";

export function DentalImplants() {
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: DENTAL_IMPLANTS.slug,
  });
  const data = mergePillar(remote, DENTAL_IMPLANTS);

  return (
    <>
      <Seo
        title="Dental Implants & All-on-4 — Leichhardt Dental, Dr. Nick Kulkarni"
        description="Single-tooth implants, implant-supported overdentures, and All-on-4 full-arch rehabilitation. Planned and placed by Dr. Nick Kulkarni — Fellow, International Congress of Oral Implantologists."
        path={`/services/${data.slug}`}
      />
      <FAQStructuredData faqs={data.faqs} />
      <ServicePageHero
        pillarNumber={data.number}
        title={data.title}
        tagline={data.tagline}
        intro={data.intro}
        image={data.image}
      />
      <SubTreatmentGrid eyebrow="Three paths" title="From a single tooth to a full arch." items={data.subTreatments} pillarSlug={data.slug} fallbackImage={data.image} />
      <ProcessSteps eyebrow="Your journey" title="How an implant is placed." steps={data.processSteps} />
      {data.secondaryProcessSteps && data.secondaryProcessTitle && (
        <ProcessSteps
          eyebrow="All-on-4 specifically"
          title={data.secondaryProcessTitle}
          steps={data.secondaryProcessSteps}
        />
      )}
      <RisksSection content={data.risksContent} />
      <ServiceFAQ title="Common questions about implants." faqs={data.faqs} />
      <ServiceCTA headline={data.ctaHeadline} subhead={data.ctaSubhead} />
    </>
  );
}
