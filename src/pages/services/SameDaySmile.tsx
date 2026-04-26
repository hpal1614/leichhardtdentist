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
import { SAME_DAY_SMILE } from "../../lib/pillar-fallbacks";

export function SameDaySmile() {
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: SAME_DAY_SMILE.slug,
  });
  const data = mergePillar(remote, SAME_DAY_SMILE);

  return (
    <>
      <Seo
        title="Same Day Smile Design — Leichhardt Dental"
        description="Full smile makeover in a single day: CEREC ceramics, whitening, bonding, and gum contouring — planned together and delivered by Dr. Nick Kulkarni."
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
      <SubTreatmentGrid eyebrow="What we combine" title="Five treatments, planned as one." items={data.subTreatments} pillarSlug={data.slug} fallbackImage={data.image} />
      <ProcessSteps eyebrow="The process" title="From first conversation to final smile." steps={data.processSteps} />
      {data.secondaryProcessSteps && data.secondaryProcessTitle && (
        <ProcessSteps title={data.secondaryProcessTitle} steps={data.secondaryProcessSteps} />
      )}
      <RisksSection content={data.risksContent} />
      <ServiceFAQ title="Common questions about same-day smile design." faqs={data.faqs} />
      <ServiceCTA headline={data.ctaHeadline} subhead={data.ctaSubhead} />
    </>
  );
}
