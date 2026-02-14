
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBooking } from "../BookingContext";
import { Button } from "../../ui/button";
import { format } from "date-fns";
import { SERVICES, DOCTORS } from "../../../lib/availabilityEngine";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is required"),
    note: z.string().optional().default(""),
});

type FormData = z.infer<typeof formSchema>;

export function BookingDetailsStep() {
    const { details, setDetails, setStep, timeSlot, serviceId, providerId } = useBooking();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: details
    });

    const onSubmit = (data: FormData) => {
        setDetails(data);
        // Simulate API call
        setTimeout(() => {
            setStep(5);
        }, 1000);
    };

    const selectedService = SERVICES.find(s => s.id === serviceId);
    const selectedDoctor = DOCTORS.find(d => d.id === providerId);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-12"
        >
            {/* Form */}
            <div>
                <h3 className="text-3xl font-heading font-bold text-gray-900 mb-8">Your Details</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                            {...register("name")}
                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="e.g. Jane Doe"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            {...register("email")}
                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="jane@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            {...register("phone")}
                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="0400 000 000"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                        <textarea
                            {...register("note")}
                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-32 resize-none"
                            placeholder="Anything we should know?"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full py-6 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                            Confirm Booking
                        </Button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            By confirming, you agree to our cancellation policy. No payment required today.
                        </p>
                    </div>
                </form>
            </div>

            {/* Summary Card */}
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl h-fit">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Booking Summary</h4>

                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Service</p>
                        <p className="text-xl font-bold text-gray-900">{selectedService?.name}</p>
                        <p className="text-gray-500">{selectedService?.durationMinutes} mins</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Practitioner</p>
                        <p className="text-xl font-bold text-gray-900">{selectedDoctor?.name || "No Preference"}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                        <p className="text-xl font-bold text-gray-900">
                            {timeSlot ? format(timeSlot, "EEEE, d MMMM") : "-"}
                        </p>
                        <p className="text-primary font-bold text-lg">
                            {timeSlot ? format(timeSlot, "h:mm a") : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
