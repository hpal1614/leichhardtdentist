import type { ClinicianData } from "./clinician";
import drNickImg from "../assets/dr-nick.jpg";
import silvinaImg from "../assets/silvina.jpg";
import leahImg from "../assets/leah.jpg";

export const NICK: ClinicianData = {
  name: "Dr. Nick Kulkarni",
  role: "Principal Dentist",
  isPrincipal: true,
  qualifications:
    "BDS · GradDipClinDent (Oral Implants) · MSc Prosthodontics · Fellow ICOI",
  focus:
    "General and implant dentistry — from single-tooth implants to full-arch rehabilitation. Trains and mentors other dentists across Sydney and Australia through his training academy, First Implant.",
  bio: null,
  bioFallback: [
    "For more than 25 years, Dr Nick has been helping patients smile with confidence. When he isn't in the clinic, his world revolves around his family — a proud dad to two teenage daughters, which keeps him in touch with the busy rhythms, worries, and priorities of local Leichhardt families.",
    "He is passionate about health and fitness, staying active and disciplined outside of work because he believes a focused mind and healthy body are essential to delivering precise surgical care. To the wider Australian dental community, Dr Nick is an experienced mentor — through his training academy, First Implant, he regularly teaches fellow clinicians advanced implant placement and sedation techniques.",
    "Dr Nick is dedicated to creating a calm, gentle atmosphere where you are never rushed, your concerns are heard, and treatment is explained in plain English. He walks you through your 3D digital scans so you can make informed decisions at your own pace, and he never pushes a treatment.",
    "He cares deeply about the integrity of his work. Every crown, bridge, and implant tooth he places is custom-made locally in Sydney by master technicians — no lab work is sent overseas. His training spans over 25 years of clinical practice (international and Sydney), a Graduate Diploma in Clinical Dentistry (Oral Implants) from the University of Sydney, a Master of Science in Prosthodontics, a Fellowship of the International Congress of Oral Implantologists (ICOI), and advanced surgical residencies at the Misch Implant Institute (USA) and Walpole Institute (UK).",
  ],
  quote:
    "Dentistry isn't a one-size-fits-all conveyor belt. For over 25 years, my approach has always started the same way: by sitting down, listening to your story, and figuring out what is truly best for your life and health.",
  portrait: drNickImg,
  order: 1,
};

export const SILVINA: ClinicianData = {
  name: "Dr. Silvina Cabrerizo",
  role: "General Dentist & Restorative Dentistry",
  isPrincipal: false,
  qualifications: "BDS (National University of Cordoba, 2001)",
  focus:
    "Over 20 years in Argentina, New Zealand, and Australia. Particular interest in prosthetic dentistry, occlusion, and full-mouth rehabilitation. Known for a warm, considered manner with anxious patients.",
  bio: null,
  bioFallback: [
    "Dr Silvina has been practising dentistry for more than two decades. Her international journey began in her native Argentina, where she graduated from the National University of Cordoba in 2001 and ran her own private practice for ten years. Before making Sydney her permanent home in 2017, she spent several years providing dental care to communities in New Zealand.",
    "This rich, global background gives her a deep understanding of people from all walks of life — she connects with patients on a genuinely human level. She is known for her warm, compassionate clinical manner, and is particularly well suited to patients who feel anxious about visiting the dentist. She walks you through every step at a pace that keeps you relaxed.",
    "Dr Silvina has a passion for the craftsmanship of prosthetic dentistry. She has undertaken extensive postgraduate education in advanced prosthetic dentistry, occlusion, and full-mouth rehabilitation. She blends precise technique with conservative restorative principles to rebuild function and a natural-looking smile. She also places a strong focus on patient education, explaining the evidence-based link between a healthy mouth and overall systemic health.",
    "In keeping with the rest of the team, every crown, bridge, or ceramic restoration she designs is fabricated locally in Sydney by master dental technicians. Outside the clinic she's an avid reader, a traveller, and someone who values quality time with her loved ones.",
  ],
  quote:
    "The true beauty of dentistry is its diversity. One day I am meticulously crafting a complex full-mouth rehabilitation, and the next, I am welcoming a child for their very first dental visit. My goal is always to ensure my patients feel safe, comfortable, and truly heard.",
  portrait: silvinaImg,
  order: 2,
};

