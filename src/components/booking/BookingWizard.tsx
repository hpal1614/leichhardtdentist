
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowLeft } from "lucide-react";
import { useBooking } from "./BookingContext";
import { useEffect } from "react";
import { Button } from "../ui/button";

// Placeholder Steps (Will be replaced by real components)
import { BookingServiceStep } from "./steps/BookingServiceStep";
import { BookingProviderStep } from "./steps/BookingProviderStep";
import { BookingDateTimeStep } from "./steps/BookingDateTimeStep";
import { BookingDetailsStep } from "./steps/BookingDetailsStep";
import { BookingSuccessStep } from "./steps/BookingSuccessStep";

export function BookingWizard() {
    const { isModalOpen, closeModal, step, setStep } = useBooking();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isModalOpen]);

    const handleBack = () => {
        if (step > 1 && step < 5) {
            setStep(step - 1);
        }
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
                    >
                        <div className="bg-white pointer-events-auto rounded-3xl w-full max-w-5xl h-[90vh] md:h-[800px] shadow-2xl overflow-hidden flex flex-col relative">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    {step > 1 && step < 5 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleBack}
                                            className="rounded-full hover:bg-gray-100"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                                        </Button>
                                    )}
                                    <div>
                                        <span className="text-primary font-bold tracking-widest uppercase text-xs">
                                            Step {step < 5 ? `0${step}` : '05'} / 05
                                        </span>
                                        <h2 className="text-xl font-heading font-bold text-gray-900 leading-none mt-1">
                                            {step === 1 && "Select Service"}
                                            {step === 2 && "Choose Practitioner"}
                                            {step === 3 && "Date & Time"}
                                            {step === 4 && "Your Details"}
                                            {step === 5 && "Confirmed"}
                                        </h2>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={closeModal}
                                    className="rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </Button>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1 bg-gray-100 w-full">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 5) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-12 relative bg-gray-50/50">
                                <AnimatePresence mode="wait">
                                    {step === 1 && <BookingServiceStep key="step1" />}
                                    {step === 2 && <BookingProviderStep key="step2" />}
                                    {step === 3 && <BookingDateTimeStep key="step3" />}
                                    {step === 4 && <BookingDetailsStep key="step4" />}
                                    {step === 5 && <BookingSuccessStep key="step5" />}
                                </AnimatePresence>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
