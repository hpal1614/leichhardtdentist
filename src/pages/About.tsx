import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import { Seo } from "../components/Seo";
import { PageHero } from "../components/layout/PageHero";
import { ServiceCTA } from "../components/service/ServiceCTA";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ClinicianPortrait } from "../components/clinician/ClinicianPortrait";
import { MapPin, GraduationCap, Globe, Users } from "lucide-react";

import { useSanityDoc } from "../lib/useSanityDoc";
import { CLINICIANS_QUERY } from "../lib/queries";
import { mergeClinicians, type ClinicianSanity } from "../lib/clinician";
import { ALL_CLINICIANS, NICK } from "../lib/clinician-fallbacks";

import clinic1 from "../assets/clinic-1.jpg";

const trainingStops = [
  { location: "University of Sydney", detail: "BDS, Graduate Diploma (Clinical Dentistry — Oral Implants)" },
  { location: "Misch Implant Institute, Florida", detail: "Advanced implant training" },
  { location: "Walpole Institute, London", detail: "Advanced implant training" },
  { location: "Vancouver, Canada", detail: "Fellowship, International Congress of Oral Implantologists" },
];

const career = [
  "India",
  "Russia",
  "Dubai",
  "Western Australia",
  "Sydney (since returning home)",
];


const values = [
  {
    icon: Users,
    title: "Non-judgemental.",
    body:
      "Whatever state your teeth are in, however long it's been, you'll be met with the same attention and respect — not a lecture.",
  },
  {
    icon: GraduationCap,
    title: "Evidence-based.",
    body:
      "We practise dentistry backed by the current clinical evidence, not marketing trends. If a treatment isn't right for you, we'll tell you.",
  },
  {
    icon: MapPin,
    title: "Local.",
    body:
      "Nick grew up in the Inner West and came home to build this practice. You're being treated by someone invested in the community.",
  },
  {
    icon: Globe,
    title: "International perspective.",
    body:
      "Training and work in Australia, the US, the UK, India, Russia, Dubai — a broader view of what's possible brought back to Leichhardt.",
  },
];

export function About() {
  const remoteClinicians = useSanityDoc<ClinicianSanity[]>(CLINICIANS_QUERY);
  const team = mergeClinicians(remoteClinicians, ALL_CLINICIANS);
  const principal = team.find((c) => c.isPrincipal) ?? NICK;

  return (
    <>
      <Seo
        title="About Dr. Nick Kulkarni — Leichhardt Dental Centre"
        description="Dr. Nick Kulkarni has been practising dentistry for 20+ years, with training at the University of Sydney, Misch Institute (Florida), and Walpole Institute (London). Fellow, International Congress of Oral Implantologists."
        path="/about"
      />
      <PageHero
        eyebrow="About"
        title="A calm practice, led by Dr. Nick."
        intro="Leichhardt Dental Centre is a general and implant practice in Sydney's Inner West, built around one principle: do the work properly, explain it clearly, and take the time it takes."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* Nick — editorial portrait section */}
      <section id="dr-nick" className="py-20 lg:py-28 bg-background scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="lg:col-span-5 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl lg:sticky lg:top-28"
            >
              <ClinicianPortrait src={principal.portrait} name={principal.name} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-5 block">
                The Principal
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-8">
                {principal.name}.
              </h2>

              <div className="space-y-5 text-base lg:text-lg text-muted-foreground leading-relaxed font-light mb-10">
                {principal.bio ? (
                  <PortableText value={principal.bio as never} />
                ) : (
                  principal.bioFallback.map((p, i) => <p key={i}>{p}</p>)
                )}
              </div>

              {principal.quote && (
                <blockquote className="border-l-4 border-primary pl-6 py-2 mb-10">
                  <p className="text-xl lg:text-2xl font-heading italic text-foreground leading-snug mb-3">
                    "{principal.quote}"
                  </p>
                  <cite className="text-sm text-muted-foreground not-italic">
                    — {principal.name}
                  </cite>
                </blockquote>
              )}

              <div className="grid sm:grid-cols-2 gap-8 border-t border-foreground/10 pt-10">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4">
                    Training
                  </h3>
                  <ul className="space-y-3">
                    {trainingStops.map((t) => (
                      <li key={t.location} className="text-sm lg:text-base">
                        <span className="block font-semibold text-foreground">
                          {t.location}
                        </span>
                        <span className="block text-muted-foreground font-light">
                          {t.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4">
                    Practised in
                  </h3>
                  <ul className="space-y-2">
                    {career.map((c) => (
                      <li
                        key={c}
                        className="text-sm lg:text-base text-foreground font-light"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-primary font-bold mt-8 mb-4">
                    Off the chair
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground font-light leading-relaxed">
                    Dad to two daughters. Regular at the gym. Will talk history
                    with anyone who asks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              What to expect
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02]">
              Four things you'll find here.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="p-8 lg:p-10 rounded-3xl bg-background border border-foreground/[0.04]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3 leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed font-light">
                    {v.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 lg:py-28 bg-background scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-12 gap-10 mb-14 lg:mb-20"
          >
            <div className="lg:col-span-7">
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
                The team
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
                Led by Dr. Nick.<br />Supported by experienced dentists.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-4">
              <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
                You'll usually see Dr. Nick. For specific treatments — prosthetic
                rehabilitation, endodontics, emergencies — you may be seen by a
                colleague with particular expertise in that area. Every decision is
                still discussed with you first.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member._id ?? member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 lg:p-10 rounded-3xl bg-secondary/40 border border-foreground/[0.04]"
              >
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2 leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-semibold tracking-wide uppercase mb-5">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-5 font-mono">
                  {member.qualifications}
                </p>
                <p className="text-base text-foreground/80 leading-relaxed font-light">
                  {member.focus}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice photo strip */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1 }}
            className="aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src={clinic1}
              alt="The practice"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <ServiceCTA
        headline="Come and meet us."
        subhead="The first appointment is a conversation — no treatment commitments, no pressure."
      />
    </>
  );
}
