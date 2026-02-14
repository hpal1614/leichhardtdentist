
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DayPicker } from "react-day-picker";
import { format, isSameDay, addDays } from "date-fns";
import { useBooking } from "../BookingContext";
import { getAvailableSlots, Slot, DOCTORS } from "../../../lib/availabilityEngine";
import { Loader2, Sun, Moon, Coffee } from "lucide-react";
import "react-day-picker/dist/style.css"; // Ensure styles are loaded or handled globally

// Custom DatePicker Styles wrapper to match theme
// We'll use a wrapper div to target CSS or use modifiersClassNames if needed.
// For now, standard styles are fine with our container.

export function BookingDateTimeStep() {
    const { date, setDate, providerId, serviceId, setTimeSlot, setStep } = useBooking();
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);

    // If "any" provider, we might logic to check all doctors. 
    // For simplicity/mock, if "any", we pick Dr Sarah (most avail).
    const effectiveProviderId = providerId === "any" ? "dr-sarah" : providerId;

    useEffect(() => {
        if (date && serviceId && effectiveProviderId) {
            setLoading(true);
            // Simulate network delay
            setTimeout(() => {
                const available = getAvailableSlots(date, effectiveProviderId, serviceId);
                setSlots(available);
                setLoading(false);
            }, 600);
        } else {
            setSlots([]);
        }
    }, [date, serviceId, effectiveProviderId]);

    const handleSlotSelect = (slot: Date) => {
        setTimeSlot(slot);
        setStep(4);
    };

    // Group slots by Morning/Afternoon
    const morningSlots = slots.filter(s => s.time.getHours() < 12);
    const afternoonSlots = slots.filter(s => s.time.getHours() >= 12 && s.time.getHours() < 17);
    const eveningSlots = slots.filter(s => s.time.getHours() >= 17);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col lg:flex-row gap-12 h-full"
        >
            {/* Calendar Column */}
            <div className="flex-1 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 mb-6 w-full text-center lg:text-left">Select Date</h3>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={[
                            { dayOfWeek: [0] }, // Sunday output closed
                            { before: new Date() }, // Past dates
                            { after: addDays(new Date(), 60) } // Max booking window
                        ]}
                        classNames={{
                            day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                            day_today: "text-primary font-bold",
                        }}
                    />
                </div>
            </div>

            {/* Slots Column */}
            <div className="flex-1 border-l border-gray-100 pl-0 lg:pl-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Select Time</h3>

                {!date ? (
                    <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
                        Select a date first
                    </div>
                ) : loading ? (
                    <div className="h-64 flex items-center justify-center text-primary">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : slots.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center">
                        <p className="mb-2">No availability on this date.</p>
                        <p className="text-sm">Please try another day.</p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">

                        {morningSlots.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                                    <Coffee className="w-4 h-4" /> Morning
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {morningSlots.map((slot, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSlotSelect(slot.time)}
                                            className="py-3 px-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-sm font-medium"
                                        >
                                            {format(slot.time, "h:mm a")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {afternoonSlots.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                                    <Sun className="w-4 h-4" /> Afternoon
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {afternoonSlots.map((slot, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSlotSelect(slot.time)}
                                            className="py-3 px-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-sm font-medium"
                                        >
                                            {format(slot.time, "h:mm a")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {eveningSlots.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                                    <Moon className="w-4 h-4" /> Evening
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {eveningSlots.map((slot, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSlotSelect(slot.time)}
                                            className="py-3 px-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-sm font-medium"
                                        >
                                            {format(slot.time, "h:mm a")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
