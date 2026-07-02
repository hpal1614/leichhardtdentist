import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ClinicianPortrait } from "./clinician/ClinicianPortrait";
import { optimizeVideoUrl } from "../lib/cloudinary";
import { useAmbientVideo, prefersReducedMotion } from "../lib/useAmbientVideo";
import { BOOKING_LINK_PROPS } from "../lib/booking";
import { useSanityDoc } from "../lib/useSanityDoc";
import { CLINICIANS_QUERY } from "../lib/queries";
import { clinicianAnchor, mergeClinicians, type ClinicianSanity } from "../lib/clinician";
import { ALL_CLINICIANS } from "../lib/clinician-fallbacks";

const DEFAULT_HERO_VIDEO =
  "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/home/hero/hero-main.mp4";

// The hero clip is trimmed to a clean loop point — it restarts at this many
// seconds rather than playing the (longer) tail of the source video.
const HERO_LOOP_END_SECONDS = 37;

const DEFAULTS = {
  eyebrow: "Leichhardt Dental Centre · Inner West Sydney",
  headline: "Where cutting edge science\nmeets honest local care.",
  subhead:
    "Twenty-five years of practice. A calm room. Evidence-based care — delivered one patient at a time.",
  primaryCtaLabel: "Book an appointment online",
  secondaryCtaLabel: "Meet Our Team",
  secondaryCtaAnchor: "/about",
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
  const rawVideo = data?.videoUrl || DEFAULT_HERO_VIDEO;
  // eo_ trims server-side at the loop point: the browser downloads 37s of
  // video instead of the full-length master it never plays.
  const videoUrl = optimizeVideoUrl(rawVideo, {
    width: 1600,
    endOffset: HERO_LOOP_END_SECONDS,
  })!;
  // A still frame painted instantly under the video — avoids a black flash on
  // load and gives the hero a fast LCP element while the video buffers.
  const heroPoster = rawVideo.includes("/video/upload/")
    ? rawVideo
        .replace("/video/upload/", "/video/upload/so_2,w_1600,q_auto,f_auto/")
        .replace(/\.(mp4|mov|webm|m4v)$/i, ".jpg")
    : undefined;
  const primaryCta = data?.primaryCtaLabel || DEFAULTS.primaryCtaLabel;
  const secondaryCta = data?.secondaryCtaLabel || DEFAULTS.secondaryCtaLabel;
  const secondaryAnchor =
    data?.secondaryCtaAnchor || DEFAULTS.secondaryCtaAnchor;

  const remoteClinicians = useSanityDoc<ClinicianSanity[]>(CLINICIANS_QUERY);
  const clinicians = mergeClinicians(remoteClinicians, ALL_CLINICIANS);

  // Restart the background video at the trimmed loop point (37s) instead of
  // playing the longer source tail.
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  // Starts playback when visible, pauses when scrolled away, and leaves the
  // poster in place for visitors who prefer reduced motion.
  useAmbientVideo(heroVideoRef);

  // Pagination slider. Cards-per-view is 1 on phone and 2 on desktop, so the
  // dots track PAGES (groups of cardsPerView), not individual cards.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setCardsPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(clinicians.length / cardsPerView));

  // Reset to the first page when the breakpoint (and therefore page count) changes.
  useEffect(() => {
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [cardsPerView]);

  // Pause the auto-advance while the visitor is hovering or has keyboard
  // focus inside the row, so the cards never yank away mid-read (WCAG 2.2.2).
  const [paused, setPaused] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.clientWidth) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(page, 0), pageCount - 1));
  };

  // Auto-advance one page every 4 seconds while the row is scrollable.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (paused || prefersReducedMotion()) return;
    if (el.scrollWidth <= el.clientWidth + 4) return;
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % pageCount;
      goToPage(next);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex, pageCount, paused]);

  const goToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: el.clientWidth * page,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <section className="relative h-[100svh] min-h-[620px] md:min-h-[720px] w-full overflow-hidden bg-[#111] text-white">
      {/* Ambient video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={heroVideoRef}
          src={videoUrl}
          poster={heroPoster}
          className="w-full h-full object-cover opacity-90"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onTimeUpdate={() => {
            const v = heroVideoRef.current;
            if (v && v.currentTime >= HERO_LOOP_END_SECONDS) v.currentTime = 0;
          }}
        />
        {/* Left-weighted gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />
        {/* Subtle bottom fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-col justify-between pt-28 lg:pt-36 pb-10 lg:pb-14">
        <div className="flex-1 flex flex-col justify-end lg:justify-center max-w-3xl pb-6 lg:pb-0">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6 lg:mb-8"
          >
            <span className="w-10 h-[1px] bg-primary" />
            <span className="text-white/80 uppercase tracking-[0.25em] text-xs lg:text-sm font-medium">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-white leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 lg:mb-10 whitespace-pre-line"
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
            <Link
              to={secondaryAnchor}
              className="px-7 py-4 lg:px-9 lg:py-5 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm lg:text-base font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center"
            >
              {secondaryCta}
              <ArrowUpRight className="ml-2.5 w-4 h-4 lg:w-5 lg:h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom: 4 clinician cards — full-width swipe slider showing 1 card per
            view on phone and 2 per view on desktop. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="flex gap-2.5 lg:gap-3 overflow-x-auto snap-x snap-mandatory pb-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {clinicians.map((c) => (
              <Link
                key={c.name}
                to={`/about#${clinicianAnchor(c.name)}`}
                className="group flex items-center gap-3 bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 pr-4 flex-shrink-0 min-w-full sm:min-w-[260px] lg:min-w-[calc(50%-0.375rem)] snap-start hover:bg-white/[0.12] hover:border-white/25 transition-all duration-500"
              >
                <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                  <ClinicianPortrait src={c.portrait} name={c.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-0.5 font-medium leading-tight truncate">
                    {c.role}
                  </p>
                  <p className="text-white text-sm lg:text-base font-heading font-semibold leading-tight truncate">
                    {c.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination dots — one per page (1 card per page on phone, 2 on desktop) */}
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Go to team page ${i + 1} of ${pageCount}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-white w-5" : "bg-white/30 w-1.5"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
