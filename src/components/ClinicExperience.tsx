
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { VideoLightbox } from "./VideoLightbox";
import clinic1 from "../assets/clinic-1.jpg";

const AMBIENT_VIDEO =
    "https://res.cloudinary.com/dzydzte9h/video/upload/q_auto,f_auto/dental-website/home/hero/ambient.mov";

const features = [
    { label: "Natural Light", description: "Floor-to-ceiling windows" },
    { label: "Warm Materials", description: "Timber & stone finishes" },
    { label: "Curated Art", description: "Original contemporary pieces" },
    { label: "Comfort First", description: "Designed to relax" },
];

export function ClinicExperience() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            void video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-[#1a1a1a]">
            {/* Hero Image with Overlay */}
            <div className="relative h-[55vh] md:h-[70vh] lg:h-[85vh] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={clinic1}
                    alt="Clinic Interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />

                {/* Floating Header */}
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Our Space</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-none">
                                A calm,<br />
                                <span className="text-white/40">considered space.</span>
                            </h2>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative bg-[#1a1a1a] py-16 lg:py-24">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* Left: Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <p className="text-lg lg:text-xl xl:text-2xl text-white/90 font-light leading-relaxed">
                                The moment you walk through our frosted glass doors, you'll notice this isn't a typical dental clinic.
                            </p>
                            <p className="text-base lg:text-lg text-white/60 leading-relaxed">
                                Warm timber flooring. Original contemporary artwork. A curved reception desk with soft ambient under-lighting. Comfortable terracotta accent chairs and natural light throughout.
                            </p>
                            <p className="text-base lg:text-lg text-white/40 leading-relaxed italic">
                                Every detail is intentional. Every choice designed to help you relax.
                            </p>
                        </motion.div>

                        {/* Right: Feature Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4 lg:gap-6"
                        >
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group p-4 lg:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                                >
                                    <span className="text-primary text-3xl lg:text-4xl font-heading font-bold block mb-2">
                                        0{idx + 1}
                                    </span>
                                    <h3 className="text-white text-base lg:text-lg font-semibold mb-1">
                                        {feature.label}
                                    </h3>
                                    <p className="text-white/50 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Single ambient video — replaces previous 3-card bento gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group mt-12 lg:mt-20 relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
                    >
                        <video
                            ref={videoRef}
                            src={AMBIENT_VIDEO}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />

                        {/* Controls cluster — bottom right, same control style as the Stories of Transformation cards */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-20">
                            <Button
                                onClick={togglePlay}
                                variant="ghost"
                                size="icon"
                                aria-label={isPlaying ? "Pause video" : "Play video"}
                                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10"
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5 fill-current" />
                                ) : (
                                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                                )}
                            </Button>
                            <Button
                                onClick={() => setLightboxOpen(true)}
                                variant="ghost"
                                size="icon"
                                aria-label="Open video fullscreen"
                                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Bottom Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-12 lg:mt-16 text-center max-w-2xl lg:max-w-3xl mx-auto"
                    >
                        <p className="text-xl lg:text-2xl xl:text-3xl text-white/80 font-light leading-relaxed italic" style={{ fontFamily: "'Crimson Pro', serif" }}>
                            "Because good dentistry starts with feeling comfortable enough to walk through the door."
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Fullscreen overlay opened by the maximize button */}
            <VideoLightbox
                videoUrl={lightboxOpen ? AMBIENT_VIDEO : null}
                onClose={() => setLightboxOpen(false)}
            />
        </section>
    );
}
