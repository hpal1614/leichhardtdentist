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
import { GENERAL_DENTISTRY } from "../../lib/pillar-fallbacks";

export function GeneralDentistry() {
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: GENERAL_DENTISTRY.slug,
  });
  const data = mergePillar(remote, GENERAL_DENTISTRY);

  return (
    <>
      <Seo
        title="General Dentistry — Check-ups, Fillings, Root Canals · Leichhardt Dental"
        description="Preventative and restorative dentistry in Leichhardt. Check-ups, cleans, fillings, bridges, wisdom teeth, root canal treatment, and family dentistry with Dr. Nick Kulkarni."
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
      <SubTreatmentGrid
        eyebrow="What's included"
        title="Six everyday treatments, one calm room."
        items={data.subTreatments}
        pillarSlug={data.slug}
        fallbackImage={data.image}
      />
      <ProcessSteps eyebrow="Your visit" title="How a general appointment runs." steps={data.processSteps} />
      {data.secondaryProcessSteps && data.secondaryProcessTitle && (
        <ProcessSteps title={data.secondaryProcessTitle} steps={data.secondaryProcessSteps} />
      )}
      <RisksSection content={data.risksContent} />
      <ServiceFAQ title="Common questions." faqs={data.faqs} />
      <ServiceCTA headline={data.ctaHeadline} subhead={data.ctaSubhead} />
    </>
  );
}
