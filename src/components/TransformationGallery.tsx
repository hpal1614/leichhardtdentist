import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const transformations = [
    {
        id: 1,
        patient: "Sarah J.",
        procedure: "Porcelain Veneers",
        quote: "I never used to smile in photos. Now I can't stop.",
        description: "Addressing spacing and discoloration with ultra-thin porcelain veneers for a radiant, natural finish.",
        before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        after: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    },
    {
        id: 2,
        patient: "Michael R.",
        procedure: "Implants",
        quote: "Functionally amazing. Aesthetically a masterpiece.",
        description: "Restoring full function and facial structure with precision-placed implants. A life-changing shift.",
        before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
        after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    },
    {
        id: 3,
        patient: "Elena K.",
        procedure: "Invisalign",
        quote: "Simple, painless, and the results are flawless.",
        description: "Subtle alignment correction followed by edge bonding to perfect the symmetry.",
        before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        after: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&fit=crop&crop=faces",
    },
    {
        id: 4,
        patient: "David L.",
        procedure: "Rehabilitation",
        quote: "I can eat everything again. It feels incredible.",
        description: "Complex rehabilitation to restore bite function and aesthetics after years of wear.",
        before: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80",
        after: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80&fit=crop&crop=faces", // Placeholder
    },
    {
        id: 5,
        patient: "Jessica M.",
        procedure: "Whitening",
        quote: "Bright, natural, and exactly what I wanted.",
        description: "Professional in-chair whitening for instant, safe, and brilliant results.",
        before: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
        after: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80&fit=crop&crop=faces", // Placeholder
    },
    {
        id: 6,
        patient: "Thomas P.",
        procedure: "Emergency",
        quote: "They saved my tooth and my peace of mind.",
        description: "Urgent care with a calm execution. Restoring broken structure to seamless function.",
        before: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        after: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&fit=crop&crop=faces", // Placeholder
    }
];

export function TransformationGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"after" | "before">("after");

    const currentItem = transformations[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % transformations.length);
        setViewMode("after"); // Reset view on slide change
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
        setViewMode("after");
    };

    return (
        <section id="results" className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Real Results</span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[0.9]">
                            Stories of<br />Transformation.
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full w-14 h-14 border-border hover:bg-black/5 text-foreground">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full w-14 h-14 border-border hover:bg-black/5 text-foreground">
                            <ArrowRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                {/* Main Gallery Content */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Interactive Image Area */}
                    <div className="lg:col-span-7 relative">
                        <motion.div
                            key={currentItem.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative group shadow-2xl border border-black/5 ring-1 ring-black/5"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={viewMode}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0"
                                >
                                    <ImageWithFallback
                                        src={viewMode === "after" ? currentItem.after : currentItem.before}
                                        alt={`${currentItem.patient} - ${viewMode}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Toggle Control Overlay */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-white/40 rounded-full p-1.5 flex items-center gap-1 z-20 shadow-2xl ring-1 ring-black/5">
                                <button
                                    onClick={() => setViewMode("before")}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${viewMode === "before" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-white/50"}`}
                                >
                                    BEFORE
                                </button>
                                <button
                                    onClick={() => setViewMode("after")}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${viewMode === "after" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-white/50"}`}
                                >
                                    AFTER
                                </button>
                            </div>

                            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
                                <span className="text-primary text-xs font-bold tracking-widest uppercase">{currentItem.procedure}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Story Details */}
                    <div className="lg:col-span-5 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Quote className="w-12 h-12 text-primary mb-8" />

                                <blockquote className="text-3xl md:text-4xl font-heading text-foreground leading-tight mb-8">
                                    "{currentItem.quote}"
                                </blockquote>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2">The Patient</h4>
                                        <p className="text-xl text-foreground">{currentItem.patient}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2">The Process</h4>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {currentItem.description}
                                        </p>
                                    </div>
                                </div>

                                <Button className="mt-12 bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105">
                                    See {currentItem.procedure} Details
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
