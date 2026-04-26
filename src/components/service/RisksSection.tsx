import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

type Props = {
  content: string;
};

export function RisksSection({ content }: Props) {
  return (
    <section className="py-16 lg:py-20 bg-secondary/40 border-y border-foreground/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-start"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3">
              Risks & considerations
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
              {content}
            </p>
            <p className="text-sm text-muted-foreground/70 leading-relaxed mt-4 italic">
              All dental procedures carry potential risks and benefits. Individual
              results vary. A consultation with a registered dental practitioner is
              required to determine whether a treatment is suitable for you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
