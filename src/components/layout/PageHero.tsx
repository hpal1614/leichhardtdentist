import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, intro, crumbs }: Props) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-20 bg-secondary/30 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10 lg:mb-14"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.to ? (
                  <Link to={c.to} className="hover:text-primary transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
            {eyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-foreground leading-[0.95] tracking-tight mb-8">
            {title}
          </h1>
          {intro && (
            <p className="text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light">
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
