import type { PillarData } from "./pillar";

import clinic1 from "../assets/clinic-1.jpg";
import clinic2 from "../assets/clinic-2.webp";
import clinic3 from "../assets/clinic-3.webp";
import philosophyImg from "../assets/philosophy.jpg";

// Pexels — free for commercial use, no attribution required.
// All hand-picked: dental tools / lab / clinical close-ups, NO recognisable
// patient faces. Replace with real practice photography when commissioned.
const PX = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const IMG = {
  toolsBlue: PX(4946338),         // tools on blue surface
  toolsColorful: PX(4297522),     // colourful dental tools on white
  equipmentClose: PX(6627724),    // dental equipment on blue background
  toolsTray: PX(17112256),        // tools on a sterile tray
  instrumentsSteel: PX(6812483),  // stainless steel instruments
  toolsBlueClotn: PX(4270969),    // tools on blue cloth
  jawModel: PX(16309612),         // gloved hand holding jaw model
  glovedEquipment: PX(6627662),   // gloved hands operating equipment
  dentureFitting: PX(6502631),    // denture being fitted
  technicianMaking: PX(13085186), // technician making clear aligner
  implantMaking: PX(7788493),     // unrecognisable dentist making implant
  dentalModel: PX(6502634),       // dental model with equipment
  modelEquipment: PX(6502633),    // dental model with lab equipment
};