export const LEAH: ClinicianData = {
  name: "Dr. Leah Morgan",
  role: "General Dentist & Trauma Care",
  isPrincipal: false,
  qualifications: "BDS (Hons), University of Sydney",
  focus:
    "Nearly 15 years across metropolitan and rural practice. Clinical educator at the University of Sydney; particular focus on endodontics, emergency dentistry, and dental trauma management.",
  bio: null,
  bioFallback: [
    "With nearly 15 years of clinical experience, Dr Leah graduated with Honours from the University of Sydney. Since then she has practised across metropolitan Sydney and rural Australian communities — a breadth that comes from working with very different patient populations.",
    "Beyond patient care, Dr Leah is a clinical educator. She tutors dental students at the University of Sydney and is an invited speaker at continuing-education conferences on emergency dentistry and dental trauma management. Those are her primary clinical passions — they also mean her own patients benefit from current, evidence-based protocols.",
    "Dr Leah believes that dentistry is not a one-size-fits-all conveyor belt. She enjoys building long-term relationships with patients, listening carefully to your concerns, answering questions in plain English, and helping you make informed choices. Her postgraduate training spans endodontics (root canals), crown and bridge restorations, and oral medicine. She is also a qualified basic life support teacher, so her clinical environment is held to rigorous safety standards.",
    "Outside the clinic, Dr Leah's world revolves around her family. As a mum to her baby girl, she understands the busy schedules, real-life budgets, and health priorities of local Leichhardt parents. To keep her mind and body focused, she loves nothing more than a family weekend of bushwalking and exploring the outdoors.",
  ],
  quote:
    "Being part of a family practice means earning your trust over a lifetime — from a child's very first check-up to a senior's ongoing care. My goal is to listen carefully, explain things clearly, and support your health journey in a space where you always feel safe.",
  portrait: leahImg,
  order: 3,
};

export const JIMMY: ClinicianData = {
  name: "Dr. Sagar (Jimmy) Rao",
  role: "Visiting General Dentist · Orthodontics & Airway",
  isPrincipal: false,
  qualifications: "Special Interest in Orthodontics & Airway Management",
  focus:
    "Visits monthly. Early interventive orthodontics, airway management, and Invisalign clear aligners — for children and adults.",
  bio: null,
  bioFallback: [
    "Known around the practice as Dr Jimmy, his approach to dentistry is defined by optimism and clear communication. Outside the clinic, he's an avid fitness enthusiast who believes staying active keeps his mind energised and sharp for the concentration required by intricate clinical procedures. When he isn't studying modern orthodontic movements, he's working out, following his favourite sports, or with his family.",
    "Dr Jimmy visits Leichhardt Dental Centre once a month. He is particularly passionate about Early Interventive Orthodontics — his philosophy is that the less time a patient spends in treatment, the better. By intervening early in a child's development, he focuses on three things: Airway Management (identifying breathing issues early to reduce the risk of sleep apnoea and related complications later in life), Functional Alignment (guiding jaw growth and tooth eruption to prevent more invasive treatment later), and Holistic Health (a functional bite and a healthy airway, not just a straight smile).",
    "For discreet teeth straightening, Dr Jimmy uses Invisalign clear-aligner technology. During monthly reviews he uses Invisalign's digital planning software and clear-tray system to track your progress and keep treatment on course. He believes in clinical transparency — using 3D scans to show you exactly how teeth can move, and explaining the biological reasoning behind every recommendation.",
  ],
  quote:
    "Orthodontics is about more than just a straight smile — it's about establishing a healthy foundation for a lifetime of better breathing and overall well-being.",
  portrait: null,
  order: 4,
};

export const ALL_CLINICIANS: ClinicianData[] = [NICK, SILVINA, LEAH, JIMMY];
