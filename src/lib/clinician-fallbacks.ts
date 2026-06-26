import type { ClinicianData } from "./clinician";
import drNickImg from "../assets/dr-nick.jpg";
import silvinaImg from "../assets/silvina.jpg";
import leahImg from "../assets/leah.jpg";
import drJimmyImg from "../assets/dr-jimmy.jpg";

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
    "For more than 25 years, Dr Nick has been helping patients smile with confidence. When he isn't in the clinic, his world revolves around his family. As a proud dad doting on his two teenage daughters, he understands the busy rhythms, worries, and needs of local Leichhardt families.",
    "He is passionate about health and fitness. He stays highly active and disciplined outside of work because he believes that a focused mind and healthy body are essential to delivering the highest level of surgical precision for his patients.",
    "To the wider Australian dental community, Dr Nick is a deeply respected teacher and mentor. Through his training academy, Place Your First Implant, he regularly teaches fellow clinicians advanced implant placement and sedation techniques. He is a continuous learner who constantly brings the latest evidence-based global standards back home to his patients.",
    "A Calm, Safe Space: Dr Nick knows that dental visits can feel overwhelming. Backed by over two decades of clinical experience, he is dedicated to creating a relaxed, gentle atmosphere where you are never rushed, your fears are validated, and you are truly heard. Tailored to Your Life: Dr Nick will never push a treatment on you. He takes the time to explain your options in plain, simple English, walking you through your 3D digital scans so you can make informed decisions at your own pace. Onshore Sydney Quality: Dr Nick cares deeply about the integrity of his work. He refuses to cut corners or send lab work overseas. Every single crown, bridge, and implant tooth he places is custom-made locally right here in Sydney by master technicians.",
    "Dr Nick has trained globally to bring world-class dental science to the inner west: over 25 years of clinical practice treating generations of families internationally and in Sydney; a Graduate Diploma in Clinical Dentistry (Oral Implants) from the University of Sydney; a Master of Science in Prosthodontics, specialising in tooth replacement; Fellow of the International Congress of Oral Implantologists (ICOI); and advanced surgical residencies at the Misch Implant Institute (USA) and Walpole Institute (UK).",
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
    "For more than two decades, Dr Silvina has been dedicating her life to the art and science of healthy smiles. Her international dental journey began in her native Argentina, where she graduated from the National University of Cordoba in 2001 and successfully operated her own private practice for ten years. Before making Sydney her permanent home in 2017, she also spent several years providing trusted dental care to communities in New Zealand. This rich, global background gives her a deep understanding of people from all walks of life, allowing her to connect with patients on a truly human level.",
    "A Gentle Haven for Nervous Patients: If dental visits make you anxious, you are in safe hands. Dr Silvina is widely recognized for her exceptionally kind, warm, and compassionate clinical nature. She takes the time to listen to your concerns, gently walking you through every step of your care at a pace that keeps you completely relaxed.",
    "The Craftsmanship of Prosthetic Dentistry: Dr Silvina has a profound passion for the intricate detail and craftsmanship involved in rebuilding smiles. She has undertaken extensive postgraduate education in advanced fields, including prosthetic dentistry, occlusion, and full-mouth rehabilitations. She loves blending precision science with conservative techniques to restore both the perfect function and natural beauty of your teeth.",
    "Educator for Lifelong Health: She believes a great dentist doesn't just fix problems—they prevent them. Dr Silvina places a massive focus on patient education, explaining the evidence-based link between a healthy mouth and your body's overall well-being so you can make informed choices. Just like the rest of our team, she ensures that every crown, bridge, or ceramic restoration she designs is crafted right here locally in Sydney by master dental technicians.",
    "When she steps away from the chair, Dr Silvina believes in embracing life's simple pleasures. She is an avid reader who loves getting lost in a great book, exploring new travel destinations, and spending meaningful, relaxed quality time bonding with her loved ones.",
  ],
  quote:
    "The true beauty of dentistry is its diversity. One day I am meticulously crafting a complex full-mouth rehabilitation, and the next, I am welcoming a child for their very first dental visit. No matter the treatment, my goal is always to ensure my patients feel completely safe, comfortable, and truly heard.",
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
    "With nearly 15 years of diverse clinical experience, Dr Leah graduated with Honours from the University of Sydney. Since then, she has dedicated her career to providing exceptional care across both metropolitan Sydney and rural Australian communities. Beyond treating patients, Dr Leah is a passionate clinical educator. She regularly tutors upcoming dental students at the University of Sydney and is an invited speaker at continuing education conferences. She literally lectures the profession on emergency dentistry and dental trauma management, ensuring her own patients always receive the highest, most up-to-date evidence-based treatments.",
    "A Calm Hand in Dental Emergencies: Accidents happen, and dental trauma can be deeply distressing. Because acute emergency dentistry and trauma management are Dr Leah's absolute biggest passions, she is uniquely skilled at turning a high-stress dental emergency into a calm, gentle, and completely reassuring experience.",
    "The Power of Lifelong Continuity: Dr Leah fundamentally believes that dentistry is not a one-size-fits-all conveyor belt. She loves building genuine, long-term bonds with her patients. She takes the time to listen to your unique concerns, answer your questions in plain English, and empower you to make highly informed choices about your health goals.",
    "Comprehensive Family Expertise: Dr Leah has completed extensive postgraduate training across endodontics (root canals), crown and bridge restorations, and oral medicine. She is also a qualified basic life support teacher, meaning her clinical environment holds the highest possible standards for patient safety and well-being. In alignment with our practice philosophy, every crown, bridge, and customized preventative appliance she prescribes is custom-fabricated locally right here in Sydney, guaranteeing optimal material safety and a perfect structural fit.",
    "When she steps away from the dental chair, Dr Leah's world completely revolves around her family. As a proud mum to her beautiful baby girl, she deeply understands the busy schedules, real-life budgets, and health anxieties of local Leichhardt parents. To keep her own mind and body focused, she loves nothing more than packing up for a family weekend of bushwalking, exploring the outdoors, and enjoying nature.",
  ],
  quote:
    "Being part of a family practice means gaining your trust over a lifetime—from a child's very first check-up to a senior's ongoing care. My goal is to listen carefully, explain things clearly, and support your health journey in a space where you always feel completely safe.",
  portrait: leahImg,
  order: 3,
};

