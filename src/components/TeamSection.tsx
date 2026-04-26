import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import { ArrowUpRight } from "lucide-react";

import { ClinicianPortrait } from "./clinician/ClinicianPortrait";
import { BOOKING_LINK_PROPS } from "../lib/booking";
import { useSanityDoc } from "../lib/useSanityDoc";
import { CLINICIANS_QUERY } from "../lib/queries";
import { mergeClinicians, type ClinicianSanity } from "../lib/clinician";
import { ALL_CLINICIANS, NICK } from "../lib/clinician-fallbacks";

export function TeamSection() {
  const remote = useSanityDoc<ClinicianSanity[]>(CLINICIANS_QUERY);
  const clinicians = mergeClinicians(remote, ALL_CLINICIANS);
  const principal = clinicians.find((c) => c.isPrincipal) ?? NICK;

  // Show the principal's first name only as the giant editorial headline
  const firstName = principal.name.replace(/^Dr\.?\s+/i, "").split(/\s+/)[0] || principal.name;

  return (
    <section id="dr-nick" className="py-16 lg:py-24 bg-background relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Editorial Image - Full Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[80vh] lg:h-screen max-h-[1000px] rounded-3xl overflow-hidden group"
          >
            <ClinicianPortrait
              src={principal.portrait}
              name={principal.name}
              className="grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12 right-8 lg:right-12">
              <p className="text-white/80 text-xs lg:text-sm uppercase tracking-[0.3em] mb-3">The Clinician</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                Dr. {firstName}.
              </h2>
            </div>
          </motion.div>

          {/* Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:pr-20"
          >
            <div className="flex flex-col justify-center">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3">The Clinician</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                Meet {principal.name.replace(/^Dr\.?\s+/i, "Dr. ")}.
              </h2>
              {principal.role && (
                <p className="text-lg lg:text-xl text-primary font-medium mb-4">
                  {principal.role}.
                </p>
              )}
              <div className="space-y-3 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                {principal.bio ? (
                  <PortableText value={principal.bio as never} />
                ) : (
                  principal.bioFallback.map((p, i) => <p key={i}>{p}</p>)
                )}
              </div>

              {principal.quote && (
                <blockquote className="border-l-4 border-primary pl-4 lg:pl-6 py-2 mb-6">
                  <p className="text-base lg:text-lg text-foreground italic font-light leading-relaxed">
                    "{principal.quote}"
                  </p>
                  <cite className="text-sm text-muted-foreground mt-2 block not-italic">
                    — {principal.name}
                  </cite>
                </blockquote>
              )}

              <div className="flex flex-col sm:flex-row gap-8">
                <div>
                  <span className="block text-2xl lg:text-3xl font-heading font-bold text-foreground">20+</span>
                  <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">Years Practising</span>
                </div>
                <div>
                  <span className="block text-2xl lg:text-3xl font-heading font-bold text-foreground">BDS</span>
                  <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">{principal.qualifications.replace(/^BDS\s*[·•]\s*/, "")}</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  {...BOOKING_LINK_PROPS}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-base border border-foreground/20 bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-semibold uppercase tracking-widest"
                >
                  Book with Dr. {firstName} <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
