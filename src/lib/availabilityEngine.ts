
import { addDays, format, setHours, setMinutes, isBefore, isAfter, addMinutes, isWeekend } from "date-fns";

// --- Types ---
export interface Doctor {
    id: string;
    name: string;
    role: string;
    image: string;
    workingDays: number[]; // 0=Sun, 1=Mon...
    startHour: number;
    endHour: number;
}

export interface Service {
    id: string;
    name: string;
    durationMinutes: number; // Critical for slot calculation
    price: string;
}

export interface Slot {
    time: Date;
    available: boolean;
}

// --- Data ---
export const DOCTORS: Doctor[] = [
    {
        id: "dr-nick",
        name: "Dr. Nick",
        role: "Principal Dentist",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        workingDays: [1, 2, 3, 4], // Mon-Thu (Scarcity)
        startHour: 10,
        endHour: 16 // Short hours
    },
    {
        id: "dr-sarah",
        name: "Dr. Sarah",
        role: "Cosmetic Dentist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
        workingDays: [1, 2, 3, 4, 5], // Mon-Fri
        startHour: 9,
        endHour: 18
    },
    {
        id: "dr-michael",
        name: "Dr. Michael",
        role: "Implantologist",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
        workingDays: [2, 4, 6], // Tue, Thu, Sat
        startHour: 9,
        endHour: 17
    },
];

export const SERVICES: Service[] = [
    { id: "consult", name: "New Patient Consultation", durationMinutes: 60, price: "$150" },
    { id: "checkup", name: "Routine Checkup & Clean", durationMinutes: 45, price: "$190" },
    { id: "emergency", name: "Emergency Assessment", durationMinutes: 30, price: "$120" },
    { id: "whitening", name: "Zoom Whitening", durationMinutes: 90, price: "$650" },
    { id: "cosmetic", name: "Cosmetic Consultation", durationMinutes: 60, price: "$150" },
];

// --- Engine ---

// Simulate some existing bookings to prove conflict logic
const EXISTING_BOOKINGS = [
    // Today + 1 at 10am for Dr Nick
    { doctorId: "dr-nick", start: setHours(addDays(new Date(), 1), 10), duration: 60 },
    // Today + 2 at 2pm for Dr Sarah
    { doctorId: "dr-sarah", start: setHours(addDays(new Date(), 2), 14), duration: 45 },
];

export function getAvailableSlots(date: Date, doctorId: string, serviceId: string): Slot[] {
    const doctor = DOCTORS.find(d => d.id === doctorId);
    const service = SERVICES.find(s => s.id === serviceId);

    if (!doctor || !service) return [];

    // 1. Check Working Days
    if (!doctor.workingDays.includes(date.getDay())) {
        return []; // Doctor doesn't work this day
    }

    const slots: Slot[] = [];
    let currentTime = setMinutes(setHours(date, doctor.startHour), 0);
    const endTime = setMinutes(setHours(date, doctor.endHour), 0);

    // Interval for checking slots (e.g. every 30 mins)
    const interval = 30;

    while (isBefore(currentTime, endTime)) {
        const slotEnd = addMinutes(currentTime, service.durationMinutes);

        // 2. Check if slot wraps past end time
        if (isAfter(slotEnd, endTime)) {
            break;
        }

        // 3. Check Conflicts against Existing Bookings
        const isConflict = EXISTING_BOOKINGS.some(booking => {
            if (booking.doctorId !== doctorId) return false;

            // Simple overlap check
            const bookingEnd = addMinutes(booking.start, booking.duration);
            return (
                (isBefore(currentTime, bookingEnd) && isAfter(slotEnd, booking.start)) ||
                (currentTime.getTime() === booking.start.getTime())
            );
        });

        // 4. Check if time is in the past (for today)
        const isPast = isBefore(currentTime, new Date());

        if (!isConflict && !isPast) {
            slots.push({ time: new Date(currentTime), available: true });
        }

        currentTime = addMinutes(currentTime, interval);
    }

    return slots;
}