export const GENERAL_DENTISTRY: PillarData = {
  number: "01",
  title: "General Dentistry.",
  slug: "general-dentistry",
  tagline: "Everyday care for a healthy mouth.",
  shortDescription:
    "Routine care that prevents small problems from becoming big ones. Gentle, thorough, and built around you.",
  intro:
    "Everything you need for a healthy smile — from routine check-ups and cleans to fillings, bridges, and root canal care — delivered personally by Dr. Nick with patience, skill, and the time it takes to do things properly.",
  image: clinic1,
  bentoSpan: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  bentoAspect: "aspect-[4/5] md:aspect-[16/9] lg:aspect-auto",
  subTreatments: [
    {
      id: "checkup",
      slug: "check-up-and-clean",
      imageUrl: IMG.toolsBlue,
      name: "Check-up & Clean",
      description:
        "Every six months. A careful examination, professional scale and polish, oral cancer screening, and X-rays where clinically indicated. Preventive care is the single highest-value thing we do.",
      longDescription:
        "A dental check-up is the most important 45 minutes you can give your mouth every six months. We examine your teeth, gums, bite, and soft tissues; take X-rays when clinically indicated; perform a professional scale and polish to remove plaque and tartar; and screen for early signs of decay, gum disease, and oral cancer. Nothing about this appointment is rushed — we take the time to find small problems before they become painful ones.",
      whatToExpect: [
        "Full visual and tactile examination",
        "X-rays if indicated (low-dose digital)",
        "Professional scale and polish",
        "Oral cancer screening",
        "Personalised oral hygiene advice",
      ],
      risksContent:
        "Routine cleaning occasionally causes transient sensitivity, particularly around areas of gum recession. If X-rays are needed, we use low-dose digital systems.",
    },
    {
      id: "fillings",
      slug: "dental-fillings",
      imageUrl: IMG.equipmentClose,
      name: "Dental Fillings",
      description:
        "Amalgam-free composite fillings using 3M ESPE and Ivoclar premium materials — designed to blend naturally with your tooth and bonded in a single visit.",
      longDescription:
        "We are a proudly amalgam-free practice — no silver-mercury fillings. Instead, we exclusively use BPA-safe composite resins from 3M ESPE and Ivoclar — premium materials that preserve more of your natural tooth structure and are designed to mimic the strength and light-reflection of natural enamel. Composite is layered and bonded directly to the remaining tooth, then cured with a curing light. Shade-matching uses what's sometimes called the \"chameleon effect\" — the filling blends with your tooth's unique shade rather than looking like a flat white patch. Most fillings are completed in a single 30–45 minute appointment under local anaesthetic.",
      whatToExpect: [
        "Amalgam-free, BPA-safe composites (3M ESPE / Ivoclar)",
        "Local anaesthetic for comfort",
        "Composite layered and shade-matched to your tooth",
        "Polished, cured, and adjusted to your bite",
        "Usually 30–45 minutes per tooth",
      ],
      pricing: [
        { name: "Small · single-surface", price: "$200", description: "For minor decay or a small chip on the biting surface." },
        { name: "Medium · two-surface", price: "$280–$360", description: "When decay has spread between two teeth." },
        { name: "Large · complex", price: "Up to $490", description: "Significant structural repair across multiple surfaces of the tooth." },
      ],
      risksContent:
        "Post-operative sensitivity for a few days is common, particularly with deeper fillings. Rarely, a tooth with extensive decay may later need root canal treatment if the nerve is affected. If more than ~50% of the tooth structure is missing or weakened, a CEREC same-day crown or onlay may be a better long-term option than a large filling — we'll talk through both at consultation.",
      faqs: [
        {
          q: "How long does a filling take?",
          a: "Most fillings are completed in a single 30–45 minute appointment. Because we use high-performance curing lights, the filling hardens instantly and you can eat on it almost immediately.",
        },
        {
          q: "What's the difference between a large filling and a CEREC crown or onlay?",
          a: "A filling is an affordable way to repair a tooth. However, if more than ~50% of the tooth is missing or weakened, our evidence-based advice may be to consider a same-day CEREC crown or ceramic onlay instead — these provide structural reinforcement and reduce the risk of fracture under heavy chewing.",
        },
        {
          q: "Can I claim this on my health fund?",
          a: "Yes. We process HICAPS on the spot. Most fillings use item codes 521 through 535. Because we provide upfront pricing, you can check your exact gap payment with your provider before treatment.",
        },
      ],
    },
    {
      id: "bridges",
      slug: "dental-bridges",
      imageUrl: IMG.dentalModel,
      name: "Dental Bridges",
      description:
        "A fixed, custom-made prosthesis that spans a gap where one or more teeth are missing. CEREC same-day option available — no two-week wait or messy putty impressions.",
      longDescription:
        "A dental bridge replaces one or more missing teeth with a custom-made prosthesis fixed to the teeth either side of the gap. It restores the ability to chew, prevents neighbouring teeth from drifting, and blends with your natural smile. With our in-house CEREC digital workflow, in many cases we can scan your mouth, design the bridge, and mill it from a solid block of porcelain in a single visit — no putty impressions, no temporary bridge, no two-week wait. Bridges can be a strong choice when implants aren't suitable — but we always discuss both options at consultation. Typical investment: $5,000–$7,000 for a single-tooth or short bridge, with flexible payment plans from approximately $45/week.",
      whatToExpect: [
        "Often completed same-day via CEREC (no temporary)",
        "Neighbouring teeth shaped to receive crowns",
        "Digital 3D scan — no putty impressions",
        "Bridge milled chairside from a solid porcelain block",
        "From $5,000; weekly payment options available",
      ],
      risksContent:
        "Preparation of neighbouring teeth is permanent — the shape cannot be undone. Bridges are durable but not lifetime devices; expect to need replacement or adjustment over 10–15 years depending on hygiene and bite forces. Where implants are clinically suitable they may offer better long-term jawbone preservation — we'll cover both options honestly at consultation.",
      faqs: [
        {
          q: "What's the difference between a dental bridge and an implant?",
          a: "A bridge uses adjacent teeth for support and requires shaping those teeth to receive crowns. An implant is an independent titanium root placed directly into the jawbone, preserving the surrounding teeth. Bridges are faster; implants generally preserve more bone over the long term.",
        },
        {
          q: "Is a bridge or an implant better for me?",
          a: "It depends on your situation. Implants are often preferred for long-term jawbone preservation, but bridges are an excellent solution if the adjacent teeth already need crowns, or where surgery isn't suitable. We'll talk through both at consultation.",
        },
        {
          q: "How much does a dental bridge cost?",
          a: "Typically $5,000–$7,000 for a standard single-tooth or short bridge in Sydney, depending on the number of units and materials. We provide a complete itemised quote at consultation, with flexible payment plans from approximately $45/week.",
        },
        {
          q: "Can I get a dental bridge made on the same day?",
          a: "In many cases, yes. Our in-house CEREC digital scanner and milling machine can scan, design, and mill your custom porcelain bridge chairside — eliminating temporary bridges and a second appointment two weeks later.",
        },
        {
          q: "Does private health insurance cover dental bridges?",
          a: "Dental bridges fall under Major Dental coverage on most extras policies. We process HICAPS on the spot so you can claim your health-fund rebate instantly and only pay the remaining gap. Standard item codes are 615 (for the pontic) and two counts of 613 or 618 (for the retaining crowns).",
        },
        {
          q: "Do you offer payment plans?",
          a: "Yes — flexible interest-free payment plans are available so you can spread the cost over weekly or fortnightly instalments. We can show you the options at consultation.",
        },
      ],
    },
    {
      id: "wisdom",
      slug: "wisdom-teeth",
      imageUrl: IMG.toolsTray,
      name: "Wisdom Teeth",
      description:
        "Assessment and removal when impaction, crowding, or recurrent infection call for it. Not every wisdom tooth needs to come out — a careful review comes first.",
      longDescription:
        "Not every wisdom tooth needs to be removed. We assess each tooth on its own merits — position, angulation, whether it's contributing to crowding, and whether you've had recurrent infection. If removal is indicated, we perform straightforward extractions in the chair under local anaesthetic; more complex cases (deeply impacted lower wisdom teeth, for example) are referred to a specialist oral surgeon.",
      whatToExpect: [
        "3D imaging if teeth are impacted or near the nerve",
        "Local anaesthetic for straightforward cases",
        "Post-op instructions and follow-up",
        "Typical healing: 1–2 weeks",
      ],
      risksContent:
        "Wisdom tooth removal carries risks of swelling, bleeding, transient nerve sensitivity (particularly for lower teeth close to the mandibular nerve), and dry socket. Your consultation will cover what specifically applies to your case.",
    },
    {
      id: "root-canal",
      slug: "root-canal-treatment",
      imageUrl: IMG.instrumentsSteel,
      name: "Root Canal Treatment",
      description:
        "When infection reaches the nerve of a tooth, root canal treatment removes the infection and preserves the tooth. Performed with rubber-dam isolation, rotary instrumentation, and CBCT 3D planning.",
      longDescription:
        "When decay or trauma reaches the pulp (nerve) of a tooth, the tooth can usually still be saved with root canal treatment. The infected pulp is carefully removed, the canals are cleaned and shaped, and the space is sealed with a biocompatible filling material. A crown is typically placed afterwards to protect the tooth long-term. Modern techniques — flexible nickel-titanium rotary files, rubber-dam isolation for sterility, and 3D CBCT scans to map the canal anatomy in advance — make the procedure considerably more predictable and comfortable than its reputation suggests. Most patients describe the procedure as no different to having a standard filling. Typical investment: $1,200–$1,800 depending on complexity. We aim to keep the complete Root Canal + CEREC Crown package below $4,000 — the rationale being that if saving your natural tooth costs more than replacing it with an implant, a different conversation is needed.",
      whatToExpect: [
        "Usually 1–2 appointments of 60–90 minutes",
        "Local anaesthetic throughout",
        "Rubber dam placed for sterility",
        "Modern rotary instrumentation",
        "3D CBCT scan for complex/molar cases",
        "Same-day CEREC crown afterwards for protection",
      ],
      pricing: [
        { name: "Root canal", price: "$1,200–$1,800", description: "Front teeth (single canal) sit at the lower end; back molars (3–4 canals) are more involved." },
        { name: "Root canal + same-day crown", price: "$3,600–$3,950", description: "Our all-in package to save the tooth — 3D scan, treatment, and a CEREC crown, kept below $4,000." },
      ],
      processSteps: [
        { title: "Diagnosis & 3D scan", description: "We confirm the infection with examination and (where the tooth is complex) a 3D CBCT scan that maps every canal before we begin — so the treatment plan and quote are fixed, not estimated." },
        { title: "Visit 1 — clean & disinfect", description: "Local anaesthetic, rubber dam isolation, and removal of the infected pulp. The canals are cleaned and shaped with rotary instruments. This visit relieves the pain caused by the infection." },
        { title: "Visit 2 — seal", description: "Once the canals are clean and the tooth is comfortable, the space is sealed with a biocompatible filling material." },
        { title: "Crown protection", description: "A same-day CEREC crown is typically placed to protect the tooth long-term — root-treated teeth are more brittle and benefit from full coverage." },
      ],
      risksContent:
        "Modern root canal treatment is generally safe and well-tolerated. Documented success rates are high but not absolute — complex cases, re-treatments, or unusual anatomy may be referred to an endodontic specialist. A tooth that has had root canal treatment is more brittle and benefits from a protective crown to reduce the risk of fracture.",
      faqs: [
        {
          q: "Does a root canal hurt?",
          a: "Modern local anaesthetics and precise rotary techniques mean the procedure typically feels no different to having a standard filling. The treatment relieves the severe pain caused by the infected nerve — most patients are relieved to start.",
        },
        {
          q: "Why use a rubber dam?",
          a: "A rubber dam is a thin protective sheet placed over the tooth being treated. It isolates the tooth, keeps it dry and free from saliva bacteria, and protects your throat and tongue. It's considered the standard of care for root canal treatment.",
        },
        {
          q: "Why do you sometimes recommend a 3D CBCT scan?",
          a: "Traditional 2D X-rays can hide overlapping structures. Complex teeth — especially back molars — can have hidden or microscopic canals that 2D imaging misses. A 3D CBCT scan maps every canal before treatment, helping ensure the full infection is cleaned out and significantly improving long-term success.",
        },
        {
          q: "How many appointments will I need?",
          a: "Most root canal treatments are completed across two visits. The first removes the infection and relieves the pain. The second seals the canals once the tooth is fully comfortable.",
        },
        {
          q: "Do I need a crown after a root canal?",
          a: "In almost all cases, yes. The tooth becomes more brittle once the nerve is removed. A tooth-coloured crown protects the tooth from fracture; with our in-house CEREC technology we can usually design and fit it in a single visit.",
        },
        {
          q: "How much does a root canal cost?",
          a: "Typically $1,200–$1,800 depending on the complexity of the tooth (front teeth with a single canal sit at the lower end; molars with three or four canals are more involved). We use the 3D CBCT scan during your consultation to give you a fixed, itemised quote before treatment begins.",
        },
        {
          q: "What if I don't have a root canal?",
          a: "An untreated nerve infection won't resolve on its own. The bacteria will eventually destroy the surrounding jawbone and cause severe swelling. The alternative at that stage is removing the tooth — which usually means more expensive implant or bridge work to fix later.",
        },
      ],
    },
    {
      id: "family",
      slug: "preventative-and-family-dentistry",
      imageUrl: IMG.toolsColorful,
      name: "Preventative & Family Dentistry",
      description:
        "Care for patients of all ages, including children. Mouthguards for sport, occlusal splints for grinding, early orthodontic screening, fissure sealants.",
      longDescription:
        "We see the whole family — from a child's first check-up to a grandparent's maintenance appointment. For children: gentle first visits, fissure sealants, and early orthodontic screening. For adults: custom mouthguards for contact sport, occlusal splints for grinding, and proactive care that catches issues early. Eligible children may be covered under the Child Dental Benefits Schedule.",
      whatToExpect: [
        "Age-appropriate appointments — slower pace for kids",
        "Custom-made mouthguards and splints",
        "Early orthodontic assessment from age 7",
        "Bulk-billed CDBS where eligible",
      ],
      risksContent:
        "Preventative care carries minimal risk. We use low-dose digital imaging and take additional precautions for paediatric patients.",
    },
  ],
  processSteps: [
    {
      title: "Consultation & examination",
      description:
        "We begin with a conversation about what you're noticing and what you want from your teeth long-term. A clinical examination and any imaging needed follows.",
    },
    {
      title: "Findings & plan",
      description:
        "Dr. Nick walks you through what he sees, what's urgent, what's optional, and what can wait. No surprises, no pressure — just a clear picture and your options.",
    },
    {
      title: "Treatment",
      description:
        "Appointments scheduled around your life. Everything explained as we go. Time taken to do the work properly.",
    },
    {
      title: "Maintenance",
      description:
        "Regular check-ups keep small problems small. We'll agree on a recall interval that makes sense for your mouth.",
    },
  ],
  risksContent:
    "Routine dental procedures are generally safe but carry individual risks — including transient sensitivity after cleaning, post-operative discomfort after fillings or extractions, and, rarely, complications specific to your clinical situation. Your consultation will cover what applies to you.",
  faqs: [
    {
      q: "How often should I see a dentist?",
      a: "For most adults, every six months. Some patients with higher risk need more frequent visits; others with stable oral health can extend the interval. We'll recommend what suits you.",
    },
    {
      q: "I haven't been to the dentist in years — should I be worried?",
      a: "You're not alone, and you won't be judged. Many of our patients come back after long breaks. We start with an honest assessment and build a plan from there at a pace that works for you.",
    },
    {
      q: "Do you see children?",
      a: "Yes. We provide paediatric check-ups, fissure sealants, and early orthodontic screening. Eligible children may be covered under the Child Dental Benefits Schedule.",
    },
    {
      q: "What happens in a check-up?",
      a: "A full examination of your teeth, gums, bite and soft tissues; a professional scale and polish; X-rays if clinically indicated; and a conversation about anything you've noticed. Usually 30–45 minutes.",
    },
    {
      q: "I'm nervous about the dentist — what can you do?",
      a: "Tell us. We take longer appointments for anxious patients, explain everything before we do it, and stop whenever you need us to. For some procedures, sedation options are available.",
    },
  ],
  ctaHeadline: "Due for a check-up? Let's get you in.",
  ctaSubhead: "Whether it's been six months or six years, we'll make coming back easy.",
};

