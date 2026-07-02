import { useEffect, type RefObject } from "react";

/**
 * Drives an ambient (muted, looping) background video without the `autoPlay`
 * attribute: playback starts only when the video is within ~300px of the
 * viewport and pauses again once it scrolls away, so off-screen videos stop
 * burning bandwidth and battery. Combined with `preload="none"` this also
 * defers the download entirely until the visitor is about to see it.
 *
 * Honours `prefers-reduced-motion` by never auto-starting — the poster stays
 * put and any visible play control still works manually.
 */
export function useAmbientVideo(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* autoplay blocked (e.g. iOS low-power mode) — poster remains */
          });
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [ref]);
}

/** True when the visitor prefers reduced motion — use to skip JS-driven
 *  smooth scrolling, which ignores the CSS `scroll-behavior` override. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
