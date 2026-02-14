import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "I finally feel calm at the dentist. That's something I never thought I'd say.",
    author: "Sarah M.",
  },
  {
    text: "Gentle, warm, and genuinely caring. I actually look forward to my visits now.",
    author: "Michael T.",
  },
  {
    text: "They made me feel safe from the very first moment. Truly a different experience.",
    author: "Emma L.",
  },
];

export function ProofSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Star rating strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-14"
        >
          <div className="flex items-center gap-1.5 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <p
            className="text-2xl md:text-3xl text-foreground/90"
            style={{ fontFamily: "'Crimson Pro', serif", fontWeight: "400" }}
          >
            5.0 from 200+ Google Reviews
          </p>
        </motion.div>

        {/* Testimonial quotes */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-center"
            >
              <p
                className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-4 italic"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                "{t.text}"
              </p>
              <cite className="text-sm text-primary not-italic tracking-wide uppercase">
                {t.author}
              </cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