export const DENTAL_IMPLANTS: PillarData = {
  number: "02",
  title: "Dental Implants.",
  slug: "dental-implants",
  tagline: "Replacing teeth, the way nature intended.",
  shortDescription:
    "Titanium roots that restore function and structure — from a single tooth to a full arch. Planned with in-house 3D CBCT, EthOss synthetic bone grafting where needed, and zirconia crowns made locally in Sydney.",
  intro:
    "A dental implant is a small titanium post that replaces the root of a missing tooth. It fuses with the surrounding jawbone, giving a stable foundation for a custom crown, bridge, or full arch of teeth. Every implant case at Leichhardt Dental is planned and placed by Dr. Nick Kulkarni — a registered specialist prosthodontist with 25+ years of international clinical experience and a Fellow of the International Congress of Oral Implantologists. Our implant approach rests on three pillars: in-house 3D CBCT imaging for sub-millimetre accuracy; EthOss synthetic bone regeneration (no animal or donor tissue) where grafting is needed; and zirconia crowns custom-milled locally in Sydney — no overseas lab work. Flexible payment plans are available through TLC Finance.",
  image: clinic2,
  bentoSpan: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  bentoAspect: "aspect-[4/5] md:aspect-[5/4]",
  subTreatments: [
    {
      id: "single",
      slug: "single-tooth-implants",
      imageUrl: IMG.implantMaking,
      name: "Single Tooth Implants",
      description:
        "A titanium post placed where the tooth root used to be, topped with a zirconia crown made locally in Sydney. Teeth either side are left untouched — unlike a bridge.",
      longDescription:
        "A single-tooth implant replaces one missing tooth with a titanium post placed directly into the jawbone, topped with a custom zirconia crown. Unlike a bridge, the neighbouring teeth are untouched. Once healed, the implant behaves like a natural tooth — you brush, floss, and eat with it as normal. At Leichhardt Dental every implant is planned with an in-house 3D CBCT scan, placed by Dr. Nick under local anaesthetic, and finished with a custom zirconia crown milled by local Sydney master technicians (no overseas lab work). Where the bone needs reinforcement, we use EthOss — a synthetic biomaterial with no animal or donor tissue. Typical investment: $5,000–$6,500+ for a complete single-implant case (3D scan, implant placement, abutment, and zirconia crown). Flexible payment plans available through TLC Finance — manageable weekly or fortnightly instalments.",
      whatToExpect: [
        "Low-dose 3D CT scan for precise planning",
        "Implant placed under local anaesthetic",
        "3–6 months for bone to fuse (osseointegration)",
        "Custom crown bonded to the implant",
      ],
      processSteps: [
        { title: "Consultation & 3D scan", description: "Review your bone, bite, and medical history; plan the position digitally." },
        { title: "Implant placement", description: "Minor surgical procedure under local anaesthetic. Home the same day." },
        { title: "Healing (3–6 months)", description: "Bone fuses to the implant. A temporary tooth is often worn during this phase." },
        { title: "Final crown", description: "Custom-made and shade-matched, bonded to the implant." },
      ],
      risksContent:
        "Implant surgery is generally safe and well-established. Risks include infection, swelling, transient nerve sensitivity, and — rarely — implant failure where the bone does not fuse with the titanium.",
    },
    {
      id: "overdentures",
      slug: "implant-supported-overdentures",
      imageUrl: IMG.dentureFitting,
      name: "Implant-Supported Overdentures",
      description:
        "A denture that snaps onto two or more implants rather than resting on the gums. Far more stable than a conventional denture; still removable for daily cleaning.",
      longDescription:
        "An implant-supported overdenture is a contemporary restoration that \"snaps\" onto dental implants rather than resting on the gums. For patients seeking a more stable alternative to a conventional denture — without the full investment of a fixed bridge — it offers an evidence-based middle-ground option. Typically two implants are placed in the lower jaw; these act as secure anchors that the denture clips onto with hidden attachments, providing significantly better retention than a conventional denture. A typical case involving two implants, the custom denture, and all necessary clinical work is approximately $12,000. Many patients use an overdenture as a stop-gap before later considering a fully fixed full-arch option such as All-on-4.",
      whatToExpect: [
        "Typically 2 implants placed in the lower jaw",
        "Denture \"snaps\" securely onto the implants",
        "Stable retention for chewing, speaking, and laughing",
        "Removable — taken out daily for cleaning",
        "Not worn while sleeping",
        "Approximately $12,000 for a typical 2-implant case",
      ],
      processSteps: [
        { title: "Consultation & 3D scan", description: "Dr. Nick reviews your medical and dental history and takes a low-dose 3D CT scan to assess bone volume and plan implant position." },
        { title: "Implant placement", description: "Two implants are typically placed in the lower jaw under local anaesthetic. You go home the same day." },
        { title: "Healing (3–6 months)", description: "The titanium implants fuse with the jawbone (osseointegration). A temporary denture can be worn during this phase." },
        { title: "Denture fitting", description: "Once healed, your custom overdenture is fitted with internal attachments that \"snap\" onto the implants. We adjust until it feels comfortable and stable." },
        { title: "Ongoing maintenance", description: "The small internal clips that provide the \"snap\" wear naturally and are replaced every few years at a routine appointment." },
      ],
      risksContent:
        "Implant-supported overdentures use the same implant surgery as other implant treatments, with risks including infection, bleeding, swelling, transient nerve sensitivity, and — rarely — implant failure. Because the overdenture remains a removable device, it must be taken out daily for cleaning and should not be worn while sleeping. The small internal attachments that provide the \"snap\" will wear over time and typically need a quick professional replacement every few years.",
      faqs: [
        {
          q: "How much does an implant-supported overdenture cost?",
          a: "A typical case involving two implants, the custom denture, and all necessary clinical work is approximately $12,000. We provide a detailed written quote at your consultation, tailored to your specific clinical situation.",
        },
        {
          q: "How is this different from a regular denture?",
          a: "A regular denture rests on your gums and can slip or shift while you eat or speak. An implant-supported overdenture snaps onto implants placed in your jaw, providing far better retention and stability.",
        },
        {
          q: "How is this different from All-on-4?",
          a: "All-on-4 uses four or more implants to support a fixed full arch of teeth that you don't take out. An overdenture uses fewer implants (typically two) and is removable for cleaning. Many patients use an overdenture as a stop-gap before later considering All-on-4.",
        },
        {
          q: "How often do the clips need to be replaced?",
          a: "Every few years on average, depending on use. It's a quick professional replacement at a routine maintenance appointment.",
        },
        {
          q: "Can I sleep with my overdenture in?",
          a: "No — it should be taken out at night for cleaning and to give your gums a rest. This is important for long-term oral health.",
        },
      ],
    },
    {
      id: "all-on-4",
      slug: "all-on-4-implants",
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/all-on-4/before-and-after/case-2.jpg",
      name: "All-on-4 Implants",
      description:
        "A fixed full arch of teeth supported by four or more implants per jaw. For patients missing most or all of their teeth, or whose current teeth cannot be saved.",
      longDescription:
        "All-on-4 is a full-arch rehabilitation technique where four (sometimes more) implants support a fixed set of teeth per jaw. The surgical and provisional stages are often done the same day — patients go home from surgery with a temporary fixed set of teeth, not dentures. After 3–6 months of healing, the temporary is replaced with a final, high-strength prosthesis. The approach is widely documented — the process below follows protocols established by institutes like the Sydney Implant Institute.",
      whatToExpect: [
        "3D CT planning and digital smile design before any surgery",
        "Four implants per arch placed under sedation or GA",
        "Same-day fixed provisional teeth",
        "3–6 months healing, then final prosthesis",
      ],
      processSteps: [
        { title: "Consultation & 3D CT imaging", description: "A full assessment of your bone, bite, and medical history. The CT scan determines whether All-on-4 is the right option for you." },
        { title: "Digital smile & surgical planning", description: "We design the final set of teeth digitally, then plan the four implant positions around that design." },
        { title: "Implant surgery", description: "Four implants placed per arch in a single surgical visit, typically under sedation or GA for comfort." },
        { title: "Same-day provisional teeth", description: "A fixed set of temporary teeth is attached to the implants on the day of surgery." },
        { title: "Healing period (3–6 months)", description: "Implants bond with bone. You wear the provisional teeth and return for routine reviews." },
        { title: "Final prosthesis", description: "Once healed, the provisional is replaced with your final fixed prosthesis — crafted for longevity, aesthetics, and function." },
      ],
      risksContent:
        "All-on-4 is a major procedure. Risks include standard surgical complications (bleeding, swelling, infection, transient nerve sensitivity, sinus involvement in the upper jaw) plus the possibility of individual implant failure — a replacement implant may be required. Long-term success depends on hygiene, general health, and regular maintenance visits.",
    },
  ],
  processSteps: [
    {
      title: "Consultation & 3D imaging",
      description:
        "Dr. Nick reviews your medical and dental history and takes a low-dose 3D CT scan. This lets us see the bone volume, nerve position, and exact space available — no guesswork.",
    },
    {
      title: "Digital surgical planning",
      description:
        "Using the CT data, we plan the implant position on screen before touching a scalpel. Safer, more predictable, and more precise than conventional planning.",
    },
    {
      title: "Implant placement",
      description:
        "A minor surgical procedure, usually under local anaesthetic. For larger cases like All-on-4, sedation or general anaesthesia is available. You go home the same day.",
    },
    {
      title: "Osseointegration (healing)",
      description:
        "Over the next 3–6 months, the titanium implant fuses with your jawbone. This bond is what gives the final tooth its strength. A temporary tooth or bridge can often be worn during this phase.",
    },
    {
      title: "Final restoration",
      description:
        "Once the implant is fully integrated, we take a digital impression and fit your permanent crown, bridge, or fixed arch — matched in shape and shade to your other teeth.",
    },
  ],
  secondaryProcessTitle: "The All-on-4 journey.",
  secondaryProcessSteps: [
    {
      title: "Consultation & 3D CT imaging",
      description:
        "A full assessment of your bone, bite, and medical history. The CT scan determines whether All-on-4 is the right option for you.",
    },
    {
      title: "Digital smile & surgical planning",
      description:
        "We design the final set of teeth digitally, then plan the four implant positions around that design — not the other way round.",
    },
    {
      title: "Implant surgery",
      description:
        "Four implants placed per arch in a single surgical visit, typically under sedation or GA for comfort. Any remaining compromised teeth are removed at the same time.",
    },
    {
      title: "Same-day provisional teeth",
      description:
        "A fixed set of temporary teeth is attached to the implants on the day of surgery. You leave the practice with a full set of teeth — not dentures, not gaps.",
    },
    {
      title: "Healing period",
      description:
        "3–6 months for the implants to bond with bone. You wear the provisional teeth, eat progressively firmer foods, and return for routine reviews.",
    },
    {
      title: "Final prosthesis",
      description:
        "Once healed, the provisional is replaced with your final fixed prosthesis — crafted for longevity, aesthetics, and function. Regular maintenance visits keep it in good order.",
    },
  ],
  risksContent:
    "Dental implant surgery is generally safe and well-established, but carries risks including infection, bleeding, swelling, transient nerve sensitivity, sinus involvement in the upper jaw, and — rarely — implant failure where osseointegration does not occur. Long-term success depends on oral hygiene, general health, and regular maintenance visits.",
  faqs: [
    {
      q: "Does it hurt?",
      a: "Implant placement is performed under local anaesthetic (or sedation for larger cases). Most patients report less post-op discomfort than a tooth extraction.",
    },
    {
      q: "How long does the whole process take?",
      a: "For a single implant: typically 3–6 months from placement to final crown. For All-on-4: implants and same-day teeth on day one, final prosthesis after 3–6 months of healing.",
    },
    {
      q: "How much does a single implant cost?",
      a: "As a guide, a complete single-tooth implant ranges from about $5,000 to $6,500+, depending on bone quality and any grafting needed. That covers your 3D planning scans, the titanium implant fixture, the custom abutment, and your locally made zirconia crown. You'll receive a fully itemised written quote upfront.",
    },
    {
      q: "Do you offer payment plans?",
      a: "Yes. We partner with TLC Finance, who offer payment plans for dental treatment so you can spread the cost into regular instalments. Our team can walk you through the options at your consultation.",
    },
    {
      q: "What is Dr. Nick's training?",
      a: "Dr. Nick Kulkarni is a registered specialist prosthodontist with a Master's in Prosthodontics (I.P. Pavlov University) and a Graduate Diploma in Oral Implants from the University of Sydney. He is a Fellow of the International Congress of Oral Implantologists, with advanced training at the Misch Implant Institute (Florida) and the Walpole Institute (London). He also founds and directs Place Your First Implant, running live-patient implant and IV-sedation training for other dentists.",
    },
    {
      q: "Am I too old for implants?",
      a: "Age alone isn't a barrier. What matters is general health, medication history, and bone volume — all of which are assessed at your consultation.",
    },
    {
      q: "What if I don't have enough bone?",
      a: "Bone grafting or specific techniques (like zygomatic implants for the upper jaw) can sometimes make implants possible even where bone is limited. The 3D scan tells us what's feasible.",
    },
    {
      q: "Is full-arch implant restoration my only option for missing teeth?",
      a: "Not at all. Several pathways exist depending on what's left in your mouth and your goals. Where healthy natural teeth remain, single implants or implant-supported bridges can preserve them. Implant-retained overdentures use 2–4 implants to secure a removable denture — far more stable than a conventional denture and typically at a lower price point than full-arch (All-on-4) treatment. Where healthy tooth roots remain either side of a gap, a traditional crown and bridge can be the right call. And sometimes a referral to a periodontist for advanced gum treatment can save natural teeth before any extractions are considered. Dr. Nick reviews all of these at your consultation and recommends the option that best fits your clinical situation, lifestyle, and budget.",
    },
  ],
  ctaHeadline: "Thinking about an implant?",
  ctaSubhead:
    "The first step is a consultation and 3D scan — so we can tell you honestly what's possible in your case.",
};


