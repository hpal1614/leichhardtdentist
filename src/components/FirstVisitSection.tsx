import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "We listen",
    description:
      "A relaxed conversation about your concerns and goals. No pressure, no judgement.",
  },
  {
    number: "02",
    title: "We look",
    description:
      "A gentle assessment where we explain everything we see, in plain language.",
  },
  {
    number: "03",
    title: "We plan together",
    description:
      "A personalised plan that fits your comfort level and timeline. You decide what's next.",
  },
];

export function FirstVisitSection() {
  return (
    <section
      id="first-visit"
      className="py-24 md:py-32 bg-muted/20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "'Crimson Pro', serif", fontWeight: "300" }}
          >
            No surprises
          </h2>
          <p className="text-foreground/50 text-lg">
            Your first visit in three simple steps.
          </p>
        </motion.div>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-center"
            >
              {/* Number */}
              <div className="mb-6">
                <span
                  className="text-5xl md:text-6xl text-primary/20"
                  style={{
                    fontFamily: "'Crimson Pro', serif",
                    fontWeight: "300",
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-2xl mb-3"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {step.title}
              </h3>

              <p className="text-foreground/60 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-foreground/40 mt-16 text-sm tracking-wide"
        >
          No drilling. No needles. Just a conversation on your first visit.
        </motion.p>
      </div>
    </section>
  );
}
