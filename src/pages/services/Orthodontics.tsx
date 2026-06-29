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
import { ORTHODONTICS } from "../../lib/pillar-fallbacks";

export function Orthodontics() {
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: ORTHODONTICS.slug,
  });
  const data = mergePillar(remote, ORTHODONTICS);

  return (
    <>
      <Seo
        title="Orthodontics — Invisalign & Early Intervention · Leichhardt Dental"
        description="Orthodontic care with visiting clinician Dr. Sagar (Jimmy) Rao. Invisalign clear aligners for adults, early interventive orthodontics for children, and airway-focused care."
        path={`/services/${data.slug}`}
      />
      <FAQStructuredData faqs={data.faqs} />
      <ServicePageHero
        pillarNumber={data.number}
        title={data.title}
        tagline={data.tagline}
        intro={data.intro}
        image={data.heroImage ?? data.image}
      />
      <SubTreatmentGrid
        eyebrow="Three paths"
        title="From clear aligners to airway-focused care."
        items={data.subTreatments}
        pillarSlug={data.slug}
        fallbackImage={data.image}
      />
      <ProcessSteps eyebrow="Your journey" title="How orthodontic care runs." steps={data.processSteps} />
      <RisksSection content={data.risksContent} />
      <ServiceFAQ title="Common questions about orthodontics." faqs={data.faqs} />
      <ServiceCTA headline={data.ctaHeadline} subhead={data.ctaSubhead} />
    </>
  );
}
