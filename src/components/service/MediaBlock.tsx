import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { VideoLightbox } from "../VideoLightbox";
import { optimizeVideoUrl } from "../../lib/cloudinary";
import { useAmbientVideo } from "../../lib/useAmbientVideo";

type Props = {
  videoUrl?: string;
  videoPoster?: string;
  /** Optional separate soundtrack, played in sync with an inline (non-lightbox) video. */
  audioUrl?: string;
  imageUrl?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  /** When true (default for service pages), clicking play opens the video in a full-screen lightbox modal with native HTML5 controls. */
  lightbox?: boolean;
  /** When true, the video plays inline in place on tap (no modal, no autoplay) — for hero tiles that should play where they sit. Native video only. */
  inline?: boolean;
  /** Optional explanation panel rendered beside the video in the lightbox. */
  lightboxSidebar?: {
    title?: string;
    body: ReactNode;
  };
  /** How the poster image fits its container. Defaults to "cover" (fills, may crop). Use "contain" to letterbox so the whole image is visible. */
  posterFit?: "cover" | "contain";
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
  audioUrl,
  imageUrl,
  fallbackImage,
  alt = "",
  className = "",
  lightbox = true,
  inline = false,
  lightboxSidebar,
  posterFit = "cover",
}: Props) {
  const [open, setOpen] = useState(false);

  const native = isNativeVideo(videoUrl);
  const yt = isYouTube(videoUrl);
  const vm = isVimeo(videoUrl);
  const hasVideo = native || yt || vm;
  const previewImage = videoPoster || imageUrl || fallbackImage;

  // Click-to-play inline — plays in place on tap (no modal, no autoplay).
  // For native video only; loads nothing until the visitor presses play.
  if (hasVideo && native && inline) {
    return (
      <InlineClickToPlayVideo
        videoUrl={videoUrl}
        videoPoster={videoPoster}
        previewImage={previewImage}
        className={className}
        alt={alt}
        posterFit={posterFit}
      />
    );
  }

  // Inline mode (the old behaviour) — ambient autoplay video with controls.
  if (hasVideo && !lightbox) {
    if (native) {
      return (
        <InlineNativeVideo
          videoUrl={videoUrl}
          videoPoster={videoPoster}
          audioUrl={audioUrl}
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
              className={`absolute inset-0 w-full h-full ${posterFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]`}
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
  audioUrl,
  className = "",
  alt = "",
}: {
  videoUrl?: string;
  videoPoster?: string;
  audioUrl?: string;
  className?: string;
  alt?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Optional separate soundtrack for a silent video, kept in sync with it.
  const audioRef = useRef<HTMLAudioElement>(null);
  // Starts false — playback begins when useAmbientVideo brings it into view.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  // Defer download until near the viewport; pause again off-screen.
  useAmbientVideo(videoRef);

  const syncAudio = (force = false) => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return;
    if (force || Math.abs(a.currentTime - v.currentTime) > 0.3) {
      a.currentTime = v.currentTime;
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
      // Start the soundtrack from within this click (gesture), in case its
      // muted autoplay was blocked.
      if (audioRef.current) {
        syncAudio(true);
        audioRef.current.play().catch(() => {});
      }
    } else {
      v.pause();
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const nowMuted = !v.muted;
    v.muted = nowMuted;
    const a = audioRef.current;
    if (a) a.muted = nowMuted;
    // Unmuting is a real click, so treat it as "play with sound": make sure the
    // video AND its soundtrack are running and aligned. (Their muted autoplay
    // may have been blocked, which would otherwise leave un-mute silent.)
    if (!nowMuted) {
      if (v.paused) {
        v.play().catch(() => {});
        setIsPlaying(true);
      }
      if (a) {
        syncAudio(true);
        a.play().catch(() => {});
      }
    }
    setIsMuted(nowMuted);
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
        preload="none"
        onPlay={() => {
          setIsPlaying(true);
          if (audioRef.current) {
            syncAudio(true);
            audioRef.current.play().catch(() => {});
          }
        }}
        onPause={() => {
          setIsPlaying(false);
          audioRef.current?.pause();
        }}
        onTimeUpdate={() => {
          if (audioRef.current && !audioRef.current.paused) syncAudio();
        }}
      />
      {/* Separate soundtrack for a video that ships without an audio track.
          Autoplays muted alongside the video (muted media autoplay is allowed)
          and becomes audible when the viewer unmutes. */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} loop muted preload="none" />
      )}

      {/* Poster shown on load and while paused (covers the frozen video frame).
          Loaded eagerly because it's the above-the-fold hero image — otherwise
          the lazy default means it isn't fetched before autoplay hides it, so it
          only appears after the viewer first pauses. */}
      {videoPoster && (
        <ImageWithFallback
          src={videoPoster}
          alt={alt}
          loading="eager"
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

/**
 * Click-to-play inline video: shows a poster tile with a play button; on tap it
 * swaps in a native <video controls> that plays in place (no modal). Nothing
 * downloads until the visitor presses play (preload only starts then).
 */
function InlineClickToPlayVideo({
  videoUrl,
  videoPoster,
  previewImage,
  className = "",
  alt = "",
  posterFit = "cover",
}: {
  videoUrl?: string;
  videoPoster?: string;
  previewImage?: string;
  className?: string;
  alt?: string;
  posterFit?: "cover" | "contain";
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <video
          src={optimizeVideoUrl(videoUrl)}
          poster={videoPoster}
          className="w-full h-full object-cover"
          controls
          autoPlay
          playsInline
          preload="auto"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${alt || "video"}`}
      className={`group relative w-full h-full overflow-hidden ${className}`}
    >
      {previewImage ? (
        <ImageWithFallback
          src={previewImage}
          alt={alt}
          className={`absolute inset-0 w-full h-full ${posterFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]`}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-secondary/30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent transition-colors duration-300 group-hover:from-black/55" />
      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-white">
        <Play className="w-2.5 h-2.5 fill-current" />
        Video
      </span>
      <span className="absolute bottom-4 right-4 lg:bottom-5 lg:right-5 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        <Play className="w-6 h-6 lg:w-7 lg:h-7 text-white ml-1 fill-current" />
      </span>
    </button>
  );
}
