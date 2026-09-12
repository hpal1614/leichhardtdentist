import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Play, Pause, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { VideoLightbox } from "./VideoLightbox";
import { prefersReducedMotion } from "../lib/useAmbientVideo";
import {
  YOUTUBE_VIDEOS,
  YOUTUBE_CHANNEL_URL,
  type YouTubeVideo,
} from "../lib/youtube-fallbacks";
import {
  orderedVideos,
  embedUrl,
  isoDuration,
  spokenDuration,
  thumbnailCandidates,
  watchUrl,
  PLACEHOLDER_THUMBNAIL_WIDTH,
} from "../lib/youtube";
import { PRACTICE } from "../lib/practice";

/**
 * "From Dr. Nick" — his YouTube videos on the home page.
 *
 * Nothing is downloaded from YouTube on page load: each card is a still
 * thumbnail plus a play button (the "facade" pattern). The actual player —
 * roughly a megabyte of third-party JavaScript per video — is only created
 * when someone clicks, and it opens in the site's existing lightbox.
 *
 * Layout adapts to however many videos are switched on in
 * `youtube-fallbacks.ts`:
 *   1 video    → a single large player, no carousel controls
 *   2 or more  → a paged carousel: 3 across on desktop, 2 on tablet, 1 on
 *                phone, so the page never needs sideways scrolling
 */

/** Gap between carousel slides, in px — must match the `gap-6` on the track. */
const SLIDE_GAP = 24;
/** How long each carousel page rests before advancing. */
const AUTO_ADVANCE_MS = 5000;

/** Warms the DNS/TLS handshake to YouTube once the visitor shows intent. */
let warmed = false;
function warmYouTube() {
  if (warmed || typeof document === "undefined") return;
  warmed = true;
  for (const href of [
    "https://www.youtube-nocookie.com",
    "https://i.ytimg.com",
  ]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.appendChild(link);
  }
}

/**
 * Not every upload has every thumbnail size, and a missing one comes back as a
 * 120x90 grey placeholder with HTTP 200 rather than a 404 — so `onError` alone
 * would leave a grey box on the page. Each loaded image is size-checked and the
 * next candidate tried until a real frame arrives.
 */
function Thumbnail({ video }: { video: YouTubeVideo }) {
  const candidates = thumbnailCandidates(video.id);
  const [index, setIndex] = useState(0);
  // Math.min stops at the last candidate, so this can't loop forever.
  const tryNext = () => setIndex((i) => Math.min(i + 1, candidates.length - 1));

  return (
    <img
      src={candidates[index]}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={tryNext}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= PLACEHOLDER_THUMBNAIL_WIDTH) tryNext();
      }}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

/**
 * One video card. `size="lg"` is the solo treatment used when there's a single
 * video; otherwise cards sit in the carousel at equal size.
 */
function VideoCard({
  video,
  onPlay,
  size = "sm",
}: {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  size?: "lg" | "sm";
}) {
  const large = size === "lg";
  return (
    <>
      <button
        type="button"
        onClick={() => onPlay(video)}
        onMouseEnter={warmYouTube}
        onFocus={warmYouTube}
        aria-label={`Play video: ${video.title}, ${spokenDuration(video.duration)}`}
        className={`group relative block w-full overflow-hidden bg-[#1a1a1a] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${
          large ? "rounded-[2rem]" : "rounded-3xl"
        } aspect-video`}
      >
        <Thumbnail video={video} />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            // Dark scrim rather than white glass: YouTube poster frames are
            // often bright (big white title text), where white-on-white
            // disappears.
            className={`rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:bg-black/70 group-hover:scale-110 ${
              large ? "w-16 h-16 lg:w-20 lg:h-20" : "w-14 h-14"
            }`}
          >
            <Play className={large ? "w-7 h-7 lg:w-8 lg:h-8 ml-0.5 fill-current" : "w-6 h-6 ml-0.5 fill-current"} />
          </span>
        </span>
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 text-white text-xs font-medium tabular-nums tracking-wide">
          {video.duration}
        </span>
      </button>
      {/* Clamped to two lines so a long YouTube title can't shift the layout
          or leave cards in a row at different heights. */}
      <p
        title={video.title}
        className={`text-foreground font-bold leading-snug line-clamp-2 ${
          large ? "mt-5 px-2 text-lg lg:text-xl" : "mt-4 px-1 text-sm lg:text-base"
        }`}
      >
        {video.title}
      </p>
    </>
  );
}

