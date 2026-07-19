import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BOOKING_LINK_PROPS } from "../lib/booking";

export function StickyBookButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reveal once the user has scrolled roughly one viewport down — i.e. past
    // the hero / page-hero fold — and hide again near the top of the page.
    const update = () => {
      const threshold = window.innerHeight * 0.9;
      setShow(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 sm:hidden"
        >
          <a
            {...BOOKING_LINK_PROPS}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Book Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
