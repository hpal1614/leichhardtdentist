import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useBooking } from "./booking/BookingContext";

export function StickyBookButton() {
  const { openModal } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 sm:hidden"
        >
          <button onClick={openModal} className="flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            <span className="text-xs font-semibold uppercase tracking-widest">Book Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
