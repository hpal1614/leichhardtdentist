import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { BOOKING_LINK_PROPS } from "../../lib/booking";
import { usePractice } from "../../lib/usePractice";

type Props = {
  headline?: string;
  subhead?: string;
};

export function ServiceCTA({
  headline = "Ready to take the next step?",
  subhead = "Every treatment at our practice starts with a consultation. We'll explain your options before any plan is made.",
}: Props) {
  const practice = usePractice();
  // Build a compact hours summary from the structured data
  const hoursSummary = practice.hours
    .filter((h) => !/closed/i.test(h.time))
    .map((h) => `${h.days} ${h.time}`)
    .join(" · ");

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] text-white px-6 py-12 sm:p-10 lg:p-16 xl:p-20"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-[1.05] mb-6">
                {headline}
              </h2>
              <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-xl mb-10">
                {subhead}
              </p>

              <a
                {...BOOKING_LINK_PROPS}
                className="group bg-primary hover:bg-primary/90 text-white px-5 py-3.5 sm:px-7 sm:py-4 lg:px-9 lg:py-5 rounded-full text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] lg:tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center whitespace-nowrap"
              >
                Book an appointment online
                <ArrowRight className="ml-2 sm:ml-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Alternative action: call the practice. Gives anxious patients a
                second pathway and reinforces the contact info. */}
            <div className="lg:col-span-4">
              <a
                href={`tel:${practice.phoneIntl}`}
                className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500"
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1 font-medium">
                    Or call us
                  </p>
                  <p className="text-white text-base lg:text-lg font-heading font-semibold leading-tight mb-1 tabular-nums">
                    {practice.phone}
                  </p>
                  <p className="text-[11px] text-white/60 leading-snug">
                    {hoursSummary}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
