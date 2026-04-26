import type { PillarData } from "./pillar";

import clinic1 from "../assets/clinic-1.jpg";
import clinic2 from "../assets/clinic-2.webp";
import clinic3 from "../assets/clinic-3.webp";
import drNickImg from "../assets/dr-nick.jpg";

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
      name: "Dental Fillings",
      description:
        "Tooth-coloured composite resin bonded directly to the tooth to restore structure after decay or minor damage. Conservative, blended to your natural shade.",
      longDescription:
        "When a tooth is affected by decay or minor fracture, a composite resin filling restores its shape and function. Tooth-coloured composite is layered and bonded directly to the remaining tooth structure, then cured with a curing light. We match the shade to your surrounding teeth so the repair blends naturally. The entire procedure is done under local anaesthetic in a single visit.",
      whatToExpect: [
        "Local anaesthetic for comfort",
        "Careful removal of decay or damaged structure",
        "Composite resin placed in thin layers and shade-matched",
        "Polished and adjusted to your bite",
        "Usually 30–60 minutes per tooth",
      ],
      risksContent:
        "Post-operative sensitivity for a few days is common, particularly with deeper fillings. Rarely, a tooth with extensive decay may later need root canal treatment if the nerve is affected.",
    },
    {
      id: "bridges",
      slug: "dental-bridges",
      name: "Dental Bridges",
      description:
        "A fixed, custom-made prosthesis that spans a gap where one or more teeth are missing. Anchored to the neighbouring teeth, designed to look and feel like your own.",
      longDescription:
        "A dental bridge replaces one or more missing teeth with a custom-made prosthesis fixed to the teeth either side of the gap. It restores the ability to chew, prevents neighbouring teeth from drifting, and blends with your natural smile. Bridges can be a strong choice when implants aren't suitable — though we'll always discuss both options at consultation.",
      whatToExpect: [
        "Two or three appointments over 2–4 weeks",
        "Neighbouring teeth shaped to receive crowns",
        "Temporary bridge worn while lab fabricates final",
        "Final bridge cemented in place",
      ],
      risksContent:
        "Preparation of neighbouring teeth is permanent — the shape cannot be undone. Bridges are maintainable but not forever; expect to need replacement or adjustment over 10–15 years depending on hygiene and bite.",
    },
    {
      id: "wisdom",
      slug: "wisdom-teeth",
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
      name: "Root Canal Treatment",
      description:
        "When infection reaches the nerve of a tooth, root canal treatment removes the infection and preserves the tooth. Modern techniques make the procedure more comfortable than its reputation suggests.",
      longDescription:
        "When decay or trauma reaches the pulp (nerve) of a tooth, the tooth can usually still be saved with root canal treatment. The infected pulp is carefully removed, the canals are cleaned and shaped, and the space is sealed with a biocompatible filling material. A crown is typically placed afterwards to protect the tooth long-term. Modern techniques — rotary instrumentation, improved anaesthetics — make the procedure no more uncomfortable than a standard filling.",
      whatToExpect: [
        "Usually 1–2 appointments of 60–90 minutes",
        "Local anaesthetic throughout",
        "Rubber dam placed for isolation",
        "Crown recommended afterwards for protection",
      ],
      risksContent:
        "Root canal success rates are high (around 90–95%) but not guaranteed. Complex cases, re-treatments, or unusual anatomy may be referred to an endodontic specialist. A tooth that has had root canal treatment is more brittle and benefits from a protective crown.",
    },
    {
      id: "family",
      slug: "preventative-and-family-dentistry",
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
    "Titanium roots that restore function, structure, and confidence — from a single tooth to a full arch.",
  intro:
    "A dental implant is a small titanium post that replaces the root of a missing tooth. It fuses with the surrounding jawbone, giving a stable foundation for a custom crown, bridge, or full arch of teeth. Every implant case at the practice is planned and placed by Dr. Nick.",
  image: clinic2,
  bentoSpan: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  bentoAspect: "aspect-[4/5] md:aspect-[5/4]",
  subTreatments: [
    {
      id: "single",
      slug: "single-tooth-implants",
      name: "Single Tooth Implants",
      description:
        "A titanium post placed where the tooth root used to be, topped with a custom crown. The teeth either side are left untouched — unlike a bridge, which requires preparing adjacent teeth.",
      longDescription:
        "A single-tooth implant replaces one missing tooth with a titanium post placed in the jawbone, topped with a custom crown. Unlike a bridge, the neighbouring teeth are untouched. Once healed, the implant behaves like a natural tooth — you brush, floss, and eat with it as normal. The approximate cost for a single-tooth implant is in the range of $5,000–$7,000+ depending on bone quality, grafting needs, and crown material.",
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
      name: "Implant-Supported Overdentures",
      description:
        "A denture that clips onto two or more implants instead of resting on the gums. Dramatically more stable than a conventional denture; still removable for cleaning.",
      longDescription:
        "An implant-supported overdenture transforms a loose lower denture into a stable, secure set of teeth. Typically two to four implants are placed per arch; the denture clips onto them with hidden attachments. You take it out at night to clean. The difference in chewing function, speech, and confidence compared to a conventional denture is significant.",
      whatToExpect: [
        "2–4 implants placed per arch",
        "Existing denture can sometimes be retrofitted",
        "Stable chewing for firmer foods",
        "Removable for daily cleaning",
      ],
      risksContent:
        "Standard implant surgery risks apply. Attachments inside the denture wear over time and need periodic replacement (typically every 2–3 years).",
    },
    {
      id: "all-on-4",
      slug: "all-on-4-implants",
      name: "All-on-4 & All-on-X",
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
      a: "As a guide, single-tooth implants typically fall in the $5,000–$7,000+ range, depending on bone quality, grafting needs, and crown material. We give you a detailed written quote at consultation.",
    },
    {
      q: "What is Dr. Nick's implant training?",
      a: "Dr. Nick Kulkarni holds a Fellowship of the International Congress of Oral Implantologists and a Graduate Diploma in Oral Implants from the University of Sydney, with additional training in Florida and London.",
    },
    {
      q: "Am I too old for implants?",
      a: "Age alone isn't a barrier. What matters is general health, medication history, and bone volume — all of which are assessed at your consultation.",
    },
    {
      q: "What if I don't have enough bone?",
      a: "Bone grafting or specific techniques (like zygomatic implants for the upper jaw) can sometimes make implants possible even where bone is limited. The 3D scan tells us what's feasible.",
    },
  ],
  ctaHeadline: "Thinking about an implant?",
  ctaSubhead:
    "The first step is a consultation and 3D scan — so we can tell you honestly what's possible in your case.",
};

