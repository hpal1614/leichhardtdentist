import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type Props = {
  videoUrl?: string;
  videoPoster?: string;
  imageUrl?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
};

/**
 * Renders a video when `videoUrl` is a native video file (.mp4/.mov/.webm/etc),
 * an iframe when it's an embed URL (YouTube/Vimeo), or an image otherwise.
 *
 * Swap a sub-treatment from image → video by pasting a URL in Sanity — this
 * component handles the rest.
 */
export function MediaBlock({
  videoUrl,
  videoPoster,
  imageUrl,
  fallbackImage,
  alt = "",
  className = "",
  autoPlay = false,
}: Props) {
  const [playing, setPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => void 0);
    }
  }, [autoPlay]);

  const isNativeVideo =
    videoUrl && /\.(mp4|mov|webm|m4v|ogg)($|\?)/i.test(videoUrl);
  const isYouTube =
    videoUrl && /(youtube\.com|youtu\.be)/i.test(videoUrl);
  const isVimeo = videoUrl && /vimeo\.com/i.test(videoUrl);

  if (isNativeVideo) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={videoUrl}
          poster={videoPoster}
          className="w-full h-full object-cover"
          playsInline
          muted
          loop
          controls={playing}
          onClick={() => {
            if (!videoRef.current) return;
            if (videoRef.current.paused) {
              videoRef.current.play();
              setPlaying(true);
            } else {
              videoRef.current.pause();
              setPlaying(false);
            }
          }}
        />
        {!playing && !autoPlay && (
          <button
            type="button"
            onClick={() => {
              videoRef.current?.play();
              setPlaying(true);
            }}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/15 transition-colors duration-300 group"
          >
            <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Play className="w-7 h-7 text-foreground ml-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    );
  }

  if (isYouTube || isVimeo) {
    // Normalise YouTube watch URLs to /embed/
    const embedUrl = isYouTube
      ? videoUrl!.replace(
          /youtube\.com\/watch\?v=([^&]+).*/,
          "youtube.com/embed/$1"
        ).replace(/youtu\.be\/([^?]+).*/, "youtube.com/embed/$1")
      : videoUrl!;
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          title={alt || "Video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

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
