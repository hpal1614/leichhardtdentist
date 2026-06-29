import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { optimizeVideoUrl } from "../lib/cloudinary";

interface VideoSegment {
    start: number;
    end: number;
}

interface Story {
    id: number;
    category: string;
    treatment: string;
    patient: string;
    quote: string;
    image: string;
    type?: "image" | "video";
    videoSrc?: string;
    thumbnailTime?: number; // Time to show when paused initially
    startTime?: number; // Legacy/Single segment start
    endTime?: number;   // Legacy/Single segment end
    segments?: VideoSegment[]; // Multi-segment support
}

const stories: Story[] = [
    {
        id: 1,
        category: "Implants",
        treatment: "Story of Transformation",
        patient: "",
        quote: "",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        type: "video",
        videoSrc: "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/home/case-studies/story-of-transformation.mp4",
        thumbnailTime: 24,
    },
    {
        id: 2,
        category: "Implants",
        treatment: "All on 4",
        patient: "",
        quote: "",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
        type: "video",
        videoSrc: "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/home/case-studies/placeholder-1.mp4",
        thumbnailTime: 18, // poster frame shown when paused
        segments: [
            { start: 18, end: 26 }, // starts where the poster is
            { start: 47, end: 50 }
        ]
    },
    {
        id: 3,
        category: "Cosmetic",
        treatment: "Same Day Smile",
        patient: "",
        quote: "",
        image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80",
        type: "video",
        videoSrc: "https://res.cloudinary.com/dzydzte9h/video/upload/download_srxu4c.mp4",
        thumbnailTime: 4, // poster frame shown when paused (clip is only ~12.4s, plays full on loop)
    },
    {
        id: 4,
        category: "Implants",
        treatment: "All on Implants",
        patient: "",
        quote: "",
        image: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/home/case-studies/all-on-implants-case.jpg",
    },
    {
        id: 5,
        category: "Cosmetic",
        treatment: "Same Day Smile",
        patient: "",
        quote: "",
        image: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/home/case-studies/same-day-smile-card.jpg",
    },
    {
        id: 6,
        category: "Orthodontics",
        treatment: "Braces and Implants",
        patient: "",
        quote: "",
        image: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/home/case-studies/braces-implants-case.jpg",
    },
];

const categories = ["All", "Veneers", "Bonding", "Implants", "Makeover"];

function VideoStoryCard({ story }: { story: Story }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [opacity, setOpacity] = useState(1); // For fade transitions

    // Determine segments or fallback to single start/end
    const segments = story.segments || (story.startTime !== undefined && story.endTime !== undefined ? [{ start: story.startTime, end: story.endTime }] : []);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            // Priority: thumbnailTime -> first segment start -> 0
            const initialTime = story.thumbnailTime ?? (segments.length > 0 ? segments[0].start : 0);
            videoRef.current.currentTime = initialTime;
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current || segments.length === 0) return;

        const currentTime = videoRef.current.currentTime;
        const currentSegment = segments[currentSegmentIndex];

        // Ensure we are inside the current segment (handles manual seeking out of bounds)
        // Note: Strict boundary checks might cause jitter if seeking manually, so we prioritize the End check.

        // Check if we reached the end of the current segment
        if (currentTime >= currentSegment.end) {
            handleSegmentEnd();
        }
    };

    const handleSegmentEnd = async () => {
        if (!videoRef.current) return;

        // 1. Fade Out
        setOpacity(0);

        // Wait for fade (approx 300ms matching CSS)
        setTimeout(() => {
            if (!videoRef.current) return;

            // 2. Determine next segment
            const nextIndex = (currentSegmentIndex + 1) % segments.length;
            setCurrentSegmentIndex(nextIndex);

            // 3. Seek to next start
            videoRef.current.currentTime = segments[nextIndex].start;

            // If we looped back to 0 and user didn't pause, keep playing.
            if (isPlaying) {
                videoRef.current.play();
            }

            // 4. Fade In
            setTimeout(() => {
                setOpacity(1);
            }, 100);

        }, 300);
    };

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                // If starting from "Thumbnail" mode (which might be outside a segment or at a specific frame),
                // check if we should jump to start of first segment?
                // The thumbnail (4s) is inside 0-15s segment, so it's fine.
                // But for Story 2 (starts 16s), if thumbnail was 0s, we should seek.

                // Logic: If currentTime is outside current segment, seek to start of current segment.
                const currentSegment = segments[currentSegmentIndex];
                if (currentSegment && (videoRef.current.currentTime < currentSegment.start || videoRef.current.currentTime > currentSegment.end)) {
                    videoRef.current.currentTime = currentSegment.start;
                }

                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        // The whole surface toggles play/pause on click (pointer/touch affordance).
        // Keyboard users use the focusable play/pause button below, so the
        // container stays a plain div to avoid nested interactive controls.
        <div
            onClick={togglePlay}
            className="relative w-full h-full group bg-black cursor-pointer"
        >
            <video
                ref={videoRef}
                src={optimizeVideoUrl(story.videoSrc)}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${opacity === 0 ? 'opacity-0' : 'opacity-100'}`}
                loop={segments.length === 0} // Native loop only if no segments
                muted={isMuted}
                playsInline
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            // Removed poster to show video frame
            />
            {/* Controls Overlay - Visible on Group Hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Button
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    aria-label={isPlaying ? `Pause ${story.treatment} video` : `Play ${story.treatment} video`}
                    className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 transition-all transform hover:scale-110"
                >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
                </Button>
            </div>

            {/* Mute Toggle - Bottom Right */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="icon"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10"
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 pointer-events-none" />
        </div>
    );
}

export function ResultsGrid() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredStories = activeCategory === "All"
        ? stories
        : stories.filter(s => s.category === activeCategory);

    return (
        <section className="py-16 lg:py-24 bg-white relative">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Real Results</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                            Stories of Transformation.
                        </h2>
                        <p className="text-base lg:text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
                            A look at the work that happens in our practice.
                            Cases shown are real and published with patient consent.
                        </p>
                    </div>

                    {/* Category filters hidden for now — only 6 cards. Restore from git history to re-enable. */}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {filteredStories.map((story) => (
                            <motion.div
                                key={story.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="group cursor-pointer"
                            >
                                {/* Image/Video Card */}
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-6 shadow-sm">
                                    {story.type === 'video' ? (
                                        <VideoStoryCard story={story} />
                                    ) : (
                                        <>
                                            <img
                                                src={story.image}
                                                alt={story.treatment}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />
                                        </>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="px-2">
                                    <p className="text-foreground font-bold text-base lg:text-lg">{story.treatment}</p>
                                    <p className="text-primary text-xs lg:text-sm uppercase tracking-widest">{story.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <p className="mt-12 lg:mt-16 text-center text-xs text-muted-foreground italic max-w-3xl mx-auto leading-relaxed">
                    Individual results vary — this is not a guarantee of outcome. The cases shown are real, unaltered, and published with patient consent.
                </p>

            </div>
        </section>
    );
}