export const SAME_DAY_SMILE: PillarData = {
  number: "03",
  title: "Same Day Smile.",
  slug: "same-day-smile",
  tagline: "Cosmetic dentistry, in a day.",
  shortDescription:
    "Same-day crowns, veneers, ceramic inlays/onlays, and whitening — designed digitally, milled chairside via CEREC, bonded in a single visit.",
  intro:
    "When you're ready for an aesthetic change, Same Day Smile is a planned combination of CEREC same-day ceramics, in-chair whitening, and conservative restorative work — delivered in a single appointment where possible. We use 100% Australian-made restorations and premium materials (Ivoclar e.max ceramics, 3M and Ivoclar composites), planned digitally so you see the design before any tooth is touched.",
  image: clinic3,
  bentoSpan: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  bentoAspect: "aspect-[4/5] md:aspect-[5/4]",
  subTreatments: [
    {
      id: "crowns",
      slug: "same-day-crowns",
      imageUrl:
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/single-visit-crowns/cerec-same-day/vita-furnace.jpg",
      name: "Same Day Crowns",
      description:
        "A full-coverage ceramic crown designed, milled, and bonded in a single appointment via CEREC. For teeth that need more than a filling can provide.",
      longDescription:
        "A CEREC same-day crown rebuilds a tooth that has lost too much structure for a simple filling — a cracked, heavily restored, or root-treated tooth. The tooth is prepared, scanned in 3D, designed on screen, and milled from a solid ceramic block while you wait. The final restoration is bonded the same day. No impression trays, no temporary, no second visit. Our crowns are designed and milled in-house, then finished by local Sydney master technicians where additional staining or layering is needed.",
      whatToExpect: [
        "90 minutes to 2 hours total in the chair",
        "Local anaesthetic throughout",
        "Premium ceramic milled while you wait (~20 minutes)",
        "Shade-matched to your neighbouring teeth",
        "Bonded same day — no temporary needed",
      ],
      processSteps: [
        { title: "Preparation", description: "The tooth is shaped under local anaesthetic." },
        { title: "3D scan", description: "A wand-shaped scanner captures the tooth — no putty." },
        { title: "Design", description: "The crown is designed on screen to match your bite." },
        { title: "Milling", description: "A solid ceramic block is milled into your crown in roughly 20 minutes." },
        { title: "Fire & bond", description: "The restoration is fired, polished, and bonded in place." },
      ],
      risksContent:
        "Crown procedures are generally safe. Risks include transient sensitivity, the need for root canal treatment if the nerve is affected by decay or preparation, and — rarely — restoration fracture or debonding requiring repair.",
    },
    {
      id: "veneers",
      slug: "same-day-veneers",
      imageUrl:
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/case-1.jpg",
      name: "Same Day Veneers",
      description:
        "Thin ceramic facings bonded to the front surface of a tooth to change shape, colour, or alignment. Designed digitally, milled chairside, bonded the same day.",
      longDescription:
        "Veneers are thin ceramic facings bonded to the front surface of a tooth to change its shape, colour, or alignment. Using CEREC and Ivoclar e.max ceramic, we can design and mill veneers in-house and bond them the same day. For larger smile makeovers we often combine ceramic veneers (front 2–4 teeth, where the cosmetic improvement is most visible) with composite bonding on the remaining visible teeth — a strategy that balances long-term aesthetics with cost. Typical investment: from approximately $1,600 per ceramic veneer; flexible weekly payment plans available.",
      whatToExpect: [
        "Digital smile design preview before any tooth is touched",
        "Shade-matched to your whitening result (if applicable)",
        "Milled and bonded same day",
        "Premium ceramic — no metal",
        "From ~$1,600 per tooth; weekly payment options",
      ],
      risksContent:
        "Preparation of the tooth for veneers involves removing a thin layer of enamel — this is permanent and cannot be undone. Risks include post-operative sensitivity, the possibility of root canal treatment if the nerve is affected, and chipping or debonding over time. Cases requiring complex layering or specialty aesthetics may be referred to a ceramist for traditional lab-made veneers.",
    },
    {
      id: "inlays",
      slug: "ceramic-inlays-onlays",
      imageUrl: IMG.jawModel,
      name: "Ceramic Inlays & Onlays",
      description:
        "A custom Ivoclar e.max ceramic restoration that sits between a filling and a full crown — designed and milled chairside with CEREC and bonded in a single ~90-minute visit, keeping more of your natural tooth than a crown.",
      longDescription:
        "When a tooth is too damaged for a simple filling but still has enough healthy structure that it doesn't need a full crown, an inlay or onlay is a conservative, evidence-based option — think of it as a \"partial crown\". An inlay sits within the grooves on top of the tooth; an onlay also covers one or more of the biting points (cusps) to reinforce the tooth. We use Ivoclar e.max — a high-strength lithium-disilicate glass-ceramic that is widely used and well documented — chosen for its strength under the heavy biting forces of back teeth and because it closely matches the translucency of natural enamel. Using our in-house CEREC workflow we 3D-scan the tooth (no putty impressions), design the restoration on screen to match your bite, mill it from a solid Ivoclar block in the practice, and bond it the same day — so there's no two-week wait and no temporary. Each restoration is planned and placed by Dr. Nick Kulkarni, a registered specialist prosthodontist. A typical inlay or onlay is approximately $1,500–$1,700.",
      whatToExpect: [
        "Conservative — only the damaged part of the tooth is removed",
        "Digital 3D scan — no putty impressions",
        "Designed and milled chairside with CEREC",
        "Single ~90-minute visit — no temporary, no second appointment",
        "High-strength Ivoclar e.max ceramic, no metal",
        "Approximately $1,500–$1,700 per restoration",
      ],
      processSteps: [
        { title: "3D scan", description: "We capture a high-definition digital scan of your prepared tooth — no putty impressions needed." },
        { title: "Design", description: "Your restoration is designed on screen and matched precisely to your bite." },
        { title: "Mill", description: "It's milled from a solid block of Ivoclar e.max ceramic in the practice while you wait." },
        { title: "Bond", description: "The inlay or onlay is tried in, checked, adjusted if needed, and bonded — all in a single ~90-minute visit." },
      ],
      risksContent:
        "As with crowns, possible risks include transient sensitivity after preparation, the small chance the nerve is affected and root canal treatment becomes necessary, and — uncommonly — chipping or debonding of the restoration over time. How long a restoration lasts depends on your bite, oral hygiene, and regular check-ups. A consultation determines whether an inlay or onlay is the right option for your tooth.",
      faqs: [
        { q: "What's the difference between an inlay, an onlay, and a crown?", a: "An inlay sits within the grooves on the top of the tooth; an onlay also covers one or more of the biting cusps to reinforce the tooth; a crown covers the whole tooth. Inlays and onlays are more conservative than a crown — we keep more of your healthy natural tooth." },
        { q: "Why do you use Ivoclar e.max?", a: "It's a high-strength lithium-disilicate glass-ceramic that's widely used and well documented in dentistry. It stands up to the heavy biting forces of back teeth and closely matches the translucency of natural enamel, so the restoration blends in. We mill it in-house with CEREC." },
        { q: "Do I need a temporary or a second appointment?", a: "No. Because we design and mill your restoration chairside with CEREC, it's bonded the same day — typically a single ~90-minute visit. There's no two-week wait, no temporary filling, and no second round of numbing." },
        { q: "Why choose an onlay over a large filling?", a: "A large composite filling costs less upfront (around $490) and can be the right choice for a smaller cavity. For a more heavily damaged tooth, a bonded ceramic onlay (around $1,500–$1,700) restores more of the tooth's strength and is designed to last longer. We'll talk through which is appropriate for your specific tooth at your consultation." },
        { q: "How long will it last?", a: "Ivoclar e.max restorations are durable and designed to be long-lasting, but longevity varies with your bite, habits, and oral hygiene. Regular check-ups help us keep an eye on them." },
      ],
    },
    {
      id: "whitening",
      slug: "zoom-whitening",
      // Philips Zoom lifestyle clip (4:5) — replaces the old generic whitening
      // case photo. Opens in the lightbox from the hero.
      videoUrl:
        "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/same-day-smile/zoom/explore-ad.mp4",
      videoPoster:
        "https://res.cloudinary.com/dzydzte9h/video/upload/so_3,q_auto,f_auto/dental-website/same-day-smile/zoom/explore-ad.jpg",
      gallery: [
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/zoom/lifestyle-couple-embrace.jpg",
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/zoom/lifestyle-bride-bouquet.jpg",
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/zoom/claim-8-shades.jpg",
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/zoom/claim-enamel.jpg",
      ],
      name: "Zoom Whitening",
      description:
        "In-chair Philips Zoom WhiteSpeed whitening — a blue LED light and professional-strength gel lift the shade of your natural teeth in about an hour, with desensitising gel to keep you comfortable.",
      longDescription:
        "Philips Zoom WhiteSpeed is an in-chair professional whitening system. After we record your starting shade and protect your gums and lips, a 25% hydrogen-peroxide gel is applied and activated by Philips' blue LED light — usually across three 15-minute sessions, around 45 minutes of whitening plus preparation. Philips reports the WhiteSpeed system is clinically proven to lighten teeth by up to eight shades in about 45 minutes; individual results vary with your starting shade and the cause of discolouration. When a same-day smile makeover is planned, we usually whiten first so any ceramic restorations can be colour-matched to your new shade. You'll go home with DayWhite or NiteWhite take-home trays to maintain and top up your result.",
      whatToExpect: [
        "About 60 minutes in-chair (≈45 min of whitening)",
        "Blue LED light + professional 25% hydrogen-peroxide gel",
        "Three short sessions, with adjustable light intensity for comfort",
        "Desensitising relief gel to manage sensitivity",
        "DayWhite / NiteWhite take-home trays for maintenance",
      ],
      processSteps: [
        { title: "Shade check & assessment", description: "We record your starting tooth shade and confirm whitening is suitable for you. Existing fillings, crowns, and veneers won't change colour, so we plan around them." },
        { title: "Protect & prepare", description: "Your lips and gums are isolated and protected so the whitening gel only contacts your teeth." },
        { title: "Whiten under the LED light", description: "The professional-strength gel is applied and activated by Philips' blue LED light, typically in three 15-minute sessions. The light intensity is adjustable for your comfort." },
        { title: "Relief gel & take-home trays", description: "A desensitising relief gel is applied to settle any sensitivity, and you're given DayWhite or NiteWhite trays to maintain and top up your result at home." },
      ],
      risksContent:
        "Transient tooth sensitivity and mild gum irritation are common for 24–48 hours after whitening; a desensitising relief gel is used during treatment to help, and the LED intensity is adjustable. Whitening lightens natural teeth only — it does not change the colour of existing crowns, veneers, or fillings, which may need replacing if a close shade match matters. Results vary with your starting shade and habits (coffee, tea, red wine, smoking), and a consultation confirms whether whitening is suitable for you.",
      faqs: [
        {
          q: "How much whiter will my teeth get?",
          a: "It depends on your starting shade and what's causing the discolouration. Philips reports the WhiteSpeed system is clinically proven to lighten teeth by up to eight shades in about 45 minutes, but individual results vary — we'll give you a realistic idea at your consultation.",
        },
        {
          q: "Does whitening hurt?",
          a: "Most people find it comfortable. The LED light intensity is adjustable and we apply a desensitising relief gel; in Philips' patient survey, 99% of people reported little to no sensitivity during WhiteSpeed treatment. Any sensitivity is usually mild and settles within 24–48 hours.",
        },
        {
          q: "How long do the results last?",
          a: "That varies with your diet and habits — coffee, tea, red wine, and smoking all re-stain teeth over time. We provide DayWhite or NiteWhite take-home trays so you can top up and maintain your result between visits.",
        },
        {
          q: "Will it whiten my crowns or veneers?",
          a: "No — whitening only lightens natural tooth enamel. Existing crowns, veneers, and fillings keep their colour, which is why we often whiten before planning any ceramic work so it can be matched to your new shade.",
        },
      ],
    },
    {
      id: "bonding",
      slug: "composite-bonding",
      imageUrl:
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-1.jpg",
      gallery: [
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/gallery-1.jpg",
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/gallery-2.jpg",
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/gallery-3.jpg",
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/gallery-4.jpg",
      ],
      name: "Composite Bonding",
      description:
        "Tooth-coloured 3M / Ivoclar composite resin sculpted onto the tooth to repair chips, close small gaps, or refine shape. Single-visit, often reversible.",
      longDescription:
        "Composite bonding (also known as composite veneering) is a conservative, single-visit way to repair chips, close small gaps, or refine the shape of a tooth. We use 3M ESPE and Ivoclar premium composite resins — sculpted directly onto the tooth, cured with a light, then polished. Often reversible — the bonding can be removed without damaging the underlying tooth — which makes it a good first step for patients considering more significant changes. Typical investment: from approximately $550 per tooth; with proper care, composite bonding typically lasts 5–7 years before refresh or transition to ceramic.",
      whatToExpect: [
        "Usually no anaesthetic needed",
        "30–60 minutes per tooth",
        "Reversible — tooth structure preserved",
        "From ~$550 per tooth",
      ],
      risksContent:
        "Composite bonding can chip, stain, or wear over several years and may need replacement or re-polishing. Bonding doesn't match ceramic for long-term durability but is far more conservative. Avoid coffee, tea, red wine, and dark sauces for the first 48 hours after treatment.",
    },
  ],
  processSteps: [
    {
      title: "Consultation & plan",
      description:
        "We discuss what you want to change, take photographs and digital scans, and design a treatment plan tailored to you. Nothing starts until you're happy with the plan.",
    },
    {
      title: "Treatment day begins",
      description:
        "On the day, we walk through the plan again. Photographs and digital mock-ups show what we're aiming for before any tooth is touched.",
    },
    {
      title: "Prepare & scan",
      description:
        "Teeth are prepared and scanned in 3D with CEREC. Restorations are designed on screen and milled in the practice — roughly 2–3 hours. You can stay, watch TV, or step out for a break.",
    },
    {
      title: "Fit & bond",
      description:
        "Each restoration is tried in, checked for fit and bite, adjusted if needed, and then bonded. You leave with your final smile in place.",
    },
  ],
  risksContent:
    "Same-day cosmetic dentistry is elective and involves permanent reshaping of enamel for crown and veneer preparations — enamel that cannot be replaced. Risks include post-operative sensitivity, the possibility of root canal treatment if the nerve is affected, gum recession around aggressively prepared margins, and restoration chipping or debonding over time. This is why careful planning, honest expectations, and a detailed consultation are non-negotiable.",
  faqs: [
    {
      q: "Is same-day cosmetic dentistry right for me?",
      a: "It suits patients with discolouration, minor alignment issues, or small structural concerns who want a visible change in a single visit. A consultation determines whether you're a candidate.",
    },
    {
      q: "How many teeth are typically treated?",
      a: "Anywhere from 6 to 10 upper teeth is most common for a visible smile makeover, though the number depends on your bite, smile line, and goals.",
    },
    {
      q: "How long is the appointment?",
      a: "Same-day crowns and onlays typically take 90 minutes to 2 hours per restoration. Larger combined smile makeovers usually run 4–6 hours with planned breaks.",
    },
    {
      q: "Is it reversible?",
      a: "Composite bonding and whitening are largely reversible. Crowns and veneers involve permanent reshaping of the tooth — the restoration itself can be replaced later, but the prepared tooth cannot be un-prepared.",
    },
    {
      q: "How long will the result last?",
      a: "Ceramic restorations are designed for long-term durability — typical longevity 15+ years with proper care. Composite bonding typically lasts 5–7 years. Longevity depends on hygiene, bite forces, grinding habits, and regular check-ups.",
    },
    {
      q: "Can I whiten my natural teeth at the same time?",
      a: "Yes — we often whiten before any crown or veneer work so the ceramics can be matched to your new shade.",
    },
    {
      q: "What materials do you use?",
      a: "Premium ceramics from Ivoclar (e.max) for crowns, veneers, inlays, and onlays — milled chairside via CEREC. Composite resins from 3M ESPE and Ivoclar for bonding and fillings. All restorations are designed and milled in-house, then finished by local Sydney master technicians where lab work is required. No overseas lab work.",
    },
  ],
  ctaHeadline: "Curious what your smile could look like?",
  ctaSubhead:
    "The first step is a consultation and digital preview — so you know exactly what we're designing before the day begins.",
};

