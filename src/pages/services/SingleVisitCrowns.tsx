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
import { SINGLE_VISIT_CROWNS } from "../../lib/pillar-fallbacks";

export function SingleVisitCrowns() {
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: SINGLE_VISIT_CROWNS.slug,
  });
  const data = mergePillar(remote, SINGLE_VISIT_CROWNS);

  return (
    <>
      <Seo
        title="CEREC Single Visit Crowns — Leichhardt Dental"
        description="Custom ceramic crowns designed, milled, and bonded in a single appointment using CEREC technology. No impressions, no temporary, no second visit."
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
      <SubTreatmentGrid eyebrow="What CEREC covers" title="Three restorations, one appointment." items={data.subTreatments} pillarSlug={data.slug} fallbackImage={data.image} />
      <ProcessSteps eyebrow="The process" title="Five steps, one visit." steps={data.processSteps} />
      {data.secondaryProcessSteps && data.secondaryProcessTitle && (
        <ProcessSteps title={data.secondaryProcessTitle} steps={data.secondaryProcessSteps} />
      )}
      <RisksSection content={data.risksContent} />
      <ServiceFAQ title="Common questions about CEREC." faqs={data.faqs} />
      <ServiceCTA headline={data.ctaHeadline} subhead={data.ctaSubhead} />
    </>
  );
}