export function YouTubeSection() {
  const [active, setActive] = useState<YouTubeVideo | null>(null);
  const videos = orderedVideos(YOUTUBE_VIDEOS);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  // Pause the auto-advance while the visitor is hovering or has keyboard focus
  // inside the carousel, so cards never yank away mid-read (WCAG 2.2.2).
  const [hoverPaused, setHoverPaused] = useState(false);
  // ...and an explicit control, because hovering isn't available to everyone.
  const [stopped, setStopped] = useState(false);

  // 3 across on desktop, 2 on tablet, 1 on phone.
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 640px)");
    const update = () => setCardsPerView(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  const pageCount = Math.max(1, Math.ceil(videos.length / cardsPerView));
  const isCarousel = videos.length > 1;
  const hasPages = isCarousel && pageCount > 1;

  const goToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: el.clientWidth * page,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Reset to the first page when the breakpoint (and so the page count) changes.
  useEffect(() => {
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [cardsPerView]);

  /**
   * Click-and-drag on desktop. Touch devices already scroll this container
   * natively and do it better than any JS emulation, so pointer events from
   * anything other than a mouse are left alone.
   */
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
    };
    // Snap points fight a free drag — turned off for the duration, then
    // restored on release so the track settles onto a card.
    el.style.scrollSnapType = "none";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    const el = scrollRef.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    const page = el.clientWidth
      ? Math.round(el.scrollLeft / el.clientWidth)
      : 0;
    el.style.scrollSnapType = "";
    goToPage(Math.min(Math.max(page, 0), pageCount - 1));
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.clientWidth) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(page, 0), pageCount - 1));
  };

  // Auto-advance one page at a time. Held still while the visitor is reading
  // (hover/focus), while a video is open, if they've pressed pause, or if they
  // prefer reduced motion.
  useEffect(() => {
    if (!hasPages) return;
    if (hoverPaused || stopped || active) return;
    if (prefersReducedMotion()) return;
    const timer = setInterval(
      () => goToPage((activeIndex + 1) % pageCount),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, pageCount, hasPages, hoverPaused, stopped, active]);

  // Nothing switched on in youtube-fallbacks.ts — render nothing at all
  // rather than an empty section with a heading.
  if (videos.length === 0) return null;

  // Google's video rich result needs VideoObject markup: without it the video
  // is invisible to Search and Google Video no matter how well the page ranks.
  // Prerendered into the static HTML via Helmet (see entry-server.tsx).
  const videoSchema = videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailCandidates(video.id)[0]],
    uploadDate: video.uploadDate,
    duration: isoDuration(video.duration),
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    url: watchUrl(video.id),
    publisher: {
      "@type": "Organization",
      name: PRACTICE.name,
      url: PRACTICE.url,
    },
  }));

  return (
    <section
      id="from-dr-nick"
      className="py-16 lg:py-24 bg-white relative scroll-mt-24"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      </Helmet>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-12"
        >
          <div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">
              From Dr. Nick
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Answers, in his own words.
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
              Common questions about treatment, answered on camera.
            </p>
          </div>

          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={warmYouTube}
            className="group inline-flex items-center gap-2 shrink-0 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            Watch on YouTube
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {!isCarousel ? (
            <div className="max-w-4xl mx-auto">
              <VideoCard video={videos[0]} onPlay={setActive} size="lg" />
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseEnter={() => setHoverPaused(true)}
                onMouseLeave={() => setHoverPaused(false)}
                onFocusCapture={() => setHoverPaused(true)}
                onBlurCapture={() => setHoverPaused(false)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onPointerCancel={endDrag}
                // A drag that ends on a card would otherwise fire that card's
                // click and open the video the visitor was scrolling past.
                onClickCapture={(e) => {
                  if (drag.current.moved > 5) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="snap-start shrink-0"
                    // Width depends on the live breakpoint, so it can't be a
                    // static utility class.
                    style={{
                      flexBasis: `calc((100% - ${(cardsPerView - 1) * SLIDE_GAP}px) / ${cardsPerView})`,
                    }}
                  >
                    <VideoCard video={video} onPlay={setActive} />
                  </div>
                ))}
              </div>

              {hasPages && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => goToPage(Math.max(activeIndex - 1, 0))}
                    disabled={activeIndex === 0}
                    aria-label="Previous videos"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-secondary/50 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: pageCount }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goToPage(i)}
                        aria-label={`Go to video page ${i + 1} of ${pageCount}`}
                        aria-current={i === activeIndex}
                        className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          i === activeIndex
                            ? "w-6 bg-primary"
                            : "w-2 bg-foreground/20 hover:bg-foreground/40"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(Math.min(activeIndex + 1, pageCount - 1))}
                    disabled={activeIndex === pageCount - 1}
                    aria-label="Next videos"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-secondary/50 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* WCAG 2.2.2 — anything that moves on its own for more than
                      five seconds needs a way to stop it. */}
                  <button
                    type="button"
                    onClick={() => setStopped((s) => !s)}
                    aria-label={stopped ? "Resume automatic scrolling" : "Stop automatic scrolling"}
                    className="ml-1 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {stopped ? <Play className="w-4 h-4 ml-0.5 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <VideoLightbox
        videoUrl={active ? embedUrl(active.id) : null}
        embed
        onClose={() => setActive(null)}
      />
    </section>
  );
}
