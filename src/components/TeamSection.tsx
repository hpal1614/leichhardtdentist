import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import drNickImg from "../assets/dr-nick.jpg";

export function TeamSection() {
  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
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
            <ImageWithFallback
              src={drNickImg}
              alt="Dr Nick Editorial Portrait"
              className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Dark gradient for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

            {/* Overlay Text */}
            <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12 right-8 lg:right-12">
              <p className="text-white/80 text-xs lg:text-sm uppercase tracking-[0.3em] mb-3">The Clinician</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                Dr. Nick.
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
                Meet Dr. Nick.
              </h2>
              <p className="text-lg lg:text-xl text-primary font-medium mb-4">
                A caring dentist who happens to be highly skilled.
              </p>
              <div className="space-y-3 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                <p>
                  Dr. Nick Kulkarni (BDS, GradDipClinDent, PGDip Implant Dentistry) has been practising for over 20 years, with a gentle approach that puts nervous patients at ease.
                </p>
                <p>
                  After completing advanced training in Prosthodontics, General Practice, and Implant Dentistry, Nick returned home to Leichhardt to build a practice centred around calm, patient-focused care.
                </p>
                <p className="text-muted-foreground/70">
                  Originally from the area, he takes pride in serving the Inner West community — treating patients of all ages with the same attention and respect.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 lg:pl-6 py-2 mb-6">
                <p className="text-base lg:text-lg text-foreground italic font-light leading-relaxed">
                  "I believe in offering evidence-based treatment in the most relaxed and gentle manner possible. It's about what's best for the patient — always."
                </p>
                <cite className="text-sm text-muted-foreground mt-2 block not-italic">— Dr. Nick Kulkarni</cite>
              </blockquote>

              <div className="flex flex-col sm:flex-row gap-6">
                <div>
                  <span className="block text-2xl lg:text-3xl font-heading font-bold text-foreground">20+</span>
                  <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">Years Experience</span>
                </div>
                <div>
                  <span className="block text-2xl lg:text-3xl font-heading font-bold text-foreground">117</span>
                  <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">5-Star Reviews</span>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="outline" className="rounded-full px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-base border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 font-semibold uppercase tracking-widest">
                  Book with Dr. Nick <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
