import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useBooking } from "./booking/BookingContext";
import logo from "../assets/logo.svg";

export function Navbar() {
    const { openModal } = useBooking();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
            >
                <div className={`backdrop-blur-xl border rounded-full px-4 py-2 lg:px-6 lg:py-3 flex items-center justify-between gap-6 lg:gap-8 transition-all duration-300 max-w-4xl lg:max-w-5xl w-full ${scrolled ? "bg-white/80 border-black/5 shadow-2xl shadow-black/5" : "bg-white/5 border-white/10 shadow-2xl shadow-black/20"}`}>
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center transition-colors duration-300`}>
                            <img src={logo} alt="Leichhardt Dental" className="w-full h-full object-contain" />
                        </div>

                    </div>

                    {/* Desktop Links - Capsule Style */}
                    <div className={`hidden md:flex items-center rounded-full px-1 p-1 border transition-all duration-300 ${scrolled ? "bg-black/5 border-black/5" : "bg-white/5 border-white/5"}`}>
                        {["Services", "Our Process", "About", "Contact"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                                className={`px-4 py-2 lg:px-5 lg:py-2 rounded-full text-sm transition-all duration-300 ${scrolled ? "text-foreground/70 hover:text-foreground hover:bg-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Action & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Button onClick={openModal} className={`rounded-full px-4 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${scrolled ? "bg-white text-black hover:bg-white/90" : "bg-white text-black hover:bg-white/90"}`}>
                            Book Now
                        </Button>
                        <button
                            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${scrolled ? "bg-black/5 text-foreground" : "bg-white/10 text-white"}`}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex items-center justify-center"
                    >
                        <button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            {["Services", "Our Process", "About", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                                    className="text-4xl font-heading font-bold text-white hover:text-primary transition-colors duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <Button onClick={openModal} className="bg-primary text-white hover:bg-primary/90 mt-8 px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105">
                                Book Appointment
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
