import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  ScanSearch,
  HeartHandshake,
  Phone,
  ShoppingCart,
  Home,
  Pill,
  Car,
  Sparkles,
} from "lucide-react";

import { Seo } from "../../components/Seo";
import { FAQStructuredData } from "../../components/FAQStructuredData";
import { MediaBlock } from "../../components/service/MediaBlock";
import { ProcessSteps } from "../../components/service/ProcessSteps";
import { RisksSection } from "../../components/service/RisksSection";
import { ServiceFAQ } from "../../components/service/ServiceFAQ";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

import { BOOKING_LINK_PROPS } from "../../lib/booking";
import { usePractice } from "../../lib/usePractice";
import { useSanityDoc } from "../../lib/useSanityDoc";
import { SERVICE_PILLAR_BY_SLUG_QUERY } from "../../lib/queries";
import { mergePillar, type PillarSanity } from "../../lib/pillar";
import { DENTAL_IMPLANTS } from "../../lib/pillar-fallbacks";

import drNickImg from "../../assets/dr-nick.jpg";
import clinic2 from "../../assets/clinic-2.webp";

const SLUG = "all-on-4-implants";

const journeySteps = [
  {
    title: "Clinical assessment (Day 1)",
    description:
      "Your consultation with Dr. Nick begins with an on-site 3D CBCT scan that maps your bone structure and nerve pathways. He reviews your suitability, discusses whether any natural teeth can be preserved, and you leave with a transparent, fixed-price written quote.",
  },
  {
    title: "Surgical appointment (procedure day)",
    description:
      "Under your chosen level of anaesthesia or IV sedation, Dr. Nick precisely places 4–6 titanium implants per arch. Most patients opt for sleep-dentistry pathways for comfort — you remain relaxed throughout the morning.",
  },
  {
    title: "Phase 1 — your immediate smile (within 24–48 hours)",
    description:
      "Your long-term provisional bridge (high-strength acrylic) is fitted. You walk out with a fixed, functional set of teeth and can begin eating a soft-food diet and smiling that day.",
  },
  {
    title: "Healing & integration (3–6 months)",
    description:
      "Your titanium implants undergo osseointegration — fusing with the surrounding jawbone. We see you for minor check-ups to monitor healing while you wear the provisional teeth.",
  },
  {
    title: "Phase 2 — the definitive bridge (final appointment)",
    description:
      "Once healing is complete and your gum tissue has stabilised, we take final impressions and craft your titanium-reinforced definitive bridge. You choose between the Titanium Signature (PMMA) and the Zirconia Prestige for the final restoration — designed for long-term durability and matched to your face.",
  },
];

const timelineStats = [
  { label: "Total surgical time", value: "2–4 hrs" },
  { label: "Time to first smile", value: "24–48 hrs" },
  { label: "Time to final restoration", value: "3–6 mo" },
];

const prepChecklist = [
  {
    icon: ShoppingCart,
    number: "01",
    title: "Grocery & nutrition prep",
    intro:
      "You'll be on a no-chew diet for the first few days, so a stocked kitchen makes a real difference.",
    items: [
      "Liquid staples — high-protein shakes (Up&Go, Optifast), Greek yoghurt, smooth apple sauce",
      "Pureed options — smooth soups (pumpkin, tomato, chicken broth) with no chunks or seeds",
      "Hydration — coconut water or electrolyte drinks for easy hydration without chewing",
      "Soft transition foods — eggs, avocados, mashed-potato ingredients for Day 3 onwards",
    ],
  },
  {
    icon: Home,
    number: "02",
    title: "Home comfort setup",
    intro: "A dedicated recovery zone where you can rest undisturbed.",
    items: [
      "Pillow stack — 2–3 firm pillows to keep your head elevated, which helps reduce post-op swelling",
      "Entertainment — podcasts, audiobooks, or movies downloaded so you can rest your body and your mind",
      "Ice packs — at least two cold compresses ready in the freezer so you can rotate them",
    ],
  },
  {
    icon: Pill,
    number: "03",
    title: "Pharmacy & essentials",
    intro: "A small kit ready by the bedside means no chemist runs on the day.",
    items: [
      "Prescriptions — any pre-op medications from Dr. Nick filled and ready",
      "Lip care — a quality lip balm or petroleum jelly for dry lips after sedation",
      "Soft toothbrush — we provide a post-op kit, but an extra ultra-soft brush helps",
    ],
  },
  {
    icon: Car,
    number: "04",
    title: "Surgery day logistics",
    intro: "Particularly important if you're choosing sedation or sleep dentistry.",
    items: [
      "Support driver — a responsible adult to drive you home and stay with you for the first 4–6 hours after IV sedation. We can't release you to a taxi or rideshare alone.",
      "What to wear — loose, comfortable clothing with sleeves that roll up easily for the IV or blood-pressure cuff",
      "Fasting — if you're having sedation, follow the specific fasting instructions our team gives you (typically no food or water for 6 hours beforehand)",
      "Valuables — leave jewellery and watches at home",
    ],
  },
  {
    icon: Sparkles,
    number: "05",
    title: "The mental prep",
    intro: "The unglamorous bit — but worth a moment.",
    items: [
      "Remember why you're doing this. The first few days are an investment in years of better function. Coming in calm and prepared makes the early recovery easier and quicker.",
    ],
  },
];