export const ORTHODONTICS: PillarData = {
  number: "04",
  title: "Orthodontics.",
  slug: "orthodontics",
  tagline: "A healthy bite, a balanced airway.",
  shortDescription:
    "Clear aligners for adults, early interventive orthodontics for children, and airway-focused care — visiting orthodontic clinician Dr. Sagar (Jimmy) Rao.",
  intro:
    "Orthodontics at Leichhardt Dental is led by visiting clinician Dr. Sagar (Jimmy) Rao, who comes in once a month for orthodontic reviews and consultations. The approach is evidence-based and family-focused, with a strong emphasis on airway health and functional alignment — not just a straight smile. For adults seeking discreet teeth straightening we use Invisalign clear aligners; for children, we focus on early interventive orthodontics to guide jaw growth and prevent more invasive treatment later.",
  image: philosophyImg,
  bentoSpan: "md:col-span-2 lg:col-span-12",
  bentoAspect: "aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]",
  subTreatments: [
    {
      id: "invisalign",
      slug: "invisalign-clear-aligners",
      imageUrl: IMG.technicianMaking,
      name: "Invisalign Clear Aligners",
      description:
        "Discreet teeth straightening with custom clear-tray aligners. Planned digitally with 3D scans, reviewed monthly by Dr. Jimmy.",
      longDescription:
        "Invisalign uses a series of custom clear aligners to gradually move your teeth into a better position — without metal brackets or wires. We begin with a 3D digital scan and Invisalign's planning software to map your tooth movements before treatment starts, so you can see the projected result. You wear each tray for about two weeks before progressing to the next, and Dr. Jimmy reviews your progress at his monthly visits. Most adult cases take 6–18 months depending on complexity.",
      whatToExpect: [
        "Initial 3D scan and digital preview of the projected result",
        "Custom clear trays — virtually invisible day-to-day",
        "Trays worn 20–22 hours per day; removed for meals",
        "Monthly reviews with Dr. Jimmy",
        "Typical treatment 6–18 months for adults",
      ],
      risksContent:
        "Clear-aligner treatment requires consistent daily wear to be effective. Risks include mild discomfort with each new tray, transient lisping in the first week, gum irritation if a tray edge is rough, and treatment delays if trays aren't worn as prescribed. Some complex bite issues may not be suitable for clear aligners and may require referral to a specialist orthodontist.",
    },
    {
      id: "early-intervention",
      slug: "early-interventive-orthodontics",
      imageUrl: IMG.toolsColorful,
      name: "Early Interventive Orthodontics",
      description:
        "Guiding jaw growth and tooth eruption in children to prevent more invasive treatment later. Ideally assessed from age 7.",
      longDescription:
        "Dr. Jimmy's philosophy on paediatric orthodontics is simple: the less time a child spends in treatment, the better. By intervening early in jaw and dental development, we can often guide tooth eruption and jaw growth so that more invasive treatment isn't needed later in the teenage years. The Australian Society of Orthodontists recommends an initial orthodontic assessment around age 7 — well before any visible crowding becomes obvious. Treatment may involve simple appliances, growth-guidance plates, or watchful monitoring; not every child will need active treatment.",
      whatToExpect: [
        "Initial assessment from age 7",
        "Gentle, conversational appointments",
        "Watchful monitoring rather than over-treatment",
        "Growth-guidance appliances only where clearly indicated",
        "Coordinated with your general dentist for ongoing care",
      ],
      risksContent:
        "Early orthodontic treatment is conservative and reversible where appliances are used. The main consideration is that not every developmental issue is best addressed in early childhood — some are better watched and treated later. Dr. Jimmy will give you a clear, honest read on whether your child needs treatment now, watchful monitoring, or no intervention at all.",
    },
    {
      id: "airway",
      slug: "airway-and-functional-alignment",
      imageUrl: IMG.glovedEquipment,
      name: "Airway & Functional Alignment",
      description:
        "Assessment and management of airway issues — mouth breathing, snoring, suspected sleep-disordered breathing — alongside orthodontic care.",
      longDescription:
        "Dr. Jimmy is particularly passionate about the link between dental development and the airway. Mouth breathing, snoring, restless sleep, and crowded jaws in children can be early signs of airway compromise that contribute to broader health issues later in life. Orthodontic care at Leichhardt Dental considers the airway from the start — not as an afterthought. Where airway issues are suspected, we may refer for sleep studies or ENT review alongside any orthodontic planning, so treatment addresses the whole picture rather than just tooth alignment.",
      whatToExpect: [
        "Airway-aware orthodontic assessment",
        "Education on mouth breathing and oral myofunctional habits",
        "Referral to sleep medicine or ENT where clinically indicated",
        "Treatment that considers jaw growth, bite, and airway together",
      ],
      risksContent:
        "Airway-focused orthodontic care is non-invasive at the assessment stage. Where active treatment is recommended, the same considerations apply as for general orthodontics. Diagnosis of sleep-disordered breathing requires referral to an appropriate medical specialist — we don't diagnose sleep conditions in-house.",
    },
  ],
  processSteps: [
    {
      title: "Initial consultation",
      description:
        "Dr. Jimmy reviews your goals, medical and dental history, and takes 3D digital scans. For Invisalign cases, you see a preview of the projected movement before committing.",
    },
    {
      title: "Treatment plan",
      description:
        "A written plan covering the expected duration, number of trays or stages, and total investment — including any coordination with other clinicians if needed.",
    },
    {
      title: "Active treatment",
      description:
        "Adults: weekly tray changes worn 20–22 hours a day. Children: appliances or monitoring as needed. Monthly reviews with Dr. Jimmy at his Leichhardt visits.",
    },
    {
      title: "Retention",
      description:
        "Once teeth are in their new position, retainers preserve the result. Lifelong nightly retainer wear is usually recommended to prevent relapse.",
    },
  ],
  risksContent:
    "Orthodontic treatment generally carries low risk. Possible considerations include transient discomfort, root shortening (rare and usually clinically insignificant), enamel decalcification if hygiene is poor, and treatment relapse if retainers aren't worn. Complex cases or skeletal discrepancies may require referral to a specialist orthodontist or maxillofacial surgeon — we'll tell you up-front if that's the right path for you.",
  faqs: [
    {
      q: "Who provides orthodontic care at Leichhardt Dental?",
      a: "Dr. Sagar (Jimmy) Rao is a visiting general dentist with a special interest in orthodontics and airway management. He visits Leichhardt Dental Centre once a month for orthodontic reviews and consultations.",
    },
    {
      q: "Am I a candidate for Invisalign?",
      a: "Most mild to moderate alignment cases are suitable for clear aligners. More complex bite issues — significant skeletal discrepancies, severely rotated teeth, or large gaps — may require traditional braces or referral to a specialist orthodontist. Dr. Jimmy will tell you honestly which path suits your case.",
    },
    {
      q: "When should my child have an orthodontic assessment?",
      a: "The Australian Society of Orthodontists recommends an initial assessment around age 7. Most children won't need active treatment yet — but it's the right age to identify anything worth watching or intervening on early.",
    },
    {
      q: "Why does Dr. Jimmy focus on airway?",
      a: "Mouth breathing, restless sleep, and crowded jaws in children can be early signs of airway compromise — which has implications well beyond dental alignment. Considering the airway alongside orthodontic planning helps ensure treatment supports overall health, not just a straighter smile.",
    },
    {
      q: "Will I need to see Dr. Jimmy every week?",
      a: "No — typically monthly reviews. Tray changes happen at home; the monthly visit is to check progress and answer questions. Dr. Jimmy visits Leichhardt Dental Centre once a month.",
    },
    {
      q: "How much does Invisalign treatment cost?",
      a: "Investment varies with complexity — typically $6,000–$9,000 for a full treatment course. We provide a detailed written quote at consultation, plus information on flexible payment plans.",
    },
  ],
  ctaHeadline: "Curious about orthodontics for you or your child?",
  ctaSubhead:
    "Book a consultation with Dr. Jimmy on his next monthly visit — we'll give you a clear read on whether treatment is right, and what's involved.",
};

export const ALL_PILLARS: PillarData[] = [
  GENERAL_DENTISTRY,
  DENTAL_IMPLANTS,
  SAME_DAY_SMILE,
  ORTHODONTICS,
];

/** Look up a sub-treatment by pillar slug + sub-treatment slug. */
export function findSubTreatment(pillarSlug: string, subSlug: string) {
  const pillar = ALL_PILLARS.find((p) => p.slug === pillarSlug);
  if (!pillar) return null;
  const sub = pillar.subTreatments.find((s) => s.slug === subSlug);
  if (!sub) return null;
  return { pillar, sub };
}
