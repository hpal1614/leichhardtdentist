import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { urlFor } from "../lib/sanity";
import { BOOKING_LINK_PROPS } from "../lib/booking";

import drNickImg from "../assets/dr-nick.jpg";

const DEFAULT_HERO_VIDEO =
  "https://res.cloudinary.com/dzydzte9h/video/upload/v1777464916/dental-website/transformation-story-2.mov";

const DEFAULTS = {
  eyebrow: "Leichhardt Dental Centre · Inner West Sydney",
  headline: "Dentistry,\nled by Dr. Nick.",
  subhead:
    "Twenty years of practice. A calm room. Evidence-based care — delivered one patient at a time.",
  primaryCtaLabel: "Book with Dr. Nick",
  secondaryCtaLabel: "Meet Dr. Nick",
  secondaryCtaAnchor: "#dr-nick",
  trustCardName: "Dr. Nick Kulkarni",
  trustCardRole: "Principal Dentist",
  trustCardCredentials: "BDS · GradDipClinDent · PGDip Implant Dentistry",
};

export type HomeHeroData = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  videoUrl?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaAnchor?: string;
  trustCardName?: string;
  trustCardRole?: string;
  trustCardCredentials?: string;
  trustCardImage?: unknown;
};

type HeroProps = {
  data?: HomeHeroData | null;
};

export function Hero({ data }: HeroProps = {}) {
  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const headline = data?.headline || DEFAULTS.headline;
  const subhead = data?.subhead || DEFAULTS.subhead;
  const videoUrl = data?.videoUrl || DEFAULT_HERO_VIDEO;
  const primaryCta = data?.primaryCtaLabel || DEFAULTS.primaryCtaLabel;
  const secondaryCta = data?.secondaryCtaLabel || DEFAULTS.secondaryCtaLabel;
  const secondaryAnchor =
    data?.secondaryCtaAnchor || DEFAULTS.secondaryCtaAnchor;
  const trustName = data?.trustCardName || DEFAULTS.trustCardName;
  const trustRole = data?.trustCardRole || DEFAULTS.trustCardRole;
  const trustCreds =
    data?.trustCardCredentials || DEFAULTS.trustCardCredentials;
  const trustImg = data?.trustCardImage
    ? urlFor(data.trustCardImage as any) || drNickImg
    : drNickImg;

  return (
    <section className="relative h-[100svh] min-h-[620px] md:min-h-[720px] w-full overflow-hidden bg-[#111] text-white">
      {/* Ambient video background */}
      <div className="absolute inset-0 z-0">
        <video
          src={videoUrl}
          className="w-full h-full object-cover opacity-75"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* Left-weighted gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
        {/* Subtle bottom fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-col justify-between pt-28 lg:pt-36 pb-10 lg:pb-14">
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6 lg:mb-8"
          >
            <span className="w-10 h-[1px] bg-primary" />
            <span className="text-white/80 uppercase tracking-[0.25em] text-xs font-medium">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-white leading-[0.95] tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 lg:mb-10 whitespace-pre-line"
          >
            {headline}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/75 max-w-xl font-light leading-relaxed mb-10 lg:mb-14"
          >
            {subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto"
          >
            <a
              {...BOOKING_LINK_PROPS}
              className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 lg:px-9 lg:py-5 rounded-full text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] flex items-center justify-center"
            >
              {primaryCta}
              <ArrowRight className="ml-2.5 w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={secondaryAnchor}
              className="px-7 py-4 lg:px-9 lg:py-5 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center"
            >
              {secondaryCta}
              <ArrowUpRight className="ml-2.5 w-4 h-4 lg:w-5 lg:h-5" />
            </a>
          </motion.div>
        </div>

        {/* Bottom row: trust card + scroll cue */}
        <div className="flex items-end justify-between gap-6">
          {/* Trust card — Nick portrait + credentials */}
          <motion.a
            href="#dr-nick"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-4 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-3 pr-6 max-w-sm hover:bg-white/12 hover:border-white/25 transition-all duration-500"
          >
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/20">
              <ImageWithFallback
                src={trustImg}
                alt={trustName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1 font-medium">
                {trustRole}
              </p>
              <p className="text-white text-base lg:text-lg font-heading font-semibold leading-tight mb-1">
                {trustName}
              </p>
              <p className="text-[11px] lg:text-xs text-white/60 leading-snug">
                {trustCreds}
              </p>
            </div>
          </motion.a>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="hidden md:flex flex-col items-end gap-3 text-white/60"
          >
            <span className="uppercase tracking-[0.3em] text-[10px] font-medium">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="block w-[1px] h-10 bg-gradient-to-b from-white/60 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
