import { motion } from "motion/react";

type Step = {
  title: string;
  description: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  steps: Step[];
};

export function ProcessSteps({ eyebrow = "The process", title, steps }: Props) {
  return (
    <section className="py-20 lg:py-28 bg-[#1a1a1a] text-white">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14 lg:mb-20"
        >
          <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
            {eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.02]">
            {title}
          </h2>
        </motion.div>

        <ol className="relative border-l border-white/15 ml-2 lg:ml-4 space-y-10 lg:space-y-14">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="pl-8 lg:pl-12 relative"
            >
              <span
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-[#1a1a1a]"
                aria-hidden="true"
              />
              <div className="flex flex-col lg:flex-row lg:items-baseline gap-3 lg:gap-10">
                <span className="text-primary font-mono text-sm tracking-widest uppercase shrink-0 lg:w-16">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 max-w-3xl">
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base lg:text-lg text-white/70 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
