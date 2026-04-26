import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { BOOKING_LINK_PROPS } from "../lib/booking";
import { usePractice } from "../lib/usePractice";

export function BookingSection() {
  const practice = usePractice();
  return (
    <section id="book" className="relative py-20 lg:py-32 bg-[#1a1a1a] overflow-hidden scroll-mt-24">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Book Now
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 tracking-tight">
            We'd love to <br /> <span className="text-white/40 italic font-serif">meet you.</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Taking the first step is easy. Book a consultation online, or call the clinic directly. We'll take it from there.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
            <a
              {...BOOKING_LINK_PROPS}
              className="inline-flex items-center justify-center bg-primary text-white hover:bg-primary/90 text-sm lg:text-base px-6 py-3 lg:px-8 lg:py-4 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold uppercase tracking-widest"
            >
              Book Online Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href={`tel:${practice.phoneIntl}`}
              className="inline-flex items-center justify-center border border-white/30 bg-transparent text-white hover:bg-white/10 text-sm lg:text-base px-6 py-3 lg:px-8 lg:py-4 rounded-full transition-all duration-300 font-semibold uppercase tracking-widest"
            >
              <Phone className="mr-2 w-4 h-4" /> {practice.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
