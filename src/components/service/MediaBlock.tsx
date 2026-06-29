import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
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
  /** Optional explanation panel rendered beside the video in the lightbox. */
  lightboxSidebar?: {
    title?: string;
    body: ReactNode;
  };
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
  lightboxSidebar,
}: Props) {
  const [open, setOpen] = useState(false);

  const native = isNativeVideo(videoUrl);
  const yt = isYouTube(videoUrl);
  const vm = isVimeo(videoUrl);
  const hasVideo = native || yt || vm;
  const previewImage = videoPoster || imageUrl || fallbackImage;

  // Inline mode (the old behaviour) — ambient autoplay video with controls.
  if (hasVideo && !lightbox) {
    if (native) {
      return (
        <InlineNativeVideo
          videoUrl={videoUrl}
          videoPoster={videoPoster}
          className={className}
          alt={alt}
        />
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
          {/* subtle gradient so the control reads against any poster */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent transition-colors duration-300 group-hover:from-black/55" />
          {/* "Video" tag, top-left — signals this is a playable video */}
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-white">
            <Play className="w-2.5 h-2.5 fill-current" />
            Video
          </span>
          {/* glass play button, bottom-right — matches the homepage video cards */}
          <span className="absolute bottom-4 right-4 lg:bottom-5 lg:right-5 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 lg:w-7 lg:h-7 text-white ml-1 fill-current" />
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
          sidebar={lightboxSidebar}
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

/**
 * Ambient inline video: autoplays muted on loop, but keeps a visible
 * play/pause control and a mute toggle so the viewer stays in control.
 */
function InlineNativeVideo({
  videoUrl,
  videoPoster,
  className = "",
  alt = "",
}: {
  videoUrl?: string;
  videoPoster?: string;
  className?: string;
  alt?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden group ${className}`}>
      <video
        ref={videoRef}
        src={optimizeVideoUrl(videoUrl)}
        poster={videoPoster}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Thumbnail shown while paused (covers the frozen video frame) */}
      {videoPoster && (
        <ImageWithFallback
          src={videoPoster}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-300 ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      )}

      {/* Mute toggle — top right */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/15 flex items-center justify-center transition-all duration-300"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Play / pause — bottom right glass button (matches the homepage video cards) */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Pause ${alt || "video"}` : `Play ${alt || "video"}`}
        className="absolute bottom-4 right-4 lg:bottom-5 lg:right-5 z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 lg:w-7 lg:h-7 text-white fill-current" />
        ) : (
          <Play className="w-6 h-6 lg:w-7 lg:h-7 text-white ml-1 fill-current" />
        )}
      </button>
    </div>
  );
}
