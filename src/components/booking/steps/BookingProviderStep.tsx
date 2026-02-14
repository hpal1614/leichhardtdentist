
import { motion } from "motion/react";
import { useBooking } from "../BookingContext";
import { DOCTORS } from "../../../lib/availabilityEngine";
import { Check, User } from "lucide-react";

export function BookingProviderStep() {
    const { setProviderId, setStep, serviceId } = useBooking();

    const handleSelect = (id: string | null) => {
        // "any" maps to specific logic later, or we just pick the first available. 
        // For simplicity/mock, "any" could just be a special ID or we force the user to pick.
        // The brief said "No Preference". I'll map it to "any".
        setProviderId(id || "any");
        setStep(3);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 max-w-4xl mx-auto"
        >
            <div className="text-center mb-12">
                <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">Who would you like to see?</h3>
                <p className="text-gray-500">Choose a specific practitioner or select &apos;No Preference&apos; for earliest availability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* No Preference Option */}
                <button
                    onClick={() => handleSelect(null)}
                    className="group flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-left"
                >
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">No Preference</h4>
                        <p className="text-sm text-gray-500">Earliest available appointment</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                            <Check className="w-4 h-4" />
                        </div>
                    </div>
                </button>

                {DOCTORS.map((doc) => (
                    <button
                        key={doc.id}
                        onClick={() => handleSelect(doc.id)}
                        className="group flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-left"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-transparent group-hover:border-primary transition-all">
                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900">{doc.name}</h4>
                            <p className="text-sm text-gray-500">{doc.role}</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