export const SINGLE_VISIT_CROWNS: PillarData = {
  number: "03",
  title: "Single Visit Crowns.",
  slug: "single-visit-crowns",
  tagline: "In. Designed. Fitted. Out.",
  shortDescription:
    "CEREC digital ceramics — a custom crown designed, milled, and bonded in a single appointment.",
  intro:
    "CEREC (Chairside Economical Restoration of Aesthetic Ceramics) lets us design, mill, and bond a custom ceramic crown in a single appointment — no impression trays, no temporary, no second visit. One of the practice's most requested treatments.",
  image: clinic3,
  bentoSpan: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  bentoAspect: "aspect-[4/5] md:aspect-[5/4]",
  subTreatments: [
    {
      id: "crowns",
      slug: "cerec-same-day-crowns",
      name: "CEREC Same-Day Crowns",
      description:
        "A full-coverage ceramic crown designed, milled, and bonded in a single appointment. For teeth that need more than a filling can provide.",
      longDescription:
        "A CEREC same-day crown rebuilds a tooth that has lost too much structure for a simple filling — a cracked, heavily restored, or root-treated tooth. The tooth is prepared, scanned in 3D, designed on screen, and milled from a solid ceramic block while you wait. The final restoration is bonded the same day. No impression trays, no temporary, no second visit.",
      whatToExpect: [
        "90 minutes to 2 hours in total",
        "Local anaesthetic throughout",
        "Ceramic milled while you wait (~20 minutes)",
        "Shade-matched to your neighbouring teeth",
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
      id: "impressions",
      slug: "digital-impressions",
      name: "Digital Impressions",
      description:
        "A small wand-shaped scanner captures your tooth in 3D — no putty, no gag reflex, no waiting for a lab. The data feeds directly into the design software.",
      longDescription:
        "Digital intraoral scanning has replaced putty impressions for most restorative work at the practice. A small wand takes a precise 3D scan of your teeth in a couple of minutes — no gag reflex, no materials in your mouth, no waiting for a lab. The digital file feeds directly into CEREC design software, or can be sent electronically to an external lab when needed.",
      whatToExpect: [
        "A few minutes per arch",
        "No putty, no trays",
        "Instant on-screen preview",
        "Digital file kept for future comparison",
      ],
      risksContent:
        "Digital scanning carries essentially no clinical risk beyond standard dental appointment considerations.",
    },
    {
      id: "inlays",
      slug: "ceramic-inlays-onlays",
      name: "Ceramic Inlays & Onlays",
      description:
        "A more conservative alternative to a full crown, where only the damaged part of the tooth is replaced with a custom ceramic restoration.",
      longDescription:
        "Inlays and onlays sit between a filling and a full crown — a custom ceramic piece that restores only the damaged part of the tooth, preserving more healthy structure than a crown would. They're a conservative choice when a composite filling would be too large but a full crown would be more aggressive than needed. Designed, milled, and bonded in the same CEREC workflow as same-day crowns.",
      whatToExpect: [
        "Same-day procedure via CEREC",
        "Preserves more natural tooth than a crown",
        "Shade-matched ceramic, no metal",
        "90 minutes to 2 hours",
      ],
      risksContent:
        "Similar risks to crowns: transient sensitivity, the possibility of root canal treatment if the nerve is affected during preparation, and — rarely — restoration chipping or debonding.",
    },
  ],
  processSteps: [
    {
      title: "Preparation",
      description:
        "The tooth is shaped to receive the ceramic restoration. Under local anaesthetic, so you don't feel a thing.",
    },
    {
      title: "3D scan",
      description:
        "We scan the prepared tooth with the CEREC intraoral scanner — a few seconds per arch. No impression trays, no putty.",
    },
    {
      title: "Design",
      description:
        "Your restoration is designed on screen. We match the anatomy, contour, and bite to your surrounding teeth before anything is milled.",
    },
    {
      title: "Milling",
      description:
        "A solid ceramic block is milled into your crown in roughly 20 minutes. You wait in the chair (or pop out for a coffee).",
    },
    {
      title: "Fire & bond",
      description:
        "The restoration is fired for final strength and polished for shine, then bonded to your tooth. You walk out with your final tooth in place — no temporary, no second visit.",
    },
  ],
  risksContent:
    "Crown procedures are generally safe. Individual risks include transient tooth sensitivity, the need for root canal treatment if the nerve is affected by decay or preparation, and — rarely — restoration fracture or debonding requiring repair or replacement. A consultation covers what applies in your case.",
  faqs: [
    {
      q: "Is CEREC as strong as a lab-made crown?",
      a: "Yes. Modern CEREC ceramic blocks are monolithic — a single piece of high-strength ceramic — which is often more durable than traditional porcelain-fused-to-metal crowns, and free of metal.",
    },
    {
      q: "Can CEREC do veneers?",
      a: "Yes, though for complex cosmetic cases we may still recommend lab-made veneers where micro-layering is needed.",
    },
    {
      q: "How long does the appointment take?",
      a: "Typically 90 minutes to 2 hours from preparation to bonded crown. You stay in the practice throughout.",
    },
    {
      q: "Will it match my other teeth?",
      a: "Ceramic blocks come in a range of shades; we select the closest match to your surrounding teeth and fine-tune during design.",
    },
    {
      q: "Is it more expensive than a traditional crown?",
      a: "Cost is broadly comparable. You save a second appointment, time off work, and the temporary crown. We'll give you a written quote at consultation.",
    },
    {
      q: "How long will a CEREC crown last?",
      a: "With good hygiene and regular check-ups, ceramic crowns are designed for long-term durability. Individual longevity varies based on bite forces, habits, and maintenance.",
    },
  ],
  ctaHeadline: "Chipped, cracked, or heavily restored tooth?",
  ctaSubhead:
    "A consultation tells you whether CEREC is the right fix — and whether we can do it in a single visit.",
};

export const SAME_DAY_SMILE: PillarData = {
  number: "04",
  title: "Same Day Smile.",
  slug: "same-day-smile",
  tagline: "A new smile, in a day.",
  shortDescription:
    "Full-arch smile design for patients ready for a complete change. Planned meticulously, delivered together.",
  intro:
    "For patients ready for a significant aesthetic change — a carefully planned combination of CEREC ceramics, whitening, bonding, and laser gum contouring delivered in a single day. Serious work, planned properly, delivered together.",
  image: drNickImg,
  bentoSpan: "md:col-span-2 lg:col-span-12",
  bentoAspect: "aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]",
  subTreatments: [
    {
      id: "cerec",
      slug: "cerec-crowns-veneers",
      name: "CEREC Crowns & Veneers",
      description:
        "Designed on screen, milled from a solid ceramic block, and bonded the same day. The backbone of most smile makeovers we do.",
      longDescription:
        "CEREC ceramic restorations are the structural backbone of most same-day smile makeovers. Crowns cover and strengthen teeth with significant structural loss; veneers are thin ceramic facings bonded to the front surface of a tooth to change shape, colour, or alignment. Both are designed digitally, milled from a solid ceramic block, and bonded the same day.",
      whatToExpect: [
        "Digital smile design preview before any tooth is touched",
        "Shade-matched to your whitening result",
        "Milled and bonded same day",
        "Ceramic — no metal",
      ],
      risksContent:
        "Preparation of the tooth for crowns or veneers is permanent — the shape cannot be undone. Risks include post-op sensitivity, the possibility of root canal treatment if the nerve is affected, and chipping or debonding over time.",
    },
    {
      id: "whitening",
      slug: "professional-whitening",
      name: "Professional Whitening",
      description:
        "In-chair Philips ZOOM whitening to lighten the shade of your teeth before restorations are matched. Sensitivity is managed with desensitising gels.",
      longDescription:
        "Philips ZOOM in-chair whitening lifts the shade of your natural teeth using a hydrogen peroxide gel activated by light. One session typically takes about an hour. We often whiten first when a smile makeover is planned, so any ceramic restorations can be colour-matched to your new, lighter shade. Take-home trays are usually provided for top-ups.",
      whatToExpect: [
        "~60 minutes in-chair",
        "Gel applied, light activated",
        "Desensitising agents to manage sensitivity",
        "Take-home trays for maintenance",
      ],
      risksContent:
        "Transient tooth sensitivity and mild gum irritation are common for 24–48 hours after whitening. Whitening does not change the colour of existing crowns, veneers, or fillings — these may need to be replaced if a shade match is important.",
    },
    {
      id: "bonding",
      slug: "composite-bonding",
      name: "Composite Bonding",
      description:
        "Tooth-coloured resin sculpted onto the tooth to repair chips, cracks, or small shape changes. Reversible, conservative, and often part of a makeover plan.",
      longDescription:
        "Composite bonding is a conservative way to repair chips, close small gaps, or refine the shape of a tooth. Tooth-coloured resin is sculpted directly onto the tooth, cured with a light, and polished. Often reversible — the bonding can be removed without damaging the underlying tooth — which makes it a good first step for patients considering more significant changes.",
      whatToExpect: [
        "Usually no anaesthetic needed",
        "30–60 minutes per tooth",
        "Reversible — tooth structure preserved",
        "May need refreshing over time",
      ],
      risksContent:
        "Composite bonding can chip, stain, or wear over several years and may need replacement or re-polishing. Bonding doesn't match ceramic for long-term durability but is far more conservative.",
    },
    {
      id: "gum-contouring",
      slug: "laser-gum-contouring",
      name: "Laser Gum Contouring",
      description:
        "Reshaping the gum line with a dental laser to correct a gummy smile or uneven gum heights. Healing is quick and usually doesn't require stitches.",
      longDescription:
        "Laser gum contouring reshapes the gum line to correct a gummy smile or uneven gum heights between adjacent teeth. A dental laser removes excess gum tissue precisely, with less bleeding and faster healing than a traditional scalpel approach. Usually no stitches are needed. Often done as part of a same-day smile makeover, before any ceramic work.",
      whatToExpect: [
        "Local anaesthetic",
        "Typically 30–45 minutes per arch",
        "Minor post-op tenderness for a few days",
        "Usually no stitches required",
      ],
      risksContent:
        "Gum contouring permanently removes a small amount of gum tissue. Risks include transient sensitivity, minor post-operative bleeding, and — rarely — infection. Assessment beforehand is important to confirm there's enough attached gum tissue for a safe reshape.",
    },
    {
      id: "cleaning",
      slug: "professional-scale-and-polish",
      name: "Professional Scale & Polish",
      description:
        "A thorough clean before any aesthetic work. Removes surface stain and plaque so the final result photographs the way it looks in the chair.",
      longDescription:
        "A thorough scale and polish always precedes aesthetic work. Removing surface stain and plaque reveals your true baseline shade, which is what we match whitening and restorations to. It also gives your gums the healthiest starting point possible — important when we're planning restorations that sit at or below the gum line.",
      whatToExpect: [
        "30–45 minutes",
        "Ultrasonic scaler + hand scaling",
        "Polish and fluoride treatment",
        "Fresh baseline for aesthetic planning",
      ],
      risksContent:
        "Routine cleaning is generally low-risk. Transient sensitivity is common, particularly if you've skipped cleans for a while.",
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
    "A same-day smile makeover is elective and involves permanent reshaping of enamel for crown and veneer preparations — enamel that cannot be replaced. Risks include post-operative sensitivity, the possibility of root canal treatment if the nerve is affected, gum recession around aggressively prepared margins, and restoration chipping or debonding over time. This is why careful planning, honest expectations, and a detailed consultation are non-negotiable.",
  faqs: [
    {
      q: "Is a same-day smile right for me?",
      a: "It suits patients with discolouration, minor alignment issues, or small structural concerns who want a visible change in a single visit. A consultation determines whether you're a candidate.",
    },
    {
      q: "How many teeth are typically treated?",
      a: "Anywhere from 6 to 10 upper teeth is most common for a visible smile makeover, though the number depends on your bite, smile line, and goals.",
    },
    {
      q: "How long is the day in the chair?",
      a: "Usually 4–6 hours, broken up with breaks. We plan the day so there's time for the ceramics to mill while you rest.",
    },
    {
      q: "Is it reversible?",
      a: "Partially. Composite bonding, whitening, and gum laser work are largely reversible. Crowns and veneers involve permanent reshaping of the tooth — the restoration itself can be replaced later, but the prepared tooth cannot be un-prepared.",
    },
    {
      q: "How long will the result last?",
      a: "Ceramic restorations are designed for long-term durability. Longevity depends on hygiene, bite forces, grinding habits, and regular check-ups.",
    },
    {
      q: "Can I whiten my natural teeth at the same time?",
      a: "Yes — we often whiten before any crown or veneer work so the ceramics can be matched to your new shade.",
    },
  ],
  ctaHeadline: "Curious what your smile could look like?",
  ctaSubhead:
    "The first step is a consultation and digital preview — so you know exactly what we're designing before the day begins.",
};

export const ALL_PILLARS: PillarData[] = [
  GENERAL_DENTISTRY,
  DENTAL_IMPLANTS,
  SINGLE_VISIT_CROWNS,
  SAME_DAY_SMILE,
];

/** Look up a sub-treatment by pillar slug + sub-treatment slug. */
export function findSubTreatment(pillarSlug: string, subSlug: string) {
  const pillar = ALL_PILLARS.find((p) => p.slug === pillarSlug);
  if (!pillar) return null;
  const sub = pillar.subTreatments.find((s) => s.slug === subSlug);
  if (!sub) return null;
  return { pillar, sub };
}
