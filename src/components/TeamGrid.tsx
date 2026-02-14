
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    specialties: string[];
}

const team: TeamMember[] = [
    {
        id: 1,
        name: "Dr. Silvina Cabrerizo",
        role: "General Dentist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
        specialties: ["General Dentistry", "Patient Care"],
    },
    {
        id: 2,
        name: "Dr. Leah Morgan",
        role: "General Dentist",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80",
        specialties: ["General Dentistry", "Preventive Care"],
    },
    {
        id: 3,
        name: "Sarah Mitchell",
        role: "Dental Hygienist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        specialties: ["Preventive Care", "Teeth Cleaning"],
    },
    {
        id: 4,
        name: "James Wilson",
        role: "Practice Manager",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        specialties: ["Patient Experience", "Scheduling"],
    },
    {
        id: 5,
        name: "Emma Chen",
        role: "Dental Assistant",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
        specialties: ["Chair-side Assistance", "Patient Comfort"],
    },
    {
        id: 6,
        name: "Michael Torres",
        role: "Dental Technician",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        specialties: ["CEREC Technology", "Restorations"],
    },
];

export function TeamGrid() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            setCanScrollLeft(scrollRef.current.scrollLeft > 0);
            setCanScrollRight(
                scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
            );
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = direction === "left" ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <section className="py-24 lg:py-32 bg-secondary/5 relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h3 className="text-sm xl:text-base 2xl:text-lg font-bold tracking-[0.2em] text-primary uppercase mb-4">The Team</h3>
                        <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold text-foreground mb-4">
                            Meet the associates.
                        </h2>
                        <p className="text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl xl:max-w-3xl font-light">
                            Dr. Nick is supported by a team of experienced clinicians who share his patient-first philosophy.
                        </p>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-8 md:mt-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className="rounded-full w-12 h-12 xl:w-14 xl:h-14 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
                        >
                            <ArrowLeft className="w-5 h-5 xl:w-6 xl:h-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className="rounded-full w-12 h-12 xl:w-14 xl:h-14 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
                        >
                            <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6" />
                        </Button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:-mx-12 lg:px-12"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {team.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group cursor-pointer min-w-[300px] md:min-w-[350px] xl:min-w-[400px] 2xl:min-w-[450px] snap-start"
                        >
                            {/* Image Card */}
                            <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 relative bg-gray-200 shadow-sm">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                                />

                                {/* Hover Overlay with Details */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 xl:p-10 2xl:p-12">
                                    <p className="text-white/80 text-xs xl:text-sm 2xl:text-base uppercase tracking-widest mb-2">Expertise</p>
                                    <ul className="text-white space-y-1">
                                        {member.specialties.map(s => (
                                            <li key={s} className="text-sm xl:text-base 2xl:text-lg font-medium">• {s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Info Below */}
                            <div className="px-2">
                                <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-heading font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm xl:text-base 2xl:text-lg text-muted-foreground uppercase tracking-widest font-light">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
