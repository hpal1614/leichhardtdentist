import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useBooking } from "./booking/BookingContext";

export function BookingSection() {
  const { openModal } = useBooking();
  return (
    <section className="relative py-40 bg-[#1a1a1a] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] opacity-10" />

      <div className="relative z-10 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm xl:text-base 2xl:text-lg mb-6">
            Book Now
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-9xl font-heading font-bold text-white mb-8 tracking-tight">
            We'd love to <br /> <span className="text-white/40 italic font-serif">meet you.</span>
          </h2>
          <p className="text-xl xl:text-2xl 2xl:text-3xl text-white/60 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto mb-12 font-light leading-relaxed">
            Taking the first step is easy. Book a consultation online, or call the clinic directly. We'll take it from there.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-5">
            <Button onClick={openModal} className="bg-primary text-white hover:bg-primary/90 text-sm lg:text-base xl:text-lg 2xl:text-xl px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold uppercase tracking-widest">
              Book Online Now
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-sm lg:text-base xl:text-lg 2xl:text-xl px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 rounded-full transition-all duration-300 font-semibold uppercase tracking-widest">
              (02) 9560 1212 <ArrowRight className="ml-3 w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
            </Button>
          </div>

          <p className="mt-8 text-white/30 text-xs xl:text-sm 2xl:text-base uppercase tracking-widest">
            Availability for New Patients: <span className="text-primary">Open</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