export const JIMMY: ClinicianData = {
  name: "Dr. Sagar (Jimmy) Rao",
  role: "Visiting General Dentist · Orthodontics & Airway",
  isPrincipal: false,
  qualifications:
    "BDS (2002) · Postgraduate focus in Orthodontics · Languages: English, Hindi, Russian",
  focus:
    "Visits monthly. Early interventive orthodontics, paediatric airway screening, adult sleep and snoring care, and Invisalign clear aligners — for children and adults.",
  bio: null,
  bioFallback: [
    "Known warmly around the practice as Dr Jimmy, his approach to dentistry is defined by optimism and clear communication. Outside the clinic, his lifestyle is centred around health and personal vitality. He is an avid fitness enthusiast who believes that staying physically active keeps his mind energized and sharp allowing him to maintain the peak concentration required for intricate clinical procedures. When he isn't studying modern orthodontic movements, he is usually working out, following his favorite sports, or unwinding with his family.",
    "Since graduating with a Bachelor of Dental Surgery in 2002, Dr Jimmy has pursued expansive international training, including a rigorous two-year postgraduate focus on orthodontics. He validated his Australian dental registration in 2012 and has spent over a decade practicing extensively across NSW. To ensure our patients have access to tailored alignment care, Dr Jimmy visits Leichhardt Dental Centre once a month.",
    "He is particularly passionate about Early Interventive Orthodontics. Dr Jimmy's philosophy is simple: the less time a patient spends in treatment, the better. By intervening early in a child's development, he focuses on Airway Management—identifying breathing issues early to help reduce the risks of sleep apnoea and other health complications in later life; Functional Alignment—guiding jaw growth and tooth eruption to prevent more invasive and lengthy treatments during the teenage years; and Holistic Health—ensuring your child doesn't just have a straight smile, but a functional bite and a healthy airway.",
    "A Light-Hearted, Friendly Space: Dr Jimmy understands that dental visits can feel daunting for children and adults alike. He keeps his surgery bright, welcoming, and conversational, ensuring everyone feels heard and completely safe. Leading Technology: For those seeking discrete teeth straightening, Dr Jimmy utilizes Invisalign® technology. During your monthly review, he leverages their world-class digital planning software and internationally manufactured clear tray systems to track your progress and keep your treatment on path. Honest, Plain-English Advice: Dr Jimmy believes in clinical transparency. He uses 3D scans to show you exactly how teeth can move, explains the biological \"why\" behind his recommendations, and empowers you to make informed decisions for your family's health.",
  ],
  quote:
    "Orthodontics is about more than just a straight smile — it's about establishing a healthy foundation for a lifetime of better breathing and overall well-being.",
  portrait: drJimmyImg,
  order: 4,
};

export const ALL_CLINICIANS: ClinicianData[] = [NICK, SILVINA, LEAH, JIMMY];
