import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BOOKING_LINK_PROPS } from "../../lib/booking";
import drNickImg from "../../assets/dr-nick.jpg";

type Props = {
  headline?: string;
  subhead?: string;
};

export function ServiceCTA({
  headline = "Ready to take the next step?",
  subhead = "Every treatment at our practice starts with a consultation. We'll explain your options before any plan is made.",
}: Props) {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] text-white p-10 lg:p-16 xl:p-20"
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
                className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 lg:px-9 lg:py-5 rounded-full text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center"
              >
                Book with Dr. Nick
                <ArrowRight className="ml-2.5 w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 pr-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/15">
                  <ImageWithFallback
                    src={drNickImg}
                    alt="Dr. Nick Kulkarni"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1 font-medium">
                    Principal Dentist
                  </p>
                  <p className="text-white text-base font-heading font-semibold leading-tight mb-1">
                    Dr. Nick Kulkarni
                  </p>
                  <p className="text-[11px] text-white/60 leading-snug">
                    20+ years · Inner West
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
