
import { motion } from "motion/react";

const reviews = [
    {
        id: 1,
        text: "Absolutely lovely experience from start to finish. Dr. Nick is calm, gentle, and genuinely cares about making patients feel comfortable.",
        author: "Sarah J.",
        location: "Leichhardt"
    },
    {
        id: 2,
        text: "I've been terrified of dentists my whole life, but the team here made me feel at ease. No pressure, no judgment — just honest care.",
        author: "Michael R.",
        location: "Balmain"
    },
    {
        id: 3,
        text: "The clinic is beautiful and modern. My whole family sees Dr. Nick — including my 5-year-old, who now asks when her next visit is!",
        author: "Emma W.",
        location: "Annandale"
    },
    {
        id: 4,
        text: "After years of avoiding the dentist, I finally found a practice I trust. Professional, warm, and thorough.",
        author: "David L.",
        location: "Inner West"
    },
    {
        id: 5,
        text: "Highly recommend. Dr. Nick explained everything clearly and never rushed. Felt like I was in safe hands the whole time.",
        author: "James P.",
        location: "Newtown"
    }
];

export function Testimonials() {
    return (
        <section className="py-16 lg:py-20 bg-white overflow-hidden relative border-t border-secondary/20">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 mb-10">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">What Patients Say</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                    117 Five-Star Reviews.
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground max-w-2xl font-light">
                    Don't just take our word for it — here's what patients across Sydney's Inner West are saying.
                </p>
            </div>

            <div className="flex relative">
                <motion.div
                    className="flex gap-8 px-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    style={{ width: "max-content" }}
                >
                    {[...reviews, ...reviews, ...reviews].map((review, i) => ( // Triple helpful for smooth loop
                        <div
                            key={i}
                            className="w-[280px] md:w-[350px] lg:w-[400px] flex-shrink-0 bg-secondary/5 p-6 lg:p-8 rounded-3xl border border-secondary/20"
                        >
                            <div className="flex gap-1 mb-3 text-primary text-base">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star}>★</span>
                                ))}
                            </div>
                            <p className="text-base lg:text-lg font-serif italic text-muted-foreground mb-4 leading-relaxed">
                                "{review.text}"
                            </p>
                            <div>
                                <p className="font-bold text-foreground text-sm uppercase tracking-widest">{review.author}</p>
                                <p className="text-xs text-muted-foreground">{review.location}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>

            {/* CTA */}
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 mt-10 text-center">
                <p className="text-base lg:text-lg text-muted-foreground font-light">
                    <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Read all 117 reviews on Google →</a>
                </p>
            </div>
        </section>
    );
}
