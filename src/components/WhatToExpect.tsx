import { motion } from "motion/react";
import { Heart, MessageCircle, Clock, Sparkles } from "lucide-react";

const expectations = [
    {
        icon: Heart,
        title: "No judgement",
        description: "Wherever you're starting from, you're welcome here.",
    },
    {
        icon: MessageCircle,
        title: "Plain English",
        description: "Clear explanations, no confusing jargon.",
    },
    {
        icon: Sparkles,
        title: "Gentle approach",
        description: "Especially if you're nervous — we understand.",
    },
    {
        icon: Clock,
        title: "Fewer visits",
        description: "Modern techniques that respect your time.",
    },
];

export function WhatToExpect() {
    return (
        <section className="py-20 md:py-28 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4"
                        style={{ fontFamily: "'Crimson Pro', serif", fontWeight: "300" }}
                    >
                        What to expect when you visit
                    </h2>
                    <p className="text-foreground/50 text-lg lg:text-xl max-w-2xl mx-auto">
                        A different kind of dental experience — one that puts you first.
                    </p>
                </motion.div>

                {/* Expectation Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {expectations.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <item.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3
                                className="text-xl md:text-2xl mb-3"
                                style={{ fontFamily: "'Crimson Pro', serif" }}
                            >
                                {item.title}
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
