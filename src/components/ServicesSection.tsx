import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import { useSanityDoc } from "../lib/useSanityDoc";
import { SERVICE_PILLARS_QUERY } from "../lib/queries";
import { mergePillarList, type PillarSanity } from "../lib/pillar";
import { ALL_PILLARS } from "../lib/pillar-fallbacks";

export function ServicesSection() {
  const remote = useSanityDoc<PillarSanity[]>(SERVICE_PILLARS_QUERY);
  const pillars = mergePillarList(remote, ALL_PILLARS);

  return (
    <section
      id="services"
      className="relative py-20 lg:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
              Comprehensive Care
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-[1.02] mb-6">
              Four ways we<br />care for your smile.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              Every treatment we offer falls under one of four pillars — each one
              practised personally by Dr. Nick, and backed by evidence-based dentistry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="w-10 h-[1px] bg-muted-foreground/40" />
              <span className="uppercase tracking-[0.2em] text-xs">
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid — 1 col mobile, 2 col tablet, 12 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto] gap-5 lg:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${pillar.bentoSpan} ${pillar.bentoAspect} rounded-[2rem] overflow-hidden bg-foreground/5 isolate`}
            >
              {/* Background image */}
              <ImageWithFallback
                src={pillar.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-[#1a1a1a]/30 transition-opacity duration-700 group-hover:opacity-90" />

              {/* Card-level link — covers the whole card via ::after pseudo-element.
                  Children with pointer-events-auto (the chips) stay independently clickable. */}
              <Link
                to={`/services/${pillar.slug}`}
                aria-label={`${pillar.title} — ${pillar.tagline}`}
                className="absolute inset-0 z-[1] rounded-[2rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              />

              {/* Number — decorative, let clicks pass through to the card link */}
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pointer-events-none">
                <span className="text-white/60 font-mono text-sm tracking-wider">
                  {pillar.number}
                </span>
              </div>

              {/* Arrow — decorative */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10 pointer-events-none w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>

              {/* Bottom content — text is decorative, chips are real links */}
              <div className="absolute inset-x-6 bottom-6 lg:inset-x-8 lg:bottom-8 z-10 flex flex-col pointer-events-none">
                <p className="text-white/70 text-[11px] lg:text-xs uppercase tracking-[0.25em] mb-3 font-medium">
                  {pillar.tagline}
                </p>
                <h3 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[0.95] mb-4 lg:mb-5">
                  {pillar.title.replace(/\.$/, "")}
                </h3>

                <p className="text-white/75 text-sm lg:text-base font-light leading-relaxed max-w-md mb-5 lg:mb-6">
                  {pillar.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 max-w-2xl pointer-events-auto">
                  {pillar.subTreatments.map((t) => (
                    <Link
                      key={t.id}
                      to={`/services/${pillar.slug}/${t.slug}`}
                      className="relative z-[2] inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs text-white/90 font-medium tracking-wide transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 lg:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-foreground/10"
        >
          <p className="text-sm lg:text-base text-muted-foreground font-light max-w-xl leading-relaxed">
            Not sure where to start? Every visit begins with a careful conversation —
            we'll explain your options before any treatment is planned.
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground font-semibold border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary transition-colors duration-300"
          >
            Book a consultation
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
