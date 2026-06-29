import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { PricingTier } from "../../lib/pillar";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  tiers: PricingTier[];
  footnote?: string;
};

/**
 * Card-based pricing section. Visual language matches the All-on-4 page
 * pricing cards (rounded-[2rem] cards on bg-secondary/40, big heading-font
 * price, Check-listed inclusions) so every priced treatment looks consistent.
 */
export function PricingCards({ eyebrow = "Pricing", title, intro, tiers, footnote }: Props) {
  if (!tiers || tiers.length === 0) return null;

  // Two tiers read better side-by-side; three+ use a 3-up grid.
  const cols = tiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="py-20 lg:py-28 bg-background">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02] mb-6">
            {title}
          </h2>
          {intro && (
            <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
              {intro}
            </p>
          )}
        </motion.div>

        <div className={`grid gap-5 lg:gap-6 ${cols}`}>
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col p-8 lg:p-10 rounded-[2rem] bg-secondary/40 border border-foreground/[0.04]"
            >
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2 leading-tight">
                {t.name}
              </h3>
              {t.description && (
                <p className="text-base text-muted-foreground font-light mb-8">
                  {t.description}
                </p>
              )}

              <div className="mt-auto border-t border-foreground/10 pt-6">
                {t.priceLabel && (
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {t.priceLabel}
                  </p>
                )}
                <p className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                  {t.price}
                  {t.unit && (
                    <span className="text-base font-light text-muted-foreground"> {t.unit}</span>
                  )}
                </p>
              </div>

              {t.items && t.items.length > 0 && (
                <ul className="space-y-3 mt-6">
                  {t.items.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-base text-foreground/80 font-light"
                    >
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {footnote && (
          <p className="mt-10 text-xs text-muted-foreground italic max-w-3xl leading-relaxed">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
