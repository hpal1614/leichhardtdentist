import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// NOTE: Images below are Unsplash placeholders. Replace with real clinical photos
// (with signed patient consent) before launch. Stock images presented as before/after
// would breach AHPRA s.133(1)(a) and Australian Consumer Law.
const cases = [
    {
        id: 1,
        procedure: "Porcelain Veneers",
        description: "Addressing spacing and enamel discolouration with ultra-thin porcelain veneers.",
        age: "34",
        condition: "Spacing and enamel discolouration",
        timeframe: "3 visits over 4 weeks",
        clinician: "Dr. Nick, Dentist",
        before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        after: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    },
    {
        id: 2,
        procedure: "Dental Implants",
        description: "Restoring function and structure with precision-placed implants following tooth loss.",
        age: "58",
        condition: "Missing posterior teeth, reduced bite function",
        timeframe: "6 months (staged)",
        clinician: "Dr. Nick, Dentist",
        before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
        after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    },
    {
        id: 3,
        procedure: "Clear Aligners",
        description: "Subtle alignment correction followed by edge bonding to refine symmetry.",
        age: "28",
        condition: "Mild crowding, uneven incisal edges",
        timeframe: "9 months",
        clinician: "Dr. Nick, Dentist",
        before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        after: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&fit=crop&crop=faces",
    },
    {
        id: 4,
        procedure: "Full Mouth Rehabilitation",
        description: "Complex rehabilitation to restore bite function and aesthetics after years of wear.",
        age: "62",
        condition: "Advanced tooth wear, compromised occlusion",
        timeframe: "8 months (staged)",
        clinician: "Dr. Nick, Dentist",
        before: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80",
        after: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80&fit=crop&crop=faces",
    },
    {
        id: 5,
        procedure: "In-Chair Whitening",
        description: "Professional in-chair whitening treatment followed by take-home maintenance trays.",
        age: "41",
        condition: "Extrinsic staining",
        timeframe: "1 visit + 2 weeks take-home",
        clinician: "Dr. Nick, Dentist",
        before: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
        after: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80&fit=crop&crop=faces",
    },
    {
        id: 6,
        procedure: "Emergency Restoration",
        description: "Urgent treatment to restore a fractured tooth and re-establish function.",
        age: "39",
        condition: "Fractured tooth following trauma",
        timeframe: "1 visit",
        clinician: "Dr. Nick, Dentist",
        before: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        after: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&fit=crop&crop=faces",
    }
];

export function TransformationGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"after" | "before">("after");

    const currentItem = cases[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % cases.length);
        setViewMode("after");
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
        setViewMode("after");
    };

    return (
        <section id="results" className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Case Studies</span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[0.9]">
                            Clinical<br />Cases.
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
                                        alt={`${currentItem.procedure} — ${viewMode}`}
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
                                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">
                                    Case {String(currentItem.id).padStart(2, "0")}
                                </span>

                                <h3 className="text-3xl md:text-4xl font-heading text-foreground leading-tight mb-6">
                                    {currentItem.procedure}
                                </h3>

                                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                    {currentItem.description}
                                </p>

                                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border/50 pt-8">
                                    <div>
                                        <dt className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Patient Age</dt>
                                        <dd className="text-base text-foreground">{currentItem.age}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Timeframe</dt>
                                        <dd className="text-base text-foreground">{currentItem.timeframe}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Presenting Condition</dt>
                                        <dd className="text-base text-foreground">{currentItem.condition}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Treated By</dt>
                                        <dd className="text-base text-foreground">{currentItem.clinician}</dd>
                                    </div>
                                </dl>

                                <Button className="mt-10 bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105">
                                    Learn about {currentItem.procedure}
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* AHPRA-required disclaimer — do not remove */}
                <p className="mt-20 pt-8 border-t border-border/50 text-sm text-muted-foreground/80 leading-relaxed max-w-3xl">
                    Individual results vary and are not guaranteed. All dental procedures carry
                    potential risks and benefits, and outcomes depend on individual clinical factors.
                    A consultation with a registered dental practitioner is required to determine
                    whether a treatment is suitable for you. Images shown are of cases treated at
                    the practice and are published with patient consent.
                </p>
            </div>
        </section>
    );
}
