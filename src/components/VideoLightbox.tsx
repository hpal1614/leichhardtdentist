import { AnimatePresence, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  videoUrl: string | null;
  poster?: string;
  embed?: boolean; // true for YouTube/Vimeo iframe sources
  onClose: () => void;
  /**
   * Optional explainer panel rendered alongside the video. When present,
   * the modal becomes a 2-column flex layout (video left, copy right).
   * When absent, the video is centered as a single block.
   */
  sidebar?: {
    title?: string;
    body: ReactNode;
  };
};

/**
 * Full-screen, accessible video modal.
 *  - Native HTML5 <video controls> (no third-party branding)
 *  - Esc / click-outside / X to close
 *  - Body scroll locked while open
 *  - Optional `sidebar` prop renders explainer copy beside the video
 */
export function VideoLightbox({
  videoUrl,
  poster,
  embed,
  onClose,
  sidebar,
}: Props) {
  useEffect(() => {
    if (!videoUrl) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [videoUrl, onClose]);

  const videoEl = embed ? (
    <iframe
      src={videoUrl ?? ""}
      title="Video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      className="w-full h-full"
    />
  ) : (
    <video
      src={videoUrl ?? ""}
      poster={poster}
      controls
      autoPlay
      muted
      playsInline
      className="w-full h-full object-contain bg-black"
    />
  );

  return (
    <AnimatePresence>
      {videoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-5 right-5 lg:top-7 lg:right-7 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={
              sidebar
                ? "w-full max-w-7xl flex flex-col lg:flex-row gap-5 lg:gap-8 max-h-full"
                : "w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video"
            }
          >
            {sidebar ? (
              <>
                <div className="lg:flex-[2] aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                  {videoEl}
                </div>
                <aside className="lg:flex-1 lg:max-w-md text-white p-6 lg:p-8 rounded-2xl bg-white/[0.04] border border-white/10 overflow-y-auto">
                  {sidebar.title && (
                    <h3 className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4">
                      {sidebar.title}
                    </h3>
                  )}
                  <div className="text-sm lg:text-base text-white/85 font-light leading-relaxed space-y-4">
                    {sidebar.body}
                  </div>
                </aside>
              </>
            ) : (
              videoEl
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
