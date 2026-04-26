import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Home } from "lucide-react";
import { Seo } from "../components/Seo";
import { BOOKING_LINK_PROPS } from "../lib/booking";

const helpfulLinks = [
  { label: "General Dentistry", to: "/services/general-dentistry" },
  { label: "Dental Implants", to: "/services/dental-implants" },
  { label: "Single Visit Crowns", to: "/services/single-visit-crowns" },
  { label: "Same Day Smile", to: "/services/same-day-smile" },
  { label: "About Dr. Nick", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function NotFound() {
  return (
    <>
      <Seo
        title="Page not found — Leichhardt Dental Centre"
        description="The page you're looking for doesn't exist. Try one of the links below or head back to the homepage."
        path="/404"
        noIndex
      />

      <section className="min-h-[80vh] flex items-center py-32 lg:py-40 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                404 · Page not found
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-foreground leading-[0.95] tracking-tight mb-8">
                Couldn't find that one.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 font-light">
                The page you were looking for has moved, been renamed, or never
                existed. That's on us — let's get you to the right place.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Link
                  to="/"
                  className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center justify-center"
                >
                  <Home className="mr-2.5 w-4 h-4" />
                  Back to home
                </Link>
                <a
                  {...BOOKING_LINK_PROPS}
                  className="px-7 py-4 rounded-full border border-foreground/20 text-foreground hover:bg-foreground/5 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 inline-flex items-center justify-center"
                >
                  Book with Dr. Nick
                  <ArrowRight className="ml-2.5 w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="p-8 lg:p-10 rounded-3xl bg-background border border-foreground/[0.04]">
                <h2 className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-6">
                  Or try one of these
                </h2>
                <ul className="divide-y divide-foreground/[0.06]">
                  {helpfulLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="flex items-center justify-between py-4 text-foreground hover:text-primary transition-colors group"
                      >
                        <span className="font-heading text-base lg:text-lg">
                          {l.label}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
