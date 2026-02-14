
import { motion } from "motion/react";

const features = [
    { label: "Natural Light", description: "Floor-to-ceiling windows" },
    { label: "Warm Materials", description: "Timber & stone finishes" },
    { label: "Curated Art", description: "Original contemporary pieces" },
    { label: "Comfort First", description: "Designed to relax" },
];

export function ClinicExperience() {
    return (
        <section className="relative overflow-hidden bg-[#1a1a1a]">
            {/* Hero Image with Overlay */}
            <div className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1920&q=80"
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
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm xl:text-base 2xl:text-lg mb-4 block">Our Space</span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-heading font-bold text-white leading-none">
                                A calm,<br />
                                <span className="text-white/40">considered space.</span>
                            </h2>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative bg-[#1a1a1a] py-20 lg:py-32">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* Left: Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <p className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 font-light leading-relaxed">
                                The moment you walk through our frosted glass doors, you'll notice this isn't a typical dental clinic.
                            </p>
                            <p className="text-lg xl:text-xl 2xl:text-2xl text-white/60 leading-relaxed">
                                Warm timber flooring. Original contemporary artwork. A curved reception desk with soft ambient under-lighting. Comfortable terracotta accent chairs and natural light throughout.
                            </p>
                            <p className="text-lg xl:text-xl 2xl:text-2xl text-white/40 leading-relaxed italic">
                                Every detail is intentional. Every choice designed to help you relax.
                            </p>
                        </motion.div>

                        {/* Right: Feature Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-6 lg:gap-8"
                        >
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                                >
                                    <span className="text-primary text-4xl xl:text-5xl 2xl:text-6xl font-heading font-bold block mb-2">
                                        0{idx + 1}
                                    </span>
                                    <h3 className="text-white text-lg xl:text-xl 2xl:text-2xl font-semibold mb-1">
                                        {feature.label}
                                    </h3>
                                    <p className="text-white/50 text-sm xl:text-base 2xl:text-lg">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Bento Grid Gallery */}
                    <div className="mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        {/* Large Left Image - Full Height */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80"
                                alt="Reception"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-white text-lg xl:text-xl font-medium">Reception & Waiting</span>
                            </div>
                        </motion.div>

                        {/* Right Stack - Vertical */}
                        <div className="grid grid-cols-1 gap-4 lg:gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="relative aspect-[16/9] rounded-3xl overflow-hidden group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                                    alt="Lounge"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-white text-base xl:text-lg font-medium">Patient Lounge</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative aspect-[16/9] rounded-3xl overflow-hidden group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
                                    alt="Treatment Room"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-white text-base xl:text-lg font-medium">Treatment Suite</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-16 lg:mt-24 text-center max-w-3xl xl:max-w-4xl mx-auto"
                    >
                        <p className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white/80 font-light leading-relaxed italic" style={{ fontFamily: "'Crimson Pro', serif" }}>
                            "Because good dentistry starts with feeling comfortable enough to walk through the door."
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
