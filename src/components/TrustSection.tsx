import { motion } from "motion/react";

const stats = [
    { label: "117 Verified Google Reviews", value: "5.0", suffix: " ★★★★★" },
    { label: "Serving Leichhardt's Inner West", value: "", suffix: "" },
    { label: "Clinical Experience", value: "20+", suffix: " Years" },
];

export function TrustSection() {
    return (
        <section className="py-20 bg-secondary/30 border-y border-border relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:divide-x divide-border">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center p-4"
                        >
                            <span className="block text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold text-foreground mb-2">
                                {stat.value}<span className="text-primary text-3xl xl:text-4xl 2xl:text-5xl">{stat.suffix}</span>
                            </span>
                            <span className="text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground uppercase tracking-widest font-medium">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
