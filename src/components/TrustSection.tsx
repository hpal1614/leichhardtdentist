import { motion } from "motion/react";

const stats = [
    { label: "Clinical Experience", value: "25", suffix: " Years" },
    { label: "Serving Sydney's Inner West & Leichhardt", value: "", suffix: "" },
    { label: "Dentist", value: "Dr. Nick", suffix: " Kulkarni" },
];

export function TrustSection() {
    return (
        <section className="py-6 md:py-10 lg:py-12 bg-secondary/30 border-y border-border relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-center md:divide-x divide-border">
                    {stats.map((stat, index) => {
                        const isLabelOnly = !stat.value;
                        // Last stat (Dr. Nick) is hidden on mobile — already shown in hero trust cards
                        const hiddenOnMobile = index === stats.length - 1;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex-col items-center justify-center px-3 py-1.5 md:p-3 ${hiddenOnMobile ? "hidden md:flex" : "flex"}`}
                            >
                                {stat.value && (
                                    <span className="block text-base md:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-foreground leading-tight uppercase tracking-[0.18em] md:tracking-tight md:normal-case mb-0 md:mb-1">
                                        {stat.value}
                                        {stat.suffix && (
                                            <span className="text-primary text-base md:text-xl lg:text-2xl xl:text-3xl">
                                                {stat.suffix}
                                            </span>
                                        )}
                                    </span>
                                )}
                                <span
                                    className={
                                        isLabelOnly
                                            ? "text-base md:text-xs text-foreground uppercase tracking-[0.18em] font-semibold"
                                            : "text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.18em] font-medium"
                                    }
                                >
                                    {stat.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
