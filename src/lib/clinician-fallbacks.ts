import type { ClinicianData } from "./clinician";
import drNickImg from "../assets/dr-nick.jpg";

export const NICK: ClinicianData = {
  name: "Dr. Nick Kulkarni",
  role: "Principal Dentist",
  isPrincipal: true,
  qualifications: "BDS · GradDipClinDent (Oral Implants) · Fellow ICOI",
  focus:
    "General and implant dentistry — from single-tooth implants to full-arch rehabilitation. Trains and mentors other dentists across Sydney and northern NSW.",
  bio: null,
  bioFallback: [
    "Nick has been practising dentistry for over twenty years. His training began at the University of Sydney and continued through advanced implant programs at the Misch Implant Institute in Florida and the Walpole Institute in London. He holds a Fellowship from the International Congress of Oral Implantologists.",
    "Before settling in Leichhardt, Nick worked in India, Russia, Dubai, and Western Australia — an unusually broad path that shaped how he thinks about dentistry today. Alongside the practice, he serves as a visiting implant surgeon at clinics across Sydney and northern NSW, and is a key opinion leader who trains and mentors other dentists on implant protocols.",
    "He grew up in the Inner West. Coming back to Leichhardt to build his own practice was deliberate — a place where patients would find him for a long time, and where he could take as much time as each case needed.",
  ],
  quote:
    "I encourage my patients to ask plenty of questions about their dental health. It's your mouth — you should understand every option before anything is done.",
  portrait: drNickImg,
  order: 1,
};

export const SILVINA: ClinicianData = {
  name: "Dr. Silvina Cabrerizo",
  role: "Dentist",
  isPrincipal: false,
  qualifications: "BDS (Cordoba, 2001)",
  focus:
    "20+ years in Argentina, New Zealand, and Australia. Particular interest in prosthetic dentistry and full-mouth rehabilitation.",
  bio: null,
  bioFallback: [
    "Silvina trained in Cordoba, Argentina, and has practised across three countries over more than two decades. Her particular interest is prosthetic dentistry and full-mouth rehabilitation — complex cases that require patience, planning, and an eye for fine detail.",
  ],
  quote: "",
  portrait: null,
  order: 2,
};

export const LEAH: ClinicianData = {
  name: "Dr. Leah Morgan",
  role: "Dentist",
  isPrincipal: false,
  qualifications: "Bachelor of Dentistry (Honours) — University of Sydney",
  focus:
    "Clinical educator with a focus on endodontics, emergency dentistry, and dental trauma management.",
  bio: null,
  bioFallback: [
    "Leah graduated with Honours from the University of Sydney and works as a clinical educator alongside her practice work. She has a particular focus on endodontics, emergency presentations, and dental trauma management.",
  ],
  quote: "",
  portrait: null,
  order: 3,
};

export const ALL_CLINICIANS: ClinicianData[] = [NICK, SILVINA, LEAH];
