import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useBooking } from "./booking/BookingContext";

// Background Carousel Variants (Fade + Zoom)
const bgVariants = {
  enter: () => ({
    opacity: 0,
    scale: 1.1,
  }),
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2 }
  },
  exit: () => ({
    zIndex: 0,
    opacity: 0,
    transition: { duration: 1.2 }
  })
};

const heroSlides = [
  {
    id: 1,
    type: "video",
    src: "/videos/transformation-story-2.mov",
    alt: "Feel at ease",
    headline: "Feel at ease.",
    subhead: "You're in skilled hands. Expert dental care in Leichhardt's Inner West — delivered with precision, patience, and genuine care.",
    secondaryButton: "Meet Dr. Nick"
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1629904853023-5392d2948c8b?auto=format&fit=crop&q=80&w=1920",
    alt: "Preserving natural smiles",
    headline: "Preserving your natural smile.",
    subhead: "Conservative dentistry focused on long-term health. Modern techniques that protect teeth, not just treat them.",
    secondaryButton: "Our Approach"
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1920",
    alt: "Trusted care",
    headline: "Trusted by hundreds.",
    subhead: "Over 20 years of clinical experience serving Sydney's Inner West.",
    secondaryButton: "Read Reviews"
  }
];

export function Hero() {
  const { openModal } = useBooking();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const [videoProgress, setVideoProgress] = useState(0);

  // Auto-advance carousel for images
  useEffect(() => {
    if (heroSlides[currentSlide].type === 'image') {
      const timer = setTimeout(() => {
        nextSlide();
      }, 6000);
      return () => clearTimeout(timer);
    } else {
      // Reset video progress when entering video slide
      setVideoProgress(0);
    }
  }, [currentSlide]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* 1. FULL SCREEN BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {heroSlides[currentSlide].type === "video" ? (
              <video
                src={heroSlides[currentSlide].src}
                className="w-full h-full object-cover opacity-80"
                autoPlay
                muted
                playsInline
                onEnded={nextSlide}
                onTimeUpdate={(e) => {
                  const duration = e.currentTarget.duration;
                  const currentTime = e.currentTarget.currentTime;
                  if (duration > 0) {
                    setVideoProgress((currentTime / duration) * 100);
                  }
                }}
              />
            ) : (
              <ImageWithFallback
                src={heroSlides[currentSlide].src}
                alt={heroSlides[currentSlide].alt}
                className="w-full h-full object-cover opacity-80"
              />
            )}
            {/* Cinematic Grain/Overlay if needed */}
          </motion.div>
        </AnimatePresence>

        {/* 2. GRADIENT OVERLAY - Strong Left Gradient for Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />
      </div>

      {/* 3. CONTENT LAYER */}
      <div className="relative z-20 w-full h-full max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">

        {/* LEFT COLUMN: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start pt-32 lg:pt-0">
          {/* Eyebrow */}
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-4 lg:mb-6"
          >
            <span className="w-8 lg:w-10 h-[1px] bg-primary" />
            <span className="text-white/80 uppercase tracking-[0.2em] text-xs lg:text-sm font-medium">
              Leichhardt Dental Centre
            </span>
          </motion.div>

          {/* Dynamic Headline */}
          <div className="mb-4 flex flex-col justify-center">
            <h1 className="font-heading font-bold text-white leading-tight tracking-tight">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {heroSlides[currentSlide].headline}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-lg xl:max-w-xl font-light leading-relaxed mb-8"
          >
            {heroSlides[currentSlide].subhead}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
            <button onClick={openModal} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full text-sm lg:text-base font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 flex items-center justify-center">
              Book Appointment <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button className="px-6 py-3 lg:px-8 lg:py-4 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm lg:text-base font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center">
              {heroSlides[currentSlide].secondaryButton}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: RE MOVED as per user request to remove 'Client Review' container entirely */}
        {/* <div className="hidden lg:flex w-full lg:w-1/2 h-full items-center justify-end pr-12"> ... </div> */}

      </div>

      {/* Progress Indicators / Navigation (Bottom Right) */}
      <div className="absolute bottom-12 right-12 z-30 flex items-center gap-6">
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="flex items-center gap-2 text-white/50 font-mono text-sm">
          <span className="text-white">0{currentSlide + 1}</span>
          <div className="w-12 h-[1px] bg-white/20 overflow-hidden relative">
            {heroSlides[currentSlide].type === 'video' ? (
              <div
                className="h-full bg-primary transition-all duration-100 ease-linear"
                style={{ width: `${videoProgress}%` }}
              />
            ) : (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                key={currentSlide}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-primary"
              />
            )}
          </div>
          <span>0{heroSlides.length}</span>
        </div>
      </div>

    </section>
  );
}
