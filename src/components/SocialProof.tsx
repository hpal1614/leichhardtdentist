import { motion } from "motion/react";
import { Star, Clock, MapPin, ShieldCheck } from "lucide-react";

const trustSignals = [
    {
        icon: Star,
        text: "4.9★ on Google",
        subtext: "120+ reviews",
    },
    {
        icon: Clock,
        text: "15+ years",
        subtext: "in the Inner West",
    },
    {
        icon: ShieldCheck,
        text: "Same-day",
        subtext: "treatments available",
    },
    {
        icon: MapPin,
        text: "Leichhardt",
        subtext: "easy parking",
    },
];

export function SocialProof() {
    return (
        <section className="bg-white border-b border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="py-6 md:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8"
                    >
                        {trustSignals.map((signal, index) => (
                            <motion.div
                                key={signal.text}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <signal.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-foreground font-medium text-sm md:text-base">{signal.text}</p>
                                    <p className="text-foreground/50 text-xs md:text-sm">{signal.subtext}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
