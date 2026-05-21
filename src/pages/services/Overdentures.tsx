import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowLeft,
  Check,
  Phone,
  Anchor,
  Sparkles,
  Wallet,
  Layers,
} from "lucide-react";

import { Seo } from "../../components/Seo";
import { FAQStructuredData } from "../../components/FAQStructuredData";
import { ProcessSteps } from "../../components/service/ProcessSteps";
import { RisksSection } from "../../components/service/RisksSection";
import { ServiceFAQ } from "../../components/service/ServiceFAQ";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

import { BOOKING_LINK_PROPS } from "../../lib/booking";
import { usePractice } from "../../lib/usePractice";
import { useSanityDoc } from "../../lib/useSanityDoc";
import { SERVICE_PILLAR_BY_SLUG_QUERY } from "../../lib/queries";
import { mergePillar, type PillarSanity, type SubTreatment } from "../../lib/pillar";
import { DENTAL_IMPLANTS } from "../../lib/pillar-fallbacks";

import clinicReception from "../../assets/clinic-2.webp";

const SLUG = "implant-supported-overdentures";

// Real clinical images from Dr. Nick's case deck. Educational pair (how the
// attachments work) + one consented before/after case. Served via Cloudinary
// with q_auto,f_auto so capable browsers get WebP/AVIF.
const IMG_BASE =
  "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/services/implants/overdentures";
const IMG = {
  implantAttachments: `${IMG_BASE}/implant-attachments.jpg`,
  dentureAttachments: `${IMG_BASE}/denture-attachments.jpg`,
  caseBefore: `${IMG_BASE}/case-1-before.jpg`,
  caseAfter: `${IMG_BASE}/case-1-after.jpg`,
};

const benefits = [
  {
    icon: Anchor,
    title: "Greater stability",
    body: "Anchored to implants rather than resting on the gums, the denture moves far less than a conventional one — which can make eating and speaking more comfortable.",
  },
  {
    icon: Sparkles,
    title: "Simple to clean",
    body: "Because it stays removable, day-to-day cleaning is straightforward: take it out, clean the denture, and clean your gums and the attachments.",
  },
  {
    icon: Wallet,
    title: "A lower-cost entry to implants",
    body: "A typical two-implant case is approximately $12,000 — a lower-cost entry point into implant treatment than a full fixed bridge.",
  },
  {
    icon: Layers,
    title: "A step you can build on",
    body: "Some patients choose an overdenture first and later move to a fully fixed option such as All-on-4. It can be a sensible interim step.",
  },
];

