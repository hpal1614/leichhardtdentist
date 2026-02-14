import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const points = [
  "You set the pace. Raise your hand and we pause.",
  "Everything explained in plain language, no jargon.",
  "Longer appointments so you're never rushed.",
  "Calming environment designed to ease tension.",
];

export function AnxietySection() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760084443004-e1bbf7fa0a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZWxheGVkJTIwY2FsbSUyMHBlYWNlZnVsJTIwZmFjZXxlbnwxfHx8fDE3NzA1Mjg1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Relaxed, calm experience"
                className="w-full h-[480px] lg:h-[560px] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2
              className="text-4xl md:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "'Crimson Pro', serif", fontWeight: "300" }}
            >
              We understand
              <br />
              dental fear
            </h2>

            <p className="text-lg text-foreground/60 mb-10 max-w-md leading-relaxed">
              You're not alone, and you're not judged here. We've built
              everything around making you feel safe.
            </p>

            <ul className="space-y-5">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-foreground/70 text-lg leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
