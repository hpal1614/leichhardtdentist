import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const smiles = [
  {
    src: "https://images.unsplash.com/photo-1723437746581-6aa3e6027470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzbWlsZSUyMHRlZXRoJTIwbmF0dXJhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDUyODUxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Beautiful natural smile",
    span: "md:col-span-2 md:row-span-2",
    height: "h-[320px] md:h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1760124146290-a896872ae49a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHdvbWFuJTIwc21pbGluZyUyMG5hdHVyYWwlMjBsaWdodCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDUyODUxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Happy radiant smile",
    span: "",
    height: "h-[280px]",
  },
  {
    src: "https://images.unsplash.com/photo-1762708550156-115244f4042f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjb25maWRlbnQlMjBzbWlsZSUyMHBvcnRyYWl0JTIwbmF0dXJhbHxlbnwxfHx8fDE3NzA1Mjg1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Confident smile",
    span: "",
    height: "h-[280px]",
  },
  {
    src: "https://images.unsplash.com/photo-1464892216009-6d356060e72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcmFkaWFudCUyMHNtaWxlJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzA1Mjg1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Radiant smile",
    span: "",
    height: "h-[280px]",
  },
  {
    src: "https://images.unsplash.com/photo-1759021997535-d2854522c1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwbGF1Z2hpbmclMjBqb3lmdWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA1Mjg1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Joyful laugh",
    span: "",
    height: "h-[280px]",
  },
  {
    src: "https://images.unsplash.com/photo-1760035027774-1b3f8e183a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzbWlsaW5nJTIwaGFwcHklMjBsaWZlc3R5bGUlMjBvdXRkb29yfGVufDF8fHx8MTc3MDUyODUxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Happy couple smiling",
    span: "",
    height: "h-[280px]",
  },
];

export function SmileGallery() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-6"
            style={{ fontFamily: "'Crimson Pro', serif", fontWeight: "300" }}
          >
            Real smiles. Real confidence.
          </h2>
          <p className="text-foreground/50 text-lg lg:text-xl xl:text-2xl">
            The results speak for themselves.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[280px]">
          {smiles.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-2xl overflow-hidden group ${img.span}`}
            >
              <ImageWithFallback
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
