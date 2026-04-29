import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { BOOKING_LINK_PROPS } from "../lib/booking";
import logo from "../assets/logo.svg";

const services = [
  { label: "General Dentistry", href: "/services/general-dentistry" },
  { label: "Dental Implants", href: "/services/dental-implants" },
  { label: "All-on-4 Implants", href: "/services/dental-implants/all-on-4-implants" },
  { label: "Single Visit Crowns", href: "/services/single-visit-crowns" },
  { label: "Same Day Smile", href: "/services/same-day-smile" },
];

const navItems = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const { pathname } = useLocation();
    // Home page has a dark hero behind the navbar — keep the translucent/light-text
    // look until the user scrolls. Every other route has a light page surface
    // immediately behind the navbar, so we go opaque/dark-text from the start.
    const homepage = pathname === "/";
    const [hidden, setHidden] = useState(false);
    const [scrolledRaw, setScrolledRaw] = useState(false);
    const scrolled = homepage ? scrolledRaw : true;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolledRaw(true);
        } else {
            setScrolledRaw(false);
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
                    <Link to="/" className="flex items-center gap-2" aria-label="Leichhardt Dental — Home">
                        <div className={`h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center transition-colors duration-300`}>
                            <img src={logo} alt="Leichhardt Dental" className="w-full h-full object-contain" />
                        </div>
                    </Link>

                    {/* Desktop Links - Capsule Style */}
                    <div className={`hidden md:flex items-center rounded-full px-1 p-1 border transition-all duration-300 ${scrolled ? "bg-black/5 border-black/5" : "bg-white/5 border-white/5"}`}>
                        {/* Services dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button
                                className={`px-4 py-2 lg:px-5 lg:py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-1 ${scrolled ? "text-foreground/70 hover:text-foreground hover:bg-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                                aria-haspopup="true"
                                aria-expanded={servicesOpen}
                            >
                                Services
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[260px] bg-white rounded-2xl border border-black/5 shadow-2xl shadow-black/10 p-2 z-50"
                                    >
                                        {services.map((s) => (
                                            <Link
                                                key={s.href}
                                                to={s.href}
                                                className="block px-4 py-3 rounded-xl text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/60 transition-colors"
                                            >
                                                {s.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`px-4 py-2 lg:px-5 lg:py-2 rounded-full text-sm transition-all duration-300 ${scrolled ? "text-foreground/70 hover:text-foreground hover:bg-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Action & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Button asChild className={`rounded-full px-4 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${scrolled ? "bg-white text-black hover:bg-white/90" : "bg-white text-black hover:bg-white/90"}`}>
                            <a {...BOOKING_LINK_PROPS}>Book Now</a>
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

                        <div className="flex flex-col items-center gap-5 max-h-[80vh] overflow-y-auto px-6">
                            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Services</span>
                            {services.map((s) => (
                                <Link
                                    key={s.href}
                                    to={s.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl md:text-3xl font-heading font-semibold text-white/90 hover:text-primary transition-colors duration-300 text-center"
                                >
                                    {s.label}
                                </Link>
                            ))}
                            <div className="w-16 h-[1px] bg-white/20 my-4" />
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-xl font-heading text-white/70 hover:text-white transition-colors duration-300"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button asChild onClick={() => setMobileMenuOpen(false)} className="bg-primary text-white hover:bg-primary/90 mt-6 px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105">
                                <a {...BOOKING_LINK_PROPS}>Book Appointment</a>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
