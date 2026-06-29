import { motion } from "motion/react";
import { ScanSearch, Leaf, Gem, Check } from "lucide-react";

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

// Dr. Nick's credentials — specialist title used per AHPRA-register
// confirmation. Keep registration number on file as the evidence.
const credentials = [
  "Registered specialist prosthodontist (Dental Board of Australia)",
  "Master's in Prosthodontics — I.P. Pavlov University",
  "Graduate Diploma in Oral Implants — University of Sydney",
  "Fellow, International Congress of Oral Implantologists (ICOI)",
  "Advanced training — Misch Implant Institute (Florida) & Walpole Institute (London)",
  "Founder & director, Place Your First Implant — live-patient implant & IV-sedation training for dentists",
];

const foundations = [
  {
    icon: ScanSearch,
    title: "3D CBCT imaging",
    body: "Every implant patient has an in-house 3D CBCT scan. Where flat 2D X-rays can miss detail, the 3D scan maps your jaw in high definition — so we can measure bone depth and density to the millimetre, map nerve pathways and sinuses to plan a precise, safe surgical path, and position your implant virtually before the procedure begins.",
  },
  {
    icon: Leaf,
    title: "EthOss synthetic bone grafting",
    body: "If your scan shows a graft is needed, we use EthOss — a synthetic, medical-grade biomaterial — rather than animal- or donor-derived bone. Made entirely in the lab, it removes the cross-infection risk that comes with donor tissue, contains no animal products (vegan-friendly), and acts as a temporary scaffold your body turns over into its own bone over a few months.",
  },
  {
    icon: Gem,
    title: "Locally made zirconia crowns",
    body: "Every restoration is finished with a custom-milled zirconia crown, designed and crafted locally in Sydney rather than outsourced overseas. Zirconia is a tough, fracture-resistant ceramic that holds its appearance and stands up to everyday chewing forces.",
  },
];

export function DentalImplants() {
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: DENTAL_IMPLANTS.slug,
  });
  const data = mergePillar(remote, DENTAL_IMPLANTS);

  return (
    <>
      <Seo
        title="Dental Implants & All-on-4 — Leichhardt Dental, Dr. Nick Kulkarni"
        description="Single-tooth implants, implant-supported overdentures, and All-on-4 full-arch rehabilitation. Planned and placed by Dr. Nick Kulkarni — registered specialist prosthodontist and Fellow of the International Congress of Oral Implantologists."
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

      {/* Clinical expertise — your dentist */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-12 lg:mb-16"
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
              Clinical expertise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Led by a specialist prosthodontist.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              Your implant treatment is planned and placed by Dr. Nick Kulkarni
              — a registered specialist prosthodontist with over 25 years of
              international clinical experience, who also trains other dentists
              in implant surgery and IV sedation.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4 lg:gap-5"
          >
            {credentials.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 p-5 lg:p-6 rounded-2xl bg-secondary/40 border border-foreground/[0.04]"
              >
                <span className="mt-0.5 w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </span>
                <span className="text-sm lg:text-base text-foreground/85 font-light leading-snug">
                  {line}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <SubTreatmentGrid eyebrow="Three paths" title="From a single tooth to a full arch." items={data.subTreatments} pillarSlug={data.slug} fallbackImage={data.image} />

      {/* The foundations of our implant work */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-14 lg:mb-20"
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
              The foundations of our implant work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Data-driven, evidence-based, precise.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              Three principles guide every implant case we plan — careful
              imaging, biologically sound materials, and local craftsmanship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {foundations.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="p-8 lg:p-10 rounded-3xl bg-background border border-foreground/[0.04]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed font-light">
                    {f.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-10 text-xs text-muted-foreground italic max-w-3xl leading-relaxed">
            Our 3D CBCT scans are clinical files used for internal surgical
            planning only and are not available for external download.
          </p>
        </div>
      </section>

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
