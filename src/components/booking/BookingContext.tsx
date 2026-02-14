
import { createContext, useContext, useState, ReactNode } from "react";
import { addDays } from "date-fns";

export interface BookingData {
    step: number;
    serviceId: string | null;
    providerId: string | null;
    date: Date | undefined;
    timeSlot: Date | null; // The exact selected time
    details: {
        name: string;
        email: string;
        phone: string;
        note: string;
    };
}

interface BookingContextType extends BookingData {
    setStep: (step: number) => void;
    setServiceId: (id: string) => void;
    setProviderId: (id: string) => void;
    setDate: (date: Date | undefined) => void;
    setTimeSlot: (time: Date | null) => void;
    setDetails: (details: BookingData["details"]) => void;
    resetBooking: () => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [providerId, setProviderId] = useState<string | null>(null);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [timeSlot, setTimeSlot] = useState<Date | null>(null);
    const [details, setDetailsState] = useState({
        name: "",
        email: "",
        phone: "",
        note: "",
    });

    const setDetails = (d: BookingData["details"]) => setDetailsState(d);

    const resetBooking = () => {
        setStep(1);
        setServiceId(null);
        setProviderId(null);
        setDate(undefined);
        setTimeSlot(null);
        setDetailsState({ name: "", email: "", phone: "", note: "" });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        // Optional: reset after close animation
        setTimeout(resetBooking, 500);
    };

    return (
        <BookingContext.Provider
            value={{
                step,
                setStep,
                serviceId,
                setServiceId,
                providerId,
                setProviderId,
                date,
                setDate,
                timeSlot,
                setTimeSlot,
                details,
                setDetails,
                resetBooking,
                isModalOpen,
                openModal,
                closeModal,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
