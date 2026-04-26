import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { SubTreatment } from "../../lib/pillar";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type Props = {
  eyebrow?: string;
  title: string;
  items: SubTreatment[];
  pillarSlug: string;
  /** Fallback image used when a sub-treatment doesn't have its own imageUrl. */
  fallbackImage?: string;
};

const MotionLink = motion.create(Link);

/** Pick the best static image for a card — sub's own imageUrl, then poster, then pillar image. */
function cardImage(item: SubTreatment, fallback?: string): string | undefined {
  return item.imageUrl || item.videoPoster || fallback;
}

export function SubTreatmentGrid({
  eyebrow = "What's included",
  title,
  items,
  pillarSlug,
  fallbackImage,
}: Props) {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.02]">
            {title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((item, i) => {
            const img = cardImage(item, fallbackImage);
            return (
              <MotionLink
                key={item.id}
                to={`/services/${pillarSlug}/${item.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl bg-secondary/40 border border-foreground/[0.04] overflow-hidden hover:border-primary/25 transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                aria-label={`Learn about ${item.name}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
                  {img ? (
                    <ImageWithFallback
                      src={img}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-secondary/40" />
                  )}

                  {/* Subtle bottom-fade so text below reads cleanly against light bgs */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-secondary/40 to-transparent pointer-events-none" />

                  {/* Number badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-black/5 px-3 py-1 text-[10px] font-mono tracking-[0.2em] text-foreground shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Arrow badge */}
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-foreground/70 group-hover:text-white transition-colors" />
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-3 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </MotionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
