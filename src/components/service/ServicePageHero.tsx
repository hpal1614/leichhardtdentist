import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type Props = {
  pillarNumber: string;
  title: string;
  tagline: string;
  intro: string;
  image: string;
};

export function ServicePageHero({ pillarNumber, title, tagline, intro, image }: Props) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10 lg:mb-14"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">{title}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
              Pillar {pillarNumber} of 04
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-foreground leading-[0.95] tracking-tight mb-8">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-primary font-light italic mb-6">
              {tagline}
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {intro}
            </p>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
