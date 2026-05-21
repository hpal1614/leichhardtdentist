import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BOOKING_LINK_PROPS } from "../lib/booking";

export function StickyBookButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
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
  );
}
