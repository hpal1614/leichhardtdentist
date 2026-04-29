import { Play } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { VideoLightbox } from "../VideoLightbox";
import { optimizeVideoUrl } from "../../lib/cloudinary";

type Props = {
  videoUrl?: string;
  videoPoster?: string;
  imageUrl?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  /** When true (default for service pages), clicking play opens the video in a full-screen lightbox modal with native HTML5 controls. */
  lightbox?: boolean;
};

const isNativeVideo = (url?: string) =>
  Boolean(url && /\.(mp4|mov|webm|m4v|ogg)($|\?)/i.test(url));
const isYouTube = (url?: string) =>
  Boolean(url && /(youtube\.com|youtu\.be)/i.test(url));
const isVimeo = (url?: string) => Boolean(url && /vimeo\.com/i.test(url));

const toEmbedUrl = (url: string) =>
  url
    .replace(/youtube\.com\/watch\?v=([^&]+).*/, "youtube.com/embed/$1")
    .replace(/youtu\.be\/([^?]+).*/, "youtube.com/embed/$1");

/**
 * Renders a still preview (poster / image) with a play overlay. Click → opens
 * the video in a full-screen lightbox modal with native browser controls.
 *
 * Set `lightbox={false}` for ambient inline-loop usage (e.g. the Hero) or
 * places where the video should auto-play silently in the page rather than
 * open a modal.
 */
export function MediaBlock({
  videoUrl,
  videoPoster,
  imageUrl,
  fallbackImage,
  alt = "",
  className = "",
  lightbox = true,
}: Props) {
  const [open, setOpen] = useState(false);

  const native = isNativeVideo(videoUrl);
  const yt = isYouTube(videoUrl);
  const vm = isVimeo(videoUrl);
  const hasVideo = native || yt || vm;
  const previewImage = videoPoster || imageUrl || fallbackImage;

  // Inline mode (the old behaviour) — used by ambient Hero video.
  if (hasVideo && !lightbox) {
    if (native) {
      return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
          <video
            src={optimizeVideoUrl(videoUrl)}
            poster={videoPoster}
            className="w-full h-full object-cover"
            playsInline
            muted
            loop
            autoPlay
          />
        </div>
      );
    }
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <iframe
          src={yt ? toEmbedUrl(videoUrl!) : optimizeVideoUrl(videoUrl)}
          title={alt || "Video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Lightbox mode — preview tile + play button.
  if (hasVideo && lightbox) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play ${alt || "video"}`}
          className={`group relative w-full h-full overflow-hidden ${className}`}
        >
          {previewImage ? (
            <ImageWithFallback
              src={previewImage}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-secondary/30" />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Play className="w-7 h-7 lg:w-8 lg:h-8 text-foreground ml-1" fill="currentColor" />
            </span>
          </div>
          <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.25em] font-semibold text-foreground">
            Watch
          </span>
        </button>

        <VideoLightbox
          videoUrl={
            open
              ? yt
                ? toEmbedUrl(videoUrl!)
                : optimizeVideoUrl(videoUrl) ?? null
              : null
          }
          poster={videoPoster}
          embed={yt || vm}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  // No video at all — show image or gradient.
  const src = imageUrl || fallbackImage;
  if (src) {
    return (
      <ImageWithFallback
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-secondary/60 to-secondary/30 ${className}`}
      aria-hidden="true"
    />
  );
}