const techPoints = [
  {
    icon: ScanSearch,
    title: "On-site 3D CBCT imaging",
    body: "Sub-millimetre mapping of your jaw, sinuses, and nerve anatomy — no external referrals, no scan delays.",
  },
  {
    icon: ShieldCheck,
    title: "CEREC digital workflow",
    body: "Provisional teeth designed and milled in-house. Final restorations matched to the planning data, not approximated.",
  },
  {
    icon: HeartHandshake,
    title: "Sedation options available",
    body: "IV sedation and sleep-dentistry pathways for patients with anxiety or for longer surgical visits.",
  },
];

const faqs = [
  {
    q: "How much does All-on-4 cost?",
    a: "All-on-4 is delivered in two phases. Phase 1 (the initial surgery, four implants per arch and same-day provisional teeth) is from $19,500 per arch. Phase 2 — the final restoration after healing — is either $8,000 (titanium signature) or $10,000 (zirconia prestige). All prices are subject to your individual clinical assessment and are confirmed in writing after a consultation.",
  },
  {
    q: "Am I a candidate if I have significant bone loss?",
    a: "Often, yes. One of the practical advantages of the All-on-4 technique is that it can frequently bypass the need for extensive bone grafting. By angling the rear implants, we can use the denser bone in the front of the jaw. During your on-site 3D CBCT assessment, Dr. Nick maps your bone volume precisely and tells you honestly whether this protocol is suitable for your case — and what the alternatives are if it isn't.",
  },
  {
    q: "Is All-on-4 my only option for replacing missing teeth?",
    a: "Not at all. All-on-4 is one of several pathways. During your on-site CBCT assessment, Dr. Nick reviews your situation and recommends the option that best fits your clinical needs, lifestyle, and budget. Alternatives may include: single or multiple implants (where healthy natural teeth remain, individual implants or implant-supported bridges can preserve them); implant-retained overdentures (a removable denture secured by 2–4 implants — significantly more stable than a conventional denture, typically at a lower price point than full-arch implants); traditional crown & bridge work (when healthy tooth roots remain either side of a gap); and advanced periodontal therapy (sometimes a referral to a periodontist for gum treatment can save natural teeth before extractions are even considered). Our approach is evidence-based — we only recommend full-arch implants when they're the most appropriate long-term solution for your oral health.",
  },
  {
    q: "How long do All-on-4 implants last?",
    a: "With diligent oral hygiene and regular maintenance visits, titanium implants are designed for very long-term function. Long-term clinical studies report implant survival rates above 95% at 10 years for All-on-4 cases, though individual outcomes vary based on health, smoking, hygiene, and bite forces. The prosthetic bridge attached to the implants experiences normal wear and is typically refurbished or replaced every 10–15 years, similar to other restorations.",
  },
  {
    q: "Will I be in pain during or after the procedure?",
    a: "The surgery itself is performed under local anaesthesia or IV sedation, so the procedure is not painful. Most patients report that post-operative discomfort is manageable with standard pain relief. Swelling typically peaks on day 2–3 and settles within a week. We give you a clear written aftercare plan and a number to call if you have any concerns.",
  },
  {
    q: "What can I eat after the surgery?",
    a: "For the first 24–72 hours, a liquid diet (smoothies, lukewarm broths, protein shakes) protects the surgical sites. Once the long-term provisional bridge is fitted, you can move to 'fork-mashable' soft foods — scrambled eggs, soft pasta, steamed fish. Hard, crunchy, or sticky foods should be avoided for the first three months while the implants integrate with bone.",
  },
  {
    q: "How do I clean the new teeth if they don't come out?",
    a: "You care for them much like natural teeth, with a couple of additions. Twice-daily brushing with a soft-bristled brush, plus a water flosser (Waterpik) or specialised floss to clean under the bridge. Because we use the staged Phase 1 and Phase 2 protocol, the definitive bridge is designed with hygiene access in mind, making daily maintenance straightforward.",
  },
  {
    q: "Is there an age limit for this treatment?",
    a: "There's no upper age limit. Suitability is determined by your general health and jawbone condition, not your age. We've treated patients in their 70s and 80s and beyond. Your consultation and 3D scan tell us what's clinically feasible in your case.",
  },
  {
    q: "What is Dr. Nick's training in implant dentistry?",
    a: "Dr. Nick Kulkarni holds a Graduate Diploma in Clinical Dentistry (Oral Implants) from the University of Sydney, a Fellowship from the International Congress of Oral Implantologists, and additional training at the Misch Implant Institute (USA) and Walpole Institute (London). He has over 20 years of clinical experience and trains other dentists in implant protocols through First Implant.",
  },
];

