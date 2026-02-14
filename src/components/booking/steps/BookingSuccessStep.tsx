
import { motion } from "motion/react";
import { Check, Calendar } from "lucide-react";
import { useBooking } from "../BookingContext";
import { Button } from "../../ui/button";

export function BookingSuccessStep() {
    const { closeModal } = useBooking();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
        >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 animate-in zoom-in duration-500">
                <Check className="w-12 h-12" />
            </div>

            <h3 className="text-4xl font-heading font-bold text-gray-900 mb-4">You're all set!</h3>
            <p className="text-xl text-gray-500 max-w-md mx-auto mb-12">
                We've sent a confirmation email to you. We look forward to seeing you.
            </p>

            <div className="flex gap-4">
                <Button variant="outline" className="rounded-full px-8 py-6 border-gray-200 hover:bg-gray-50">
                    <Calendar className="w-5 h-5 mr-2" /> Add to Calendar
                </Button>
                <Button
                    onClick={closeModal}
                    className="rounded-full px-10 py-6 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                    Done
                </Button>
            </div>
        </motion.div>
    );
}