export function Overdentures() {
  const practice = usePractice();
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: "dental-implants",
  });
  const pillar = mergePillar(remote, DENTAL_IMPLANTS);

  // Reuse the already-compliant copy (process, risks, FAQs) from the
  // sub-treatment data so this page and the implants pillar stay in sync.
  const sub: SubTreatment =
    pillar.subTreatments.find((s) => s.id === "overdentures") ??
    DENTAL_IMPLANTS.subTreatments.find((s) => s.id === "overdentures")!;

  const faqs = sub.faqs ?? [];

  return (
    <>
      <Seo
        title="Implant-Supported Overdentures — Leichhardt Dental, Dr. Nick Kulkarni"
        description="A removable denture that clips onto two implants for greater stability than a conventional denture. Typical two-implant case approx. $12,000 AUD. Planned and placed by Dr. Nick Kulkarni in Sydney's Inner West."
        path={`/services/dental-implants/${SLUG}`}
      />
      <FAQStructuredData faqs={faqs} />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 bg-secondary/30 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10 lg:mb-14 flex-wrap"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services/dental-implants" className="hover:text-primary transition-colors">Dental Implants</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Implant-Supported Overdentures</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                Implant Dentistry
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-[0.98] tracking-tight mb-8">
                Implant-Supported<br />Overdentures.
              </h1>
              <p className="text-lg lg:text-xl text-primary font-light italic mb-6">
                A denture that stays put — anchored to implants, not your gums.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                For patients seeking a more stable alternative to a conventional
                denture — without the full investment of a fixed bridge — an
                implant-supported overdenture is an evidence-based middle-ground
                option. Typically two implants are placed in the lower jaw, and
                your denture clips securely onto them with hidden attachments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  {...BOOKING_LINK_PROPS}
                  className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 lg:px-9 lg:py-5 rounded-full text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center justify-center"
                >
                  Book a Consultation
                </a>
                <a
                  href={`tel:${practice.phoneIntl}`}
                  className="inline-flex items-center justify-center px-7 py-4 lg:px-9 lg:py-5 rounded-full border border-foreground/20 text-foreground hover:bg-foreground hover:text-background text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" /> {practice.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-foreground/5"
            >
              {/* TODO(hero-image): placeholder only — clinic reception photo.
                  Replace with a proper, approved hero. User rejected AI,
                  cheesy stock, the clinical close-up, and Dr. Nick's photo
                  (never use Nick's photo). Ideal: a real, consented
                  patient/lifestyle photo from the practice. */}
              <ImageWithFallback
                src={clinicReception}
                alt="The reception and waiting area at Leichhardt Dental Centre"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works — educational images */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-14 lg:mb-20"
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Two implants. A secure click.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              Placing two implants in the lower jaw helps stabilise the denture
              so it doesn't lift away from the gum. Hidden attachments inside the
              denture lock onto the attachments on the implants, creating a
              friction fit that holds the denture in place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] overflow-hidden bg-foreground/5 border border-foreground/[0.04]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={IMG.implantAttachments}
                  alt="Two implant attachments in place on the lower jaw"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-6 lg:p-8 text-sm lg:text-base text-muted-foreground font-light leading-relaxed">
                Two implants placed in the lower jaw act as secure anchors, each
                fitted with a small attachment that sits at the gum line.
              </figcaption>
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-[2rem] overflow-hidden bg-foreground/5 border border-foreground/[0.04]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={IMG.dentureAttachments}
                  alt="The underside of the denture showing the clip housings that lock onto the implants"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-6 lg:p-8 text-sm lg:text-base text-muted-foreground font-light leading-relaxed">
                Matching attachments are hidden inside the denture. They clip
                onto the implants to create a friction lock for retention.
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* Why choose an overdenture */}
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
              Why consider one
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02]">
              The benefits of an overdenture.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
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
                    {b.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed font-light">
                    {b.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real patient case — before/after (AHPRA: real, consented, contextualised, disclaimed, no quote) */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-12 lg:mb-16"
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
              A real patient case
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Failing dentition, rehabilitated.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              A patient treated at Leichhardt Dental Centre. A failing lower
              dentition was rehabilitated with a two-implant–supported
              overdenture — restoring chewing function and the appearance of a
              full smile.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="relative rounded-[2rem] overflow-hidden bg-foreground/5"
            >
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
                Before
              </span>
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={IMG.caseBefore}
                  alt="Before treatment: a failing lower dentition with broken and decayed teeth"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden bg-foreground/5"
            >
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
                After
              </span>
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={IMG.caseAfter}
                  alt="After treatment: a restored smile with the implant-supported overdenture in place"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.figure>
          </div>

          <p className="mt-8 text-xs lg:text-sm text-muted-foreground/80 italic max-w-3xl leading-relaxed">
            Individual results vary — this is not a guarantee of outcome. The
            images are real, unaltered clinical photographs of one patient
            treated at this practice, published with the patient's consent.
            Treatment suitability and the likely result for your own situation
            can only be determined at a consultation. It is wise to seek a
            second opinion before any significant treatment.
          </p>
        </div>
      </section>

      {/* Pricing — figure provided by Dr. Nick, kept as given */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
                What it costs
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
                Transparent, up front.
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
                We know cost is an important part of the decision. A typical
                case — two implants, the custom denture, and all the necessary
                clinical work — is approximately the figure shown. Your final,
                itemised quote is confirmed in writing after a consultation and
                3D scan, tailored to your situation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 p-10 lg:p-12 rounded-[2rem] bg-background border border-foreground/[0.04]"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Typical two-implant case
              </p>
              <p className="text-5xl lg:text-6xl font-heading font-bold text-foreground mb-1">
                ~$12,000 <span className="text-base font-light text-muted-foreground">AUD</span>
              </p>
              <p className="text-sm text-muted-foreground font-light mb-8">
                Approximate, all-inclusive of a standard case.
              </p>
              <ul className="space-y-3 border-t border-foreground/10 pt-6">
                {[
                  "Two implants placed in the lower jaw",
                  "Your custom overdenture with snap-on attachments",
                  "All necessary clinical work for a standard case",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-base text-foreground/80 font-light">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/80 italic max-w-3xl leading-relaxed">
            Price is indicative and in Australian dollars. Individual cases vary;
            your final fee is confirmed in a written treatment plan after
            clinical assessment. Suitability for implant treatment depends on
            your individual clinical situation — not all patients are candidates.
          </p>
        </div>
      </section>

      {/* Process */}
      {sub.processSteps && sub.processSteps.length > 0 && (
        <ProcessSteps
          eyebrow="The process"
          title="How your overdenture is delivered."
          steps={sub.processSteps}
        />
      )}

      {/* Risks & considerations (incl. removable-device + maintenance notes) */}
      <RisksSection content={sub.risksContent || pillar.risksContent} />

      {/* FAQ */}
      {faqs.length > 0 && (
        <ServiceFAQ title="Common questions about overdentures." faqs={faqs} />
      )}

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] bg-[#1a1a1a] text-white p-10 lg:p-16 xl:p-20 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-[1.05] mb-6 max-w-3xl mx-auto">
              See if an overdenture is right for you.
            </h2>
            <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Book a consultation with Dr. Nick. We'll assess your situation,
              talk through your options honestly, and give you a clear written
              plan — no pressure to proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                {...BOOKING_LINK_PROPS}
                className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 lg:px-9 lg:py-5 rounded-full text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center justify-center"
              >
                Book a Consultation
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-4 lg:px-9 lg:py-5 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300"
              >
                Send a message
              </Link>
            </div>
            <p className="mt-10 pt-8 border-t border-white/10 text-xs text-white/40 font-light max-w-xl mx-auto">
              {practice.address.streetAddress}, {practice.address.addressLocality}{" "}
              {practice.address.addressRegion} {practice.address.postalCode} ·{" "}
              {practice.phone}
            </p>

            <Link
              to="/services/dental-implants"
              className="inline-flex items-center gap-2 mt-8 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dental Implants
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
