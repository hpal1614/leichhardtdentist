import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

import { ClinicianPortrait } from "./clinician/ClinicianPortrait";
import { useSanityDoc } from "../lib/useSanityDoc";
import { CLINICIANS_QUERY } from "../lib/queries";
import { mergeClinicians, type ClinicianSanity } from "../lib/clinician";
import { ALL_CLINICIANS } from "../lib/clinician-fallbacks";

export function TeamGrid() {
  const remote = useSanityDoc<ClinicianSanity[]>(CLINICIANS_QUERY);
  const associates = mergeClinicians(remote, ALL_CLINICIANS).filter(
    (c) => !c.isPrincipal
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [associates.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  if (associates.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-secondary/5 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 lg:mb-12">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">
              The Team
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
              Meet the associates.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl font-light">
              Dr. Nick is supported by a team of experienced clinicians who share
              his patient-first philosophy.
            </p>
          </div>

          {associates.length > 2 && (
            <div className="flex gap-3 mt-6 md:mt-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="rounded-full w-10 h-10 lg:w-12 lg:h-12 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="rounded-full w-10 h-10 lg:w-12 lg:h-12 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:-mx-12 lg:px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {associates.map((member, index) => (
            <motion.div
              key={member._id ?? member.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-start"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 relative bg-secondary/40 shadow-sm">
                <ClinicianPortrait
                  src={member.portrait}
                  name={member.name}
                  className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-8">
                  <p className="text-white/80 text-xs uppercase tracking-widest mb-2">
                    Focus
                  </p>
                  <p className="text-white text-sm leading-relaxed font-light">
                    {member.focus}
                  </p>
                </div>
              </div>

              <div className="px-2">
                <h3 className="text-lg lg:text-xl font-heading font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground uppercase tracking-widest font-light">
                  {member.role}
                </p>
                {member.qualifications && (
                  <p className="text-xs text-muted-foreground/70 mt-1.5 font-mono">
                    {member.qualifications}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
