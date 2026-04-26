import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight, ArrowLeft, Check } from "lucide-react";

import { Seo } from "../../components/Seo";
import { FAQStructuredData } from "../../components/FAQStructuredData";
import { MediaBlock } from "../../components/service/MediaBlock";
import { ProcessSteps } from "../../components/service/ProcessSteps";
import { RisksSection } from "../../components/service/RisksSection";
import { ServiceFAQ } from "../../components/service/ServiceFAQ";
import { ServiceCTA } from "../../components/service/ServiceCTA";

import { useSanityDoc } from "../../lib/useSanityDoc";
import { SERVICE_PILLAR_BY_SLUG_QUERY } from "../../lib/queries";
import { mergePillar, type PillarSanity } from "../../lib/pillar";
import { ALL_PILLARS, findSubTreatment } from "../../lib/pillar-fallbacks";

export function SubTreatmentPage() {
  const { pillarSlug = "", subSlug = "" } = useParams();

  const found = findSubTreatment(pillarSlug, subSlug);

  // Hooks must run unconditionally — call the hook with the slug we have,
  // then early-return below if the pillar itself isn't known.
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: pillarSlug,
  });

  if (!found) return <Navigate to="/" replace />;

  const fallbackPillar =
    ALL_PILLARS.find((p) => p.slug === pillarSlug) ?? found.pillar;
  const pillar = mergePillar(remote, fallbackPillar);

  // Match sub from the (potentially CMS-merged) pillar; fall back to local sub.
  const sub = pillar.subTreatments.find((s) => s.slug === subSlug) ?? found.sub;

  const risksParagraph = sub.risksContent || pillar.risksContent;

  return (
    <>
      <Seo
        title={`${sub.name} — ${pillar.title.replace(/\.$/, "")} · Leichhardt Dental`}
        description={sub.longDescription || sub.description}
        path={`/services/${pillar.slug}/${sub.slug}`}
      />
      <FAQStructuredData
        faqs={sub.faqs && sub.faqs.length > 0 ? sub.faqs : pillar.faqs}
      />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 bg-secondary/30 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10 lg:mb-14 flex-wrap"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/" className="hover:text-primary transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/services/${pillar.slug}`}
              className="hover:text-primary transition-colors"
            >
              {pillar.title.replace(/\.$/, "")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{sub.name}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                {pillar.title.replace(/\.$/, "")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-[0.98] tracking-tight mb-8">
                {sub.name}.
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                {sub.longDescription || sub.description}
              </p>
              <Link
                to={`/services/${pillar.slug}`}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground font-semibold border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {pillar.title.replace(/\.$/, "")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-foreground/5"
            >
              <MediaBlock
                videoUrl={sub.videoUrl}
                videoPoster={sub.videoPoster}
                imageUrl={sub.imageUrl}
                fallbackImage={pillar.image}
                alt={sub.name}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      {sub.whatToExpect && sub.whatToExpect.length > 0 && (
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
                  What to expect
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.02]">
                  On the day.
                </h2>
              </div>
              <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-4 lg:gap-5 content-start">
                {sub.whatToExpect.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="flex items-start gap-3 p-5 rounded-2xl bg-secondary/40 border border-foreground/[0.04]"
                  >
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span className="text-sm lg:text-base text-foreground leading-snug font-light">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Process steps (sub-specific if present, else pillar) */}
      {((sub.processSteps && sub.processSteps.length > 0) ||
        pillar.processSteps.length > 0) && (
        <ProcessSteps
          eyebrow="Process"
          title={`How ${sub.name.toLowerCase()} is delivered.`}
          steps={
            sub.processSteps && sub.processSteps.length > 0
              ? sub.processSteps
              : pillar.processSteps
          }
        />
      )}

      {/* Risks */}
      <RisksSection content={risksParagraph} />

      {/* FAQs (sub-specific if present, else pillar) */}
      {((sub.faqs && sub.faqs.length > 0) || pillar.faqs.length > 0) && (
        <ServiceFAQ
          title="Common questions."
          faqs={
            sub.faqs && sub.faqs.length > 0 ? sub.faqs : pillar.faqs
          }
        />
      )}

      <ServiceCTA
        headline={pillar.ctaHeadline}
        subhead={pillar.ctaSubhead}
      />
    </>
  );
}