export function AllOnFourPage() {
  const practice = usePractice();
  const remote = useSanityDoc<PillarSanity>(SERVICE_PILLAR_BY_SLUG_QUERY, {
    slug: "dental-implants",
  });
  const pillar = mergePillar(remote, DENTAL_IMPLANTS);

  return (
    <>
      <Seo
        title="All-on-4 Full-Arch Implants — Leichhardt Dental, Dr. Nick Kulkarni"
        description="Full-arch implant rehabilitation in Sydney's Inner West. Two-phase pathway from $19,500 per arch. Planned and placed by Dr. Nick Kulkarni, Fellow of the International Congress of Oral Implantologists."
        path={`/services/dental-implants/${SLUG}`}
      />
      <FAQStructuredData faqs={faqs} />

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
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services/dental-implants" className="hover:text-primary transition-colors">Dental Implants</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">All-on-4 Implants</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                Full-Arch Implant Restoration
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-[0.98] tracking-tight mb-8">
                All-on-4<br />Implants.
              </h1>
              <p className="text-lg lg:text-xl text-primary font-light italic mb-6">
                A long-term smile, built on clinical precision.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                A full-arch implant pathway for patients facing failing teeth,
                loose dentures, or a lifetime of compromised function. Planned
                and placed by Dr. Nick Kulkarni, with on-site diagnostics and
                a calm, evidence-based approach the Inner West has trusted for
                over a decade.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  {...BOOKING_LINK_PROPS}
                  className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 lg:px-9 lg:py-5 rounded-full text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center justify-center"
                >
                  Book an All-on-4 Consultation
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
              <MediaBlock fallbackImage={clinic2} alt="On-site implant surgery suite" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet your dentist (NOT 'surgeon' — protected title) */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="lg:col-span-5 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src={drNickImg}
                alt="Dr. Nick Kulkarni"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-5 block">
                Your dentist
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-8">
                Dr. Nick Kulkarni.
              </h2>

              <div className="space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed font-light mb-10">
                <p>
                  Dr. Nick has 20+ years of clinical experience across four
                  continents. He holds a Graduate Diploma in Clinical Dentistry
                  (Oral Implants) from the University of Sydney and a Fellowship
                  from the International Congress of Oral Implantologists.
                </p>
                <p>
                  Alongside the practice, he founded First Implant — a teaching
                  programme through which he mentors and conducts hands-on
                  training for fellow dentists across Sydney and northern NSW.
                </p>
              </div>

              <ul className="space-y-3 border-t border-foreground/10 pt-8">
                {[
                  "Fellow of the International Congress of Oral Implantologists (ICOI)",
                  "Graduate Diploma in Oral Implants — University of Sydney",
                  "Misch Implant Institute (USA) and Walpole Institute (London) trained",
                  "Founder of First Implant — clinical implant training programme",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-base lg:text-lg text-foreground/80 font-light"
                  >
                    <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology + care */}
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
              The Leichhardt standard
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02]">
              Technology in service of care.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {techPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
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
                    {p.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed font-light">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-10 text-xs text-muted-foreground/80 italic max-w-3xl leading-relaxed">
            Our 3D CBCT scans are high-density clinical files used exclusively
            for internal surgical planning and are not available for external
            download or transfer.
          </p>
        </div>
      </section>

      {/* Treatment roadmap & pricing */}
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
              Your treatment roadmap
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Two phases. Transparent pricing.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              The pathway is staged so your implants integrate fully before
              taking the load of a permanent restoration. Pricing below is a
              guide; your final, fixed quote is confirmed in writing after
              your consultation and 3D scan.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 p-10 lg:p-12 rounded-[2rem] bg-secondary/40 border border-foreground/[0.04]"
            >
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-5 block">
                Phase 01
              </span>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2 leading-tight">
                The initial transformation
              </h3>
              <p className="text-base text-muted-foreground mb-8 font-light">
                Function and confidence restored in days, while your implants
                integrate with bone.
              </p>

              <div className="border-t border-foreground/10 pt-6 mb-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  From
                </p>
                <p className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                  $19,500 <span className="text-base font-light text-muted-foreground">AUD per arch</span>
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "Four implants placed per arch under sedation or GA",
                  "High-strength provisional teeth fitted within 24–48 hours",
                  "Surgical placement guided by in-house 3D CBCT diagnostics",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-base text-foreground/80 font-light">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 p-10 lg:p-12 rounded-[2rem] bg-[#1a1a1a] text-white"
            >
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-5 block">
                Phase 02
              </span>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-2 leading-tight">
                The definitive restoration
              </h3>
              <p className="text-base text-white/70 mb-8 font-light">
                Once healing is complete (typically 3–6 months), your final
                fixed prosthesis replaces the provisional set.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">Option 1</p>
                  <h4 className="text-xl font-heading font-bold mb-2">Titanium Signature</h4>
                  <p className="text-2xl font-heading font-bold mb-3">$8,000 <span className="text-sm font-light text-white/60">AUD</span></p>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Medical-grade titanium bar with high-strength PMMA acrylic.
                    Lightweight, comfortable, natural feel.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">Option 2</p>
                  <h4 className="text-xl font-heading font-bold mb-2">Zirconia Prestige</h4>
                  <p className="text-2xl font-heading font-bold mb-3">$10,000 <span className="text-sm font-light text-white/60">AUD</span></p>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Individual monolithic zirconia teeth. Maximum translucency,
                    durability, and stain resistance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/80 italic max-w-3xl leading-relaxed">
            All prices indicative and in Australian dollars. Final fees are
            confirmed in a written treatment plan after clinical assessment.
            Suitability for All-on-4 depends on your individual
            clinical situation; not all patients are candidates.
          </p>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps
        eyebrow="Your journey"
        title="The path to your new smile."
        steps={journeySteps}
      />

      {/* Timeline summary */}
      <section className="py-16 lg:py-20 bg-secondary/30 border-y border-foreground/[0.04]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="grid sm:grid-cols-3 gap-5 lg:gap-6"
          >
            {timelineStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 lg:p-10 rounded-3xl bg-background border border-foreground/[0.04] text-center"
              >
                <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-4">
                  {stat.label}
                </span>
                <span className="block text-4xl lg:text-5xl font-heading font-bold text-foreground">
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-8 text-xs text-muted-foreground/80 italic max-w-3xl mx-auto text-center leading-relaxed">
            Indicative timings only. Individual pathways vary based on healing,
            health, and clinical findings.
          </p>
        </div>
      </section>

      {/* Surgery day preparation checklist */}
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
              Once you've booked
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Your surgery day<br />preparation checklist.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              Small steps that make a real difference. We recommend completing
              this checklist about 48 hours before your scheduled procedure.
              Your formal pre-op letter from Dr. Nick takes precedence wherever
              the two differ.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {prepChecklist.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="p-8 lg:p-10 rounded-3xl bg-secondary/40 border border-foreground/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">
                      {card.number}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed font-light mb-6">
                    {card.intro}
                  </p>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm lg:text-base text-foreground/80 font-light leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-10 text-xs text-muted-foreground/80 italic max-w-3xl leading-relaxed">
            This is general guidance only. Your specific pre-op instructions —
            including any prescriptions, fasting requirements, and stopping or
            adjusting routine medications — will be confirmed in writing by Dr.
            Nick before your procedure. Always follow that written plan if it
            differs from anything here.
          </p>
        </div>
      </section>

      {/* Consultation card */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] bg-secondary/40 border border-foreground/[0.04] p-10 lg:p-16 xl:p-20"
          >
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
                  Your first appointment
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.05] mb-6">
                  A conversation, not a commitment.
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-xl">
                  Your first consultation gives you the clarity to make an
                  informed decision. No pressure, no surgical fees on the day,
                  no obligation to proceed.
                </p>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Clinical consultation with Dr. Nick",
                      body: "A private one-on-one to discuss your situation, options, and goals.",
                    },
                    {
                      title: "On-site 3D CBCT imaging",
                      body: "Detailed mapping of your jaw health and bone volume — done in-house.",
                    },
                    {
                      title: "Tailored treatment plan",
                      body: "A clear, written roadmap with fixed pricing, designed around your case.",
                    },
                  ].map((step) => (
                    <li key={step.title} className="flex items-start gap-4">
                      <span className="mt-1 w-6 h-6 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </span>
                      <div>
                        <p className="text-base lg:text-lg font-semibold text-foreground leading-snug">
                          {step.title}
                        </p>
                        <p className="text-sm lg:text-base text-muted-foreground font-light leading-relaxed mt-1">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
                <a
                  {...BOOKING_LINK_PROPS}
                  className="group block p-8 rounded-3xl bg-[#1a1a1a] text-white hover:bg-primary transition-all duration-500"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3 font-semibold">
                    Step 1
                  </p>
                  <p className="text-2xl lg:text-3xl font-heading font-bold leading-tight mb-2">
                    Book online with Dr. Nick
                  </p>
                  <p className="text-sm text-white/60 font-light">
                    Opens our patient booking portal.
                  </p>
                </a>
                <a
                  href={`tel:${practice.phoneIntl}`}
                  className="group block p-8 rounded-3xl bg-background border border-foreground/[0.06] hover:border-primary/30 transition-all duration-500"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 font-semibold">
                    Or call directly
                  </p>
                  <p className="text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight mb-2">
                    {practice.phone}
                  </p>
                  <p className="text-sm text-muted-foreground font-light">
                    Mon–Fri 9–6 · Sat 9–4
                  </p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anxiety / sedation reassurance */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
              For anxious patients
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.05] mb-6">
              A calm, judgment-free room.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              Losing teeth is personal. Whether you're managing failing bridges,
              loose dentures, or long-standing dental anxiety, you'll be met
              with patience and care. IV sedation and sleep-dentistry pathways
              are available so your treatment can be calm and dignified.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Risks */}
      <RisksSection
        content="All-on-4 is a major surgical procedure. Risks include bleeding, infection, swelling, transient nerve sensitivity, sinus involvement in the upper jaw, and — uncommonly — failure of one or more implants to integrate, which may require replacement. Long-term success depends on oral hygiene, general health, smoking status, and regular maintenance visits. Suitability for full-arch implant restoration is determined on a case-by-case basis after a clinical assessment and 3D imaging."
      />

      <ServiceFAQ title="Common questions about All-on-4." faqs={faqs} />

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
              Begin your story today.
            </h2>
            <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Take the first step. We'll listen, scan, plan, and tell you
              honestly what's possible.
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
              {practice.phone} · Nobel Biocare-trained team
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
