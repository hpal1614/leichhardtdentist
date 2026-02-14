import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function PhilosophySection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsJTIwaW50ZXJpb3IlMjB3YXJtJTIwdG9uZXMlMjBib3V0aXF1ZXxlbnwxfHx8fDE3NzA1Mjg1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Calm, modern interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/65" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-8 lg:mb-10 leading-tight"
          style={{ fontFamily: "'Crimson Pro', serif", fontWeight: "300" }}
        >
          Gentle. Caring.
          <br />
          <span className="italic text-primary">Precision Dentistry.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl lg:max-w-3xl mx-auto space-y-4 text-center"
        >
          <p>For many people, visiting the dentist isn't easy. That's why Dr. Nick and our team take a different approach.</p>
          <p>We take time. We listen. We explain every step.</p>
          <p>We care for patients of all ages — from children's first visits to complex restorative cases.</p>
          <p className="text-white/60">Our philosophy is simple: preserve what's healthy, restore what's necessary, and avoid what's excessive.</p>
          <p>Whether it's a routine checkup or complex restoration, you'll receive care that is both highly skilled and genuinely compassionate.</p>
          <p className="italic text-primary/80">Modern dentistry — without the clinical coldness.</p>
        </motion.div>
      </div>
    </section>
  );
}
