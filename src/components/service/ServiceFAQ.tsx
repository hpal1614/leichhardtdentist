import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type FAQ = {
  q: string;
  a: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  faqs: FAQ[];
};

export function ServiceFAQ({ eyebrow = "Questions", title, faqs }: Props) {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 lg:mb-16"
        >
          <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
            {eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02]">
            {title}
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-foreground/10 last:border-0"
            >
              <AccordionTrigger className="text-left text-lg lg:text-xl font-heading font-semibold text-foreground hover:text-primary py-6 lg:py-8 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base lg:text-lg text-muted-foreground leading-relaxed pb-6 lg:pb-8 font-light">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
