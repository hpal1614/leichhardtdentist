
import { motion } from "motion/react";
import { useBooking } from "../BookingContext";
import { SERVICES } from "../../../lib/availabilityEngine";
import { ArrowRight, Stethoscope, Sparkles, Zap, Heart } from "lucide-react";

const icons: Record<string, any> = {
    consult: Stethoscope,
    checkup: Heart,
    emergency: Zap,
    whitening: Sparkles,
    cosmetic: Sparkles,
};

export function BookingServiceStep() {
    const { setServiceId, setStep } = useBooking();

    const handleSelect = (id: string) => {
        setServiceId(id);
        setStep(2);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="text-center mb-12">
                <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">How can we help you today?</h3>
                <p className="text-gray-500">Select a service to view availability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((service) => {
                    const Icon = icons[service.id] || Stethoscope;
                    return (
                        <button
                            key={service.id}
                            onClick={() => handleSelect(service.id)}
                            className="group flex flex-col items-start p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-left relative overflow-hidden"
                        >
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                <Icon className="w-6 h-6" />
                            </div>

                            <h4 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h4>
                            <p className="text-sm text-gray-500 mb-6">{service.durationMinutes} Minutes • {service.price}</p>

                            <div className="mt-auto flex items-center text-primary font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Select <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
