/**
 * Seed the Sanity "production" dataset with all content from the hardcoded
 * TypeScript fallbacks.  Safe to run multiple times — uses createOrReplace.
 *
 * Prerequisites:
 *   1. Add SANITY_WRITE_TOKEN to .env (sanity.io/manage → project → API → Tokens, role Editor)
 *   2. npm run seed
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Env
// ---------------------------------------------------------------------------

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {}
}
loadEnv();

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || "ez5kieuq";
const DATASET = process.env.VITE_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error(`
ERROR: SANITY_WRITE_TOKEN is not set in .env. Get one at:
  https://www.sanity.io/manage/personal/project/${PROJECT_ID}/api
`);
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _k = 0;
const key = () => `k${String(++_k).padStart(4, "0")}`;

function toBlocks(paragraphs) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}

const slug = (current) => ({ _type: "slug", current });

// Stock imagery re-hosted on Cloudinary (from Pexels, free for commercial use):
// first-party delivery avoids third-party cookies and serves AVIF/WebP via CDN.
const PX = (id) =>
  `https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/stock/${id}.jpg`;

const IMG = {
  toolsBlue: PX(4946338),
  toolsColorful: PX(4297522),
  equipmentClose: PX(6627724),
  toolsTray: PX(17112256),
  instrumentsSteel: PX(6812483),
  jawModel: PX(16309612),
  glovedEquipment: PX(6627662),
  dentureFitting: PX(6502631),
  technicianMaking: PX(13085186),
  implantMaking: PX(7788493),
  dentalModel: PX(6502634),
};

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

const practiceSettings = {
  _type: "practiceSettings",
  _id: "practiceSettings",
  name: "Leichhardt Dental Centre",
  tagline: "General and implant dentistry, Inner West Sydney",
  phone: "02 9568 3593",
  phoneIntl: "+61295683593",
  phoneAlt: "0475 742 607",
  email: "leichhardtdentist@gmail.com",
  address: {
    streetAddress: "Shop 4/39-45 Norton Street",
    addressLocality: "Leichhardt",
    addressRegion: "NSW",
    postalCode: "2040",
    addressCountry: "AU",
  },
  hours: [
    { _key: key(), days: "Mon – Fri", time: "9:00 AM – 6:00 PM" },
    { _key: key(), days: "Saturday", time: "9:00 AM – 4:00 PM" },
    { _key: key(), days: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://www.instagram.com/leichhardt_dental/",
    facebook: "https://www.facebook.com/leichhardtdentalcentre",
    tiktok: "https://www.tiktok.com/@leichhardtdentalcentre",
    twitter: "https://twitter.com/LeichhardtDC",
  },
};

const homeHero = {
  _type: "homeHero",
  _id: "homeHero",
  eyebrow: "Leichhardt Dental Centre · Inner West Sydney",
  headline: "Where cutting edge science\nmeets honest local care.",
  subhead:
    "Twenty-five years of practice. A calm room. Evidence-based care — delivered one patient at a time.",
  videoUrl:
    "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/home/hero/hero-main.mp4",
  primaryCtaLabel: "Book an appointment online",
  secondaryCtaLabel: "Meet Our Team",
  secondaryCtaAnchor: "/about",
  trustCardName: "Dr. Nick Kulkarni",
  trustCardRole: "Principal Dentist",
  trustCardCredentials:
    "BDS · GradDipClinDent (Oral Implants) · MSc Prosthodontics · Fellow ICOI",
};

// ---------------------------------------------------------------------------
// Pillar 01 — General Dentistry
// ---------------------------------------------------------------------------

const pillarGeneralDentistry = {
  _type: "servicePillar",
  _id: "pillar-general-dentistry",
  number: "01",
  title: "General Dentistry.",
  slug: slug("general-dentistry"),
  tagline: "Everyday care for a healthy mouth.",
  shortDescription:
    "Routine care that prevents small problems from becoming big ones. Gentle, thorough, and built around you.",
  intro:
    "Everything you need for a healthy smile — from routine check-ups and cleans to fillings, bridges, and root canal care — delivered personally by Dr. Nick with patience, skill, and the time it takes to do things properly.",
  bentoSpan: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  bentoAspect: "aspect-[4/5] md:aspect-[16/9] lg:aspect-auto",
  subTreatments: [
    {
      _key: key(),
      id: "checkup",
      slug: slug("check-up-and-clean"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/check-up-and-clean.jpg",
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
      _key: key(),
      id: "fillings",
      slug: slug("dental-fillings"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/dental-fillings.jpg",
      name: "Dental Fillings",
      description:
        "Amalgam-free composite fillings using 3M ESPE and Ivoclar premium materials — designed to blend naturally with your tooth and bonded in a single visit.",
      longDescription:
        "We are a proudly Amalgam-Free practice. We do not use traditional silver-mercury fillings. Instead, we exclusively use premium, BPA-safe composite resins and ceramics. These materials are not only safer and more biocompatible but also allow us to preserve more of your natural tooth structure during the restoration process. At Leichhardt Dental, we don't believe in \"standard\" fillings. To ensure your restoration lasts longer and looks completely natural, we use only world-leading materials from 3M ESPE and Ivoclar. These premium composites mimic the strength and light-reflection of natural enamel, so your filling is as durable as it is beautiful.",
      whatToExpect: [
        "The \"Chameleon Effect\": these materials blend seamlessly into your tooth's unique shade, making the filling virtually invisible",
        "Nano-Technology: ultra-fine particles make the filling smoother and more resistant to staining and wear over time",
        "Better Comfort: advanced bonding technology reduces the \"shrinkage\" that causes post-treatment sensitivity",
        "Amalgam-free and BPA-safe composites (3M ESPE / Ivoclar)",
      ],
      pricing: [
        { _key: key(), name: "Small / Single-Surface Filling", price: "$200", description: "Ideal for minor decay or small chips on the biting surface." },
        { _key: key(), name: "Medium / Two-Surface Filling", price: "$280–$360", description: "Used when decay has spread between two teeth." },
        { _key: key(), name: "Large / Complex Filling", price: "Up to $490", description: "Required for significant structural repair involving multiple surfaces of the tooth." },
      ],
      risksContent:
        "Post-operative sensitivity for a few days is common, particularly with deeper fillings. Rarely, a tooth with extensive decay may later need root canal treatment if the nerve is affected. If more than 50% of the tooth structure is missing or weakened, a Same-Day CEREC Crown may be a better long-term option than a large filling — we'll talk through both at consultation.",
      faqs: [
        { _key: key(), q: "How long does a filling take?", a: "Most fillings are completed in a single 30 to 45-minute appointment. Because we use high-performance curing lights, your filling is hardened instantly, and you can eat on it almost immediately." },
        { _key: key(), q: "What is the difference between a large filling and a CEREC crown?", a: "A large filling is an excellent, affordable way to repair a tooth. However, if more than 50% of the tooth is missing or weakened, our evidence-based advice may be to consider a Same-Day CEREC Crown. This provides 360-degree protection to prevent the tooth from fracturing under heavy chewing pressure." },
        { _key: key(), q: "Can I claim this on my health fund?", a: "Yes. We process HICAPS on the spot. Most fillings use item codes 521 through 535. Because we provide upfront pricing, you can check your exact \"gap\" payment with your provider before we even start." },
      ],
    },
    {
      _key: key(),
      id: "bridges",
      slug: slug("dental-bridges"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/dental-bridges.jpg",
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
      beforeAfter: [
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/dental-bridges/before-and-after/case-1-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/dental-bridges/before-and-after/case-1-after.jpg", caption: "If teeth adjacent to the missing teeth need restoration, a dental bridge can be a quick, cost-effective and aesthetically pleasing way of maximising treatment outcomes." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/dental-bridges/before-and-after/case-2-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/dental-bridges/before-and-after/case-2-after.jpg", caption: "Significant transformation achieved by a dental bridge with minimal intervention. Well-made bridges can serve 10–15 years before they need replacement." },
      ],
      faqs: [
        { _key: key(), q: "What is the difference between a dental bridge and an implant?", a: "A bridge uses adjacent teeth for support and requires grinding down healthy enamel. An implant is an independent titanium root placed directly into the jawbone, preserving surrounding teeth." },
        { _key: key(), q: "Is a dental bridge or an implant better for me?", a: "Our evidence-based approach prioritizes your long-term bone health and budget. Implants are often superior for preserving jawbone, but bridges provide an excellent, fast solution if adjacent teeth already need crowns." },
        { _key: key(), q: "How much does a dental bridge cost in Sydney?", a: "The investment depends on the number of missing teeth and the materials used. We provide a complete, transparent fee breakdown during your consultation, so you face zero financial surprises. Typically, a dental bridge to replace a single or a couple of teeth can cost about AUD 5,000–7,000, depending on the amount of work required. With payment plans this cost can be broken down to as little as AUD 45/week." },
        { _key: key(), q: "Can I get a dental bridge made on the same day?", a: "Yes, in many cases. Using our advanced in-house CEREC digital technology, we can scan your mouth, design, and mill your custom porcelain bridge right here in the clinic. This eliminates the need for temporary bridges or a second appointment two weeks later." },
        { _key: key(), q: "How does CEREC technology work for bridges?", a: "Instead of messy, uncomfortable putty impressions, we use a high-precision 3D intraoral scanner. Our computer-aided design (CAD) software creates a 3D blueprint of your bridge, which is instantly carved from a solid block of durable, tooth-coloured ceramic in our milling machine." },
        { _key: key(), q: "Does private health insurance cover dental bridges?", a: "Yes. Dental bridges fall under Major Dental coverage. We provide HICAPS processing on-the-spot, allowing you to claim your health fund rebate instantly at checkout and only pay the remaining gap." },
        { _key: key(), q: "What item numbers are used for a dental bridge?", a: "For your health fund check, a standard 3-unit bridge typically uses code 615 (for the pontic/floating tooth) and two counts of code 613 or 618 (for the retaining crowns). We will give you an exact list of codes at your consultation." },
        { _key: key(), q: "Do you offer flexible payment plans?", a: "Yes. To ensure our evidence-based care remains accessible and affordable, we offer flexible, interest-free payment plans. This allows you to spread the cost of your treatment over manageable weekly or fortnightly instalments." },
      ],
    },
    {
      _key: key(),
      id: "wisdom",
      slug: slug("wisdom-teeth"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/wisdom-teeth.jpg",
      name: "Wisdom Teeth",
      description:
        "Assessment and removal when impaction, crowding, or recurrent infection call for it. Not every wisdom tooth needs to come out — a careful review comes first.",
      longDescription:
        "Not every wisdom tooth needs to be removed. We assess each tooth on its own merits — position, angulation, whether it's contributing to crowding, and whether you've had recurrent infection. If removal is indicated, we perform straightforward extractions in the chair under local anaesthetic; more complex cases are referred to a specialist oral surgeon.",
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
      _key: key(),
      id: "root-canal",
      slug: slug("root-canal-treatment"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/root-canal.jpg",
      name: "Root Canal Treatment",
      description:
        "When infection reaches the nerve of a tooth, root canal treatment removes the infection and preserves the tooth. Performed with rubber-dam isolation, rotary instrumentation, and CBCT 3D planning.",
      longDescription:
        "When decay or trauma reaches the pulp (nerve) of a tooth, the tooth can usually still be saved with root canal treatment. The infected pulp is carefully removed, the canals are cleaned and shaped, and the space is sealed with a biocompatible filling material. A crown is typically placed afterwards to protect the tooth long-term. Modern techniques — flexible nickel-titanium rotary files, rubber-dam isolation for sterility, and 3D CBCT scans to map the canal anatomy in advance — make the procedure considerably more predictable and comfortable than its reputation suggests. Most patients describe the procedure as no different to having a standard filling. Typical investment: $1,200–$1,800 depending on complexity. We aim to keep the complete Root Canal + CEREC Crown package below $4,000 — the rationale being that if saving your natural tooth costs more than a permanent implant, a different conversation is needed.",
      whatToExpect: [
        "Usually 1–2 appointments of 60–90 minutes",
        "Local anaesthetic throughout",
        "Rubber dam placed for sterility",
        "Modern rotary instrumentation",
        "3D CBCT scan for complex/molar cases",
        "Same-day CEREC crown afterwards for protection",
        "From $1,200; complete RCT + crown package kept below $4,000",
      ],
      processSteps: [
        { _key: key(), title: "Diagnosis & 3D scan", description: "We confirm the infection with examination and (where the tooth is complex) a 3D CBCT scan that maps every canal before we begin — so the treatment plan and quote are fixed, not estimated." },
        { _key: key(), title: "Visit 1 — clean & disinfect", description: "Local anaesthetic, rubber dam isolation, and removal of the infected pulp. The canals are cleaned and shaped with rotary instruments. This visit relieves the pain caused by the infection." },
        { _key: key(), title: "Visit 2 — seal", description: "Once the canals are clean and the tooth is comfortable, the space is sealed with a biocompatible filling material." },
        { _key: key(), title: "Crown protection", description: "A same-day CEREC crown is typically placed to protect the tooth long-term — root-treated teeth are more brittle and benefit from full coverage." },
      ],
      risksContent:
        "Modern root canal treatment is generally safe and well-tolerated. Documented success rates are high but not absolute — complex cases, re-treatments, or unusual anatomy may be referred to an endodontic specialist. A tooth that has had root canal treatment is more brittle and benefits from a protective crown to reduce the risk of fracture.",
      faqs: [
        { _key: key(), q: "Does a root canal treatment hurt?", a: "No. This is a common dental myth. Because we use modern local anaesthetics and precise techniques, the procedure feels no different than getting a standard filling. The treatment actually relieves the severe throbbing pain caused by the infected nerve." },
        { _key: key(), q: "What is a rubber dam, and why do you use it?", a: "A rubber dam is a thin, protective sheet placed over your tooth during the procedure. It isolates the tooth being treated, keeping it completely dry and sterile from saliva bacteria. It also protects your throat and tongue, making the treatment much safer and more comfortable for you." },
        { _key: key(), q: "What are rotary files?", a: "Traditional root canals used rigid hand tools. We use advanced, flexible rotary files made of modern nickel-titanium. Driven by a precise electric motor, these flexible files navigate curved root canals smoothly, cleaning out infections faster, more thoroughly, and with significantly less vibration." },
        { _key: key(), q: "Why do I need a 3D CBCT scan instead of a normal X-ray?", a: "Traditional 2D X-rays are excellent for detecting standard cavities, but they overlap anatomical structures. A 3D CBCT scan lets us virtually rotate your jaw on our screens. This means we can view your anatomy from every possible angle, revealing hidden infections, bone density levels, and precise nerve positions that standard X-rays completely miss. Complex teeth often have hidden, microscopic, or curved root canals; CBCT maps these pathways instantly, ensuring we clean out 100% of the infection and drastically improving the long-term success rate of your treatment." },
        { _key: key(), q: "How many appointments will I need?", a: "Most root canal treatments are completed across two comfortable visits. The first visit removes the infection and relieves your pain. The second visit ensures the canals are sterile before permanently sealing them." },
        { _key: key(), q: "Do I need a crown after a root canal?", a: "Yes, in almost all cases. A tooth becomes brittle and fragile once its living nerve is removed. To protect your investment and prevent the tooth from cracking, we strongly recommend placing a tooth-coloured crown. Thanks to our in-house CEREC technology, we can often design and fit this custom crown in a single visit." },
        { _key: key(), q: "How much does a Root Canal cost?", a: "At Leichhardt Dental, we believe in honest advice and no financial surprises. Our root canal treatments generally range between $1,200 and $1,800, depending on the complexity of the tooth. Front teeth usually have a single canal and are at the lower end of the range; back molars are more complex, often having three or four canals, which requires more time and precision." },
        { _key: key(), q: "What happens if I choose not to get a root canal?", a: "An untreated inner-tooth infection will not clear up on its own. The bacteria will eventually destroy the surrounding jawbone, causing severe swelling and abscesses. The only alternative at that stage is extracting the tooth completely, which requires more expensive implant or bridge work to fix." },
      ],
    },
    {
      _key: key(),
      id: "family",
      slug: slug("preventative-and-family-dentistry"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/general-dentistry/preventative-family.jpg",
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
    {
      _key: key(),
      id: "inlays",
      slug: slug("ceramic-inlays-onlays"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/ceramic-inlays-onlays-hero.jpg",
      name: "Ceramic Inlays & Onlays",
      description:
        "A conservative alternative to a full crown when a tooth is too damaged for a simple filling but doesn't yet need full coverage. A custom ceramic piece that strengthens the tooth.",
      longDescription:
        "When a tooth is too damaged for a simple filling but still has enough healthy structure that it doesn't quite need a full crown, an inlay or onlay is an evidence-based middle option — a custom-engineered ceramic piece. An inlay sits inside the grooves of your tooth; an onlay (often called a three-quarter crown) covers one or more of the biting cusps to provide structural reinforcement. We use Ivoclar e.max — a high-strength glass-ceramic that mimics the translucency of natural enamel — designed and milled chairside via CEREC in a single 90-minute appointment. Typical investment: $1,500–$1,700 per restoration.",
      whatToExpect: [
        "Single 90-minute appointment",
        "Digital 3D scan — no putty impressions",
        "Custom-milled Ivoclar e.max ceramic",
        "Preserves more healthy tooth than a full crown",
        "Bonded the same day — no temporary required",
      ],
      risksContent:
        "Inlays and onlays are generally safe. Risks include transient sensitivity, the possibility of root canal treatment if the nerve is affected during preparation, and — rarely — restoration chipping or debonding over time.",
      faqs: [
        { _key: key(), q: "How is an onlay different from a filling?", a: "A filling restores a small area inside the tooth with composite resin. An onlay is a single, solid piece of ceramic that covers and reinforces the biting surface — recommended when the damaged area is larger than a filling can reliably hold." },
        { _key: key(), q: "How is an onlay different from a full crown?", a: "A crown covers the entire tooth (360°). An onlay covers only the damaged portion and preserves more of your healthy natural enamel — a more conservative choice when the tooth has enough remaining structure." },
        { _key: key(), q: "How long does the appointment take?", a: "Typically 90 minutes from preparation to a bonded restoration. You stay in the practice the whole time — there's no second visit or temporary." },
        { _key: key(), q: "How long does a CEREC e.max onlay typically last?", a: "With good hygiene and regular check-ups, well-cared-for ceramic onlays are designed for long-term durability. Longevity depends on bite forces, grinding habits, and oral hygiene." },
      ],
    },
  ],
  processSteps: [
    { _key: key(), title: "Consultation & examination", description: "We begin with a conversation about what you're noticing and what you want from your teeth long-term. A clinical examination and any imaging needed follows." },
    { _key: key(), title: "Findings & plan", description: "Dr. Nick walks you through what he sees, what's urgent, what's optional, and what can wait. No surprises, no pressure — just a clear picture and your options." },
    { _key: key(), title: "Treatment", description: "Appointments scheduled around your life. Everything explained as we go. Time taken to do the work properly." },
    { _key: key(), title: "Maintenance", description: "Regular check-ups keep small problems small. We'll agree on a recall interval that makes sense for your mouth." },
  ],
  risksContent:
    "Routine dental procedures are generally safe but carry individual risks — including transient sensitivity after cleaning, post-operative discomfort after fillings or extractions, and, rarely, complications specific to your clinical situation. Your consultation will cover what applies to you.",
  faqs: [
    { _key: key(), q: "How often should I see a dentist?", a: "For most adults, every six months. Some patients with higher risk need more frequent visits; others with stable oral health can extend the interval. We'll recommend what suits you." },
    { _key: key(), q: "I haven't been to the dentist in years — should I be worried?", a: "You're not alone, and you won't be judged. Many of our patients come back after long breaks. We start with an honest assessment and build a plan from there at a pace that works for you." },
    { _key: key(), q: "Do you see children?", a: "Yes. We provide paediatric check-ups, fissure sealants, and early orthodontic screening. Eligible children may be covered under the Child Dental Benefits Schedule." },
    { _key: key(), q: "What happens in a check-up?", a: "A full examination of your teeth, gums, bite and soft tissues; a professional scale and polish; X-rays if clinically indicated; and a conversation about anything you've noticed. Usually 30–45 minutes." },
    { _key: key(), q: "I'm nervous about the dentist — what can you do?", a: "Tell us. We take longer appointments for anxious patients, explain everything before we do it, and stop whenever you need us to. For some procedures, sedation options are available." },
  ],
  ctaHeadline: "Due for a check-up? Let's get you in.",
  ctaSubhead: "Whether it's been six months or six years, we'll make coming back easy.",
};

// ---------------------------------------------------------------------------
// Pillar 02 — Dental Implants
// ---------------------------------------------------------------------------

const pillarDentalImplants = {
  _type: "servicePillar",
  _id: "pillar-dental-implants",
  number: "02",
  title: "Dental Implants.",
  slug: slug("dental-implants"),
  tagline: "Replacing teeth, the way nature intended.",
  shortDescription:
    "Titanium roots that restore function and structure — from a single tooth to a full arch. Planned with in-house 3D CBCT, EthOss synthetic bone grafting where needed, and zirconia crowns made locally in Sydney.",
  intro:
    "Missing teeth shouldn't hold you back from eating, smiling, or living with confidence. At Leichhardt Dental, dental implantology is the primary focus of our clinical practice. Led by Dr Nick Kulkarni — a registered specialist prosthodontist with over 25 years of extensive international clinical experience and a Fellow of the International Congress of Oral Implantologists — we combine world-class 3D imaging with advanced surgical techniques to restore your smile's permanent strength. We achieve predictable, long-term results by focusing on three strict pillars of care: unrivalled accuracy with in-house 3D CBCT imaging; 100% synthetic bone regeneration with EthOss (no donor or animal tissue); and premium Zirconia crowns, 100% made in Sydney by master technicians — we do not outsource our restorations to cheap overseas labs. We also offer metal-free zirconia implants for patients who prefer a non-metal option. Flexible payment plans available through TLC Finance.",
  bentoSpan: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  bentoAspect: "aspect-[4/5] md:aspect-[5/4]",
  subTreatments: [
    {
      _key: key(),
      id: "single",
      slug: slug("single-tooth-implants"),
      imageUrl: IMG.implantMaking,
      name: "Single Tooth Implants",
      description:
        "A titanium post placed where the tooth root used to be, topped with a zirconia crown made locally in Sydney. Teeth either side are left untouched — unlike a bridge.",
      longDescription:
        "If you have a single missing tooth, or a tooth that is badly broken and cannot be saved, you do not have to rely on traditional options. At Leichhardt Dental Centre, we offer single dental implants. This modern treatment replaces one missing tooth from the root up, giving you a fixed, natural tooth-like solution that looks, feels, and functions just like a real tooth. Every single implant procedure at our clinic is personally looked after by our principal dentist, Dr Nick Kulkarni. The most critical part of a successful result is careful planning, correct surgical technique, and respecting your natural biology. Dr Nick uses proven scientific evidence to ensure your new tooth works in harmony with your body, looking beautiful and working perfectly. To keep you completely safe, every single implant placement is done under full hospital-grade sterile conditions, meeting the highest cleanliness standards. We exclusively use world-class, premium brands like BioHorizons and Implant Direct — high-quality, American-made systems backed by rigorous quality assurance. We use our own advanced 3D scanner (CBCT) right here in the office, creating a highly detailed 3D digital map of your mouth so Dr Nick can check the exact shape, density, and height of your foundations before any treatment begins. Where there is not enough natural foundation left, we rebuild the area using an advanced, 100% synthetic material called EthOss — because it is entirely lab-made, it completely removes the risk of cross-contamination linked to older human or animal materials, and over time your body fully absorbs it, turning it into your own natural, healthy tissue. A single implant is made of three simple parts: the Anchor, a tiny, medical-grade metal anchor that sits gently below your gums; the Connector, a small attachment piece that sits just above the gum line; and the New Tooth, a custom-made porcelain crown designed to match the shape and colour of your surrounding teeth exactly.",
      whatToExpect: [
        "Personally looked after by Dr Nick Kulkarni",
        "Full hospital-grade sterile conditions",
        "World-class, premium brands (BioHorizons & Implant Direct)",
        "Advanced in-house CBCT for perfect accuracy",
        "100% synthetic EthOss bone grafting where needed",
        "A journey of 3 to 6 months from start to finish",
      ],
      pricing: [
        { _key: key(), name: "Single dental implant", price: "$5,000–$7,500", description: "The final amount depends entirely on the unique complexity of your specific procedure, such as the amount of bone grafting needed to create a strong foundation." },
      ],
      processSteps: [
        { _key: key(), title: "Step 1: The Plan", description: "Dr Nick takes a digital 3D look at your mouth to map out the safest spot for your new tooth." },
        { _key: key(), title: "Step 2: The Placement", description: "The small anchor and the protective synthetic material are gently placed into the mouth under local numbing." },
        { _key: key(), title: "Step 3: The Healing", description: "We wait a few months to let everything settle and bond completely with your body." },
        { _key: key(), title: "Step 4: The Final Touch", description: "Your precision-crafted, custom tooth is securely attached to the anchor, completing your smile." },
      ],
      risksContent:
        "Implant surgery is generally safe and well-established. Risks include infection, swelling, transient nerve sensitivity, and — rarely — implant failure where the bone does not fuse with the titanium.",
      beforeAfter: [
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-1-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-1-after.jpg", caption: "Front-tooth loss can be distressing. A sporting injury in the teens led to infection and the eventual loss of a front tooth, which was replaced with a dental implant. Shown here at a 5-year follow-up.", detail: [ { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-1-xray-1.jpg", label: "CBCT scan" }, { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-1-xray-2.jpg", label: "3D planning" } ] },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-2-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-2-after.jpg", caption: "A history of trauma and infection in a front tooth, replaced with a dental implant. A high smile line — where the full tooth and gum show when smiling — makes these among the most demanding restorations to match naturally.", detail: [ { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-2-xray-1.jpg", label: "CBCT scan" }, { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-2-xray-2.jpg", label: "3D planning" } ] },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-3-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-3-after.jpg", caption: "An infected front tooth replaced with a dental implant. The 'after' image is a 10-year follow-up — the restoration continuing to function and blend with the surrounding teeth.", detail: [ { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-3-xray-1.jpg", label: "X-ray (10-year)" } ] },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-4-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-4-after.jpg", caption: "Multiple missing teeth replaced with implant-supported bridges. We take a conservative approach — teeth that can be retained are kept. A slight colour difference reflects a preference for whiter replacement teeth; in everyday smiling it isn't evident.", detail: [ { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-4-xray-1.jpg", label: "Panoramic X-ray" } ] },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-5-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-5-after.jpg", caption: "Some patients are born with congenitally (from birth) missing teeth. These are among the youngest patients we plan for: orthodontic treatment first aligns the teeth and holds the space, so a dental implant can be placed once jaw growth is complete." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-6-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-6-after.jpg", caption: "Front teeth lost to trauma, replaced with dental implants to restore a natural-looking smile.", detail: [ { _key: key(), src: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/single-tooth/before-and-after/case-6-xray-1.jpg", label: "X-ray" } ] },
      ],
      faqs: [
        { _key: key(), q: "How can I find out if an implant is right for me?", a: "We offer a complimentary 30-minute consultation for new implant patients. This visit includes a free 3D scan using our in-house machine. Dr Nick will personally look at your foundations, talk through your goals, and let you know if a dental implant is the absolute best option for your smile." },
        { _key: key(), q: "Why choose an implant over a bridge?", a: "Older dental bridges require grinding down the healthy neighboring teeth to hold the new tooth in place. An implant stands completely on its own. Unlike a loose plate, an implant stays in your mouth — it does not slide around, click when you talk, or need to be taken out at night. And you can bite into apples, steak, or crunchy foods without any fear of your tooth shifting or coming loose." },
        { _key: key(), q: "How do I care for my implant?", a: "Caring for a dental implant is incredibly easy. Because it acts just like a real tooth, you look after it the same way: brush twice a day with regular toothpaste, floss daily around the area to keep your gums healthy, and visit our team for your regular 6-month checkups and professional cleans." },
        { _key: key(), q: "How much does a single dental implant cost?", a: "The investment for a single dental implant generally varies between $5,000 and $7,500. The final amount depends entirely on the unique complexity of your specific procedure, such as the amount of bone grafting needed to create a strong foundation." },
        { _key: key(), q: "Are there payment plans available?", a: "Yes. We believe quality care should be accessible. We offer flexible payment plans through our trusted financing partners, TLC Finance. This allows you to break down the cost of your treatment into manageable pieces, starting from as little as $50 per week." },
      ],
    },
    {
      _key: key(),
      id: "zirconia",
      slug: slug("zirconia-implants"),
      imageUrl: IMG.modelEquipment,
      name: "Zirconia (Metal-Free) Implants",
      description:
        "At Leichhardt Dental Centre, we offer advanced zirconia implant solutions for patients seeking durable, highly aesthetic, and completely metal-free options to restore missing teeth. We use the Straumann® Pure Ceramic system.",
      longDescription:
        "Over the past 60 years, dental implantology has evolved into one of the most highly researched and predictable fields of modern dentistry. While titanium has long been the traditional cornerstone of tooth replacement, modern innovation has introduced a high-performance alternative: Zirconia (ceramic) implants. At Leichhardt Dental Centre, we offer advanced zirconia implant solutions for patients seeking durable, highly aesthetic, and completely metal-free options to restore missing teeth. Both titanium and zirconia possess a critical property known as osseointegration—the biological process where your natural jawbone securely grows around and fuses to the implant surface. Because the body does not recognize either material as a foreign object, both offer highly stable foundations for replacement teeth. However, zirconia implants are rapidly emerging as the preferred choice for individuals who prioritize non-metal dental treatments or have specific systemic sensitivities. While titanium is generally well-tolerated, clinical studies indicate that titanium hypersensitivity affects roughly 0.6% of the population, and for patients with known metal allergies or multi-system chemical sensitivities, non-metallic zirconia eliminates the risk of a localized hypersensitive reaction. While zirconia is incredibly strong and highly resistant to wear, it possesses less material flexibility than titanium; because of this structural stiffness, long-term clinical data (currently spanning 5 to 10 years) suggests they should be selected with precise clinical oversight, and zirconia implants require careful placement planning, particularly when replacing heavy-stress back molars or when treating patients who chronically clench or grind their teeth (bruxism). In Sydney, a single complete Straumann® Pure Ceramic Zirconia implant—including the surgical fixture, abutment, and premium porcelain crown—typically ranges from $5,500 to $7,500.",
      whatToExpect: [
        "Premium Aesthetics: naturally white and opaque for a flawless cosmetic finish at the gumline",
        "Corrosion Resistance: a bio-inert ceramic that does not corrode or release metallic ions",
        "Superior Hygiene & Health: accumulates significantly less bacterial plaque than titanium",
        "Completely metal-free — Straumann® Pure Ceramic",
        "Long-term clinical data currently spanning 5 to 10 years",
      ],
      pricing: [
        { _key: key(), name: "Single complete Straumann® Pure Ceramic Zirconia implant", price: "$5,500–$7,500", description: "Includes the surgical fixture, abutment, and premium porcelain crown. Zirconia reflects a 20% to 30% premium over titanium ($4,000–$6,500). Your exact investment depends on the location of the missing tooth and your jawbone density." },
        { _key: key(), name: "Bone grafting or sinus lift (if required)", price: "$500–$2,500", description: "If a tooth was lost long ago and the jawbone has receded, supportive procedures may be needed before placement. Dr Nick identifies this during your initial 3D scan." },
      ],
      processSteps: [
        { _key: key(), title: "Structural Jaw Scan", description: "We take precise digital imaging to evaluate the exact volume and density of your jawbone." },
        { _key: key(), title: "Bite & Force Analysis", description: "Dr Nick assesses your bite relationship to ensure your jaw joint (TMJ) can safely support a ceramic restoration without excessive stress or grinding wear." },
        { _key: key(), title: "Tailored Treatment Blueprint", description: "We map out an evidence-based timeline and provide a fully itemised cost breakdown, including specific dental item codes for your private health fund." },
      ],
      risksContent:
        "Zirconia implant surgery carries the same general risks as any implant — infection, swelling, transient nerve sensitivity, and, rarely, failure of the implant to fuse with the bone. Because zirconia is stiffer and less flexible than titanium, it requires careful case selection and may be less suited to people who heavily clench or grind, or to some high-load back-tooth positions. Long-term clinical data currently spans roughly 5–10 years. Dr. Nick assesses your bite and jaw structure at consultation to confirm whether a ceramic implant is appropriate for you.",
      beforeAfter: [
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/zirconia/before-and-after/case-1-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/dental-implants/zirconia/before-and-after/case-1-after.jpg", caption: "Metal-free zirconia implant for a patient with a titanium allergy, shown at an 8-year follow-up." },
      ],
      faqs: [
        { _key: key(), q: "How much do Zirconia dental implants cost compared to Titanium?", a: "In Australia, the cost of a single, complete traditional titanium implant generally falls between $4,000 and $6,500. Because zirconia is an advanced ceramic material requiring complex diamond-tooled manufacturing and custom laboratory processing, zirconia implants reflect a 20% to 30% premium. In Sydney, a single complete Straumann® Pure Ceramic Zirconia implant—including the surgical fixture, abutment, and premium porcelain crown—typically ranges from $5,500 to $7,500. Your exact investment depends entirely on the anatomical location of the missing tooth and your unique jawbone density." },
        { _key: key(), q: "What is included in the total treatment cost?", a: "At Leichhardt Dental Centre, we practice full financial transparency. Your comprehensive zirconia implant package covers: Advanced Digital Diagnostics (high-resolution intraoral 3D scanning and treatment mapping); Premium Componentry (the genuine, Swiss-engineered Straumann® Pure Ceramic implant fixture); Surgical Placement (the physical implant surgery and all necessary post-operative clinical review checks with Dr Nick); and The Final Restoration (a custom-milled, highly aesthetic porcelain crown designed to match your surrounding teeth seamlessly)." },
        { _key: key(), q: "Are there any hidden or additional costs?", a: "Some patients may require supportive therapies to ensure a stable, long-term foundation before the implant can be placed. If a tooth was lost long ago, the jawbone may have naturally receded. If required, supportive procedures like localized bone grafting or a sinus lift generally add between $500 and $2,500 to the treatment plan. Dr Nick will identify if these supportive steps are clinically necessary during your initial 3D x-ray scan." },
        { _key: key(), q: "Is the cost covered by Private Health Insurance?", a: "Yes, most major Australian health funds provide partial rebates for dental implant surgery and crown restorations under Major Dental Extras Cover. We give you an itemised treatment plan at your consultation so you can verify your exact out-of-pocket rebate directly with your fund before starting care." },
        { _key: key(), q: "Do you offer flexible dental payment options?", a: "Absolutely. We believe that choosing premium, bio-inert dental care should fit comfortably within your family budget. We offer interest-free dental payment plans that allow you to distribute the cost of your premium ceramic implant into structured weekly or monthly instalments over your active healing period." },
      ],
    },
    {
      _key: key(),
      id: "overdentures",
      slug: slug("implant-supported-overdentures"),
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
        { _key: key(), title: "Consultation & 3D scan", description: "Dr. Nick reviews your medical and dental history and takes a low-dose 3D CT scan to assess bone volume and plan implant position." },
        { _key: key(), title: "Implant placement", description: "Two implants are typically placed in the lower jaw under local anaesthetic. You go home the same day." },
        { _key: key(), title: "Healing (3–6 months)", description: "The titanium implants fuse with the jawbone (osseointegration). A temporary denture can be worn during this phase." },
        { _key: key(), title: "Denture fitting", description: "Once healed, your custom overdenture is fitted with internal attachments that \"snap\" onto the implants. We adjust until it feels comfortable and stable." },
        { _key: key(), title: "Ongoing maintenance", description: "The small internal clips that provide the \"snap\" wear naturally and are replaced every few years at a routine appointment." },
      ],
      risksContent:
        "Implant-supported overdentures use the same implant surgery as other implant treatments, with risks including infection, bleeding, swelling, transient nerve sensitivity, and — rarely — implant failure. Because the overdenture remains a removable device, it must be taken out daily for cleaning and should not be worn while sleeping. The small internal attachments that provide the \"snap\" will wear over time and typically need a quick professional replacement every few years.",
      faqs: [
        { _key: key(), q: "How much does an implant-supported overdenture cost?", a: "A typical case involving two implants, the custom denture, and all necessary clinical work is approximately $12,000. We provide a detailed written quote at your consultation, tailored to your specific clinical situation." },
        { _key: key(), q: "How is this different from a regular denture?", a: "A regular denture rests on your gums and can slip or shift while you eat or speak. An implant-supported overdenture snaps onto implants placed in your jaw, providing far better retention and stability." },
        { _key: key(), q: "How is this different from All-on-4?", a: "All-on-4 uses four or more implants to support a fixed full arch of teeth that you don't take out. An overdenture uses fewer implants (typically two) and is removable for cleaning. Many patients use an overdenture as a stop-gap before later considering All-on-4." },
        { _key: key(), q: "How often do the clips need to be replaced?", a: "Every few years on average, depending on use. It's a quick professional replacement at a routine maintenance appointment." },
        { _key: key(), q: "Can I sleep with my overdenture in?", a: "No — it should be taken out at night for cleaning and to give your gums a rest. This is important for long-term oral health." },
      ],
    },
    {
      _key: key(),
      id: "all-on-4",
      slug: slug("all-on-4-implants"),
      imageUrl:
        "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/all-on-4/before-and-after/case-2.jpg",
      name: "All-on-4 Implants",
      description:
        "A fixed full arch of teeth supported by four or more implants per jaw. For patients missing most or all of their teeth, or whose current teeth cannot be saved.",
      longDescription:
        "All-on-4 is a full-arch rehabilitation technique where four (sometimes more) implants support a fixed set of teeth per jaw. The surgical and provisional stages are often done the same day — patients go home from surgery with a temporary fixed set of teeth, not dentures. After 3–6 months of healing, the temporary is replaced with a final, high-strength prosthesis.",
      whatToExpect: [
        "3D CT planning and digital smile design before any surgery",
        "Four implants per arch placed under sedation or GA",
        "Same-day fixed provisional teeth",
        "3–6 months healing, then final prosthesis",
      ],
      processSteps: [
        { _key: key(), title: "Consultation & 3D CT imaging", description: "A full assessment of your bone, bite, and medical history. The CT scan determines whether All-on-4 is the right option for you." },
        { _key: key(), title: "Digital smile & surgical planning", description: "We design the final set of teeth digitally, then plan the four implant positions around that design." },
        { _key: key(), title: "Implant surgery", description: "Four implants placed per arch in a single surgical visit, typically under sedation or GA for comfort." },
        { _key: key(), title: "Same-day provisional teeth", description: "A fixed set of temporary teeth is attached to the implants on the day of surgery." },
        { _key: key(), title: "Healing period (3–6 months)", description: "Implants bond with bone. You wear the provisional teeth and return for routine reviews." },
        { _key: key(), title: "Final prosthesis", description: "Once healed, the provisional is replaced with your final fixed prosthesis — crafted for longevity, aesthetics, and function." },
      ],
      risksContent:
        "All-on-4 is a major procedure. Risks include standard surgical complications (bleeding, swelling, infection, transient nerve sensitivity, sinus involvement in the upper jaw) plus the possibility of individual implant failure. Long-term success depends on hygiene, general health, and regular maintenance visits.",
    },
  ],
  processSteps: [
    { _key: key(), title: "Consultation & 3D imaging", description: "Dr. Nick reviews your medical and dental history and takes a low-dose 3D CT scan. This lets us see the bone volume, nerve position, and exact space available — no guesswork." },
    { _key: key(), title: "Digital surgical planning", description: "Using the CT data, we plan the implant position on screen before touching a scalpel. Safer, more predictable, and more precise than conventional planning." },
    { _key: key(), title: "Implant placement", description: "A minor surgical procedure, usually under local anaesthetic. For larger cases like All-on-4, sedation or general anaesthesia is available. You go home the same day." },
    { _key: key(), title: "Osseointegration (healing)", description: "Over the next 3–6 months, the titanium implant fuses with your jawbone. A temporary tooth or bridge can often be worn during this phase." },
    { _key: key(), title: "Final restoration", description: "Once the implant is fully integrated, we take a digital impression and fit your permanent crown, bridge, or fixed arch — matched in shape and shade to your other teeth." },
  ],
  secondaryProcessTitle: "The All-on-4 journey.",
  secondaryProcessSteps: [
    { _key: key(), title: "Consultation & 3D CT imaging", description: "A full assessment of your bone, bite, and medical history. The CT scan determines whether All-on-4 is the right option for you." },
    { _key: key(), title: "Digital smile & surgical planning", description: "We design the final set of teeth digitally, then plan the four implant positions around that design — not the other way round." },
    { _key: key(), title: "Implant surgery", description: "Four implants placed per arch in a single surgical visit, typically under sedation or GA for comfort. Any remaining compromised teeth are removed at the same time." },
    { _key: key(), title: "Same-day provisional teeth", description: "A fixed set of temporary teeth is attached to the implants on the day of surgery. You leave the practice with a full set of teeth — not dentures, not gaps." },
    { _key: key(), title: "Healing period", description: "3–6 months for the implants to bond with bone. You wear the provisional teeth, eat progressively firmer foods, and return for routine reviews." },
    { _key: key(), title: "Final prosthesis", description: "Once healed, the provisional is replaced with your final fixed prosthesis — crafted for longevity, aesthetics, and function. Regular maintenance visits keep it in good order." },
  ],
  risksContent:
    "Dental implant surgery is generally safe and well-established, but carries risks including infection, bleeding, swelling, transient nerve sensitivity, sinus involvement in the upper jaw, and — rarely — implant failure where osseointegration does not occur. Long-term success depends on oral hygiene, general health, and regular maintenance visits.",
  faqs: [
    { _key: key(), q: "Does it hurt?", a: "Implant placement is performed under local anaesthetic (or sedation for larger cases). Most patients report less post-op discomfort than a tooth extraction." },
    { _key: key(), q: "How long does the whole process take?", a: "For a single implant: typically 3–6 months from placement to final crown. For All-on-4: implants and same-day teeth on day one, final prosthesis after 3–6 months of healing." },
    { _key: key(), q: "How much does a single implant cost?", a: "An investment for a complete single dental implant ranges from $5,000 to $6,500+. This includes your initial 3D planning scans, the surgical placement of the premium titanium implant fixture, the custom abutment, and your locally made Zirconia crown. We provide fully itemized quotes upfront with zero hidden fees." },
    { _key: key(), q: "Do you offer payment plans?", a: "Yes — we partner with TLC Finance to offer flexible, low-interest payment plans, allowing you to spread the cost over manageable weekly or fortnightly instalments." },
    { _key: key(), q: "What is Dr. Nick's implant training?", a: "Dr. Nick Kulkarni is a registered specialist prosthodontist with a Master's in Prosthodontics and a Graduate Diploma in Oral Implants from the University of Sydney. He is a Fellow of the International Congress of Oral Implantologists, with advanced training at the Misch Implant Institute (Florida) and the Walpole Institute (London)." },
    { _key: key(), q: "Am I too old for implants?", a: "Age alone isn't a barrier. What matters is general health, medication history, and bone volume — all of which are assessed at your consultation." },
    { _key: key(), q: "What if I don't have enough bone?", a: "We use EthOss — a synthetic biomaterial — for bone grafting where needed. It's animal-free and donor-free, and is absorbed and replaced by your own bone within months. The 3D scan tells us what's feasible in your case." },
    { _key: key(), q: "Is full-arch implant restoration my only option for missing teeth?", a: "Not at all. Several pathways exist — single implants, implant-supported bridges, implant-retained overdentures, traditional crown and bridge, or periodontal treatment to save natural teeth. Dr. Nick reviews all of these at your consultation." },
  ],
  ctaHeadline: "Thinking about an implant?",
  ctaSubhead: "The first step is a consultation and 3D scan — so we can tell you honestly what's possible in your case.",
};

// ---------------------------------------------------------------------------
// Pillar 03 — Same Day Smile (merged CEREC + smile design)
// ---------------------------------------------------------------------------

const pillarSameDaySmile = {
  _type: "servicePillar",
  _id: "pillar-same-day-smile",
  number: "03",
  title: "Same Day Smile.",
  slug: slug("same-day-smile"),
  tagline: "Cosmetic dentistry, in a day.",
  shortDescription:
    "Same-day crowns, veneers, ceramic inlays/onlays, and whitening — designed digitally, milled chairside via CEREC, bonded in a single visit.",
  intro:
    "When you're ready for an aesthetic change, Same Day Smile is a planned combination of CEREC same-day ceramics, in-chair whitening, and conservative restorative work — delivered in a single appointment where possible. We use 100% Australian-made restorations and premium materials (Ivoclar e.max ceramics, 3M and Ivoclar composites), planned digitally so you see the design before any tooth is touched.",
  bentoSpan: "md:col-span-1 lg:col-span-5 lg:row-span-1",
  bentoAspect: "aspect-[4/5] md:aspect-[5/4]",
  subTreatments: [
    {
      _key: key(),
      id: "crowns",
      slug: slug("same-day-crowns"),
      videoUrl: "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/single-visit-crowns/cerec-same-day/same-day-crown-hero.mp4",
      videoPoster: "https://res.cloudinary.com/dzydzte9h/video/upload/so_2,q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/same-day-smile-hero.jpg",
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/single-visit-crowns/cerec-same-day/vita-furnace.jpg",
      name: "Same Day Crowns",
      description: "A full-coverage ceramic crown designed, milled, and bonded in a single appointment via CEREC. For teeth that need more than a filling can provide.",
      longDescription: "A CEREC same-day crown rebuilds a tooth that has lost too much structure for a simple filling — a cracked, heavily restored, or root-treated tooth. The tooth is prepared, scanned in 3D, designed on screen, and milled from a solid ceramic block while you wait. The final restoration is bonded the same day. No impression trays, no temporary, no second visit. Our crowns are designed and milled in-house, then finished by local Sydney master technicians where additional staining or layering is needed.",
      whatToExpect: ["90 minutes to 2 hours total in the chair", "Local anaesthetic throughout", "Premium ceramic milled while you wait (~20 minutes)", "Shade-matched to your neighbouring teeth", "Bonded same day — no temporary needed"],
      processSteps: [
        { _key: key(), title: "Preparation", description: "The tooth is shaped under local anaesthetic." },
        { _key: key(), title: "3D scan", description: "A wand-shaped scanner captures the tooth — no putty." },
        { _key: key(), title: "Design", description: "The crown is designed on screen to match your bite." },
        { _key: key(), title: "Milling", description: "A solid ceramic block is milled into your crown in roughly 20 minutes." },
        { _key: key(), title: "Fire & bond", description: "The restoration is fired, polished, and bonded in place." },
      ],
      risksContent: "Crown procedures are generally safe. Risks include transient sensitivity, the need for root canal treatment if the nerve is affected by decay or preparation, and — rarely — restoration fracture or debonding requiring repair.",
    },
    {
      _key: key(),
      id: "veneers",
      slug: slug("same-day-veneers"),
      videoUrl: "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/same-day-smile/cerec-crowns-veneers/same-day-smile-hero.mp4",
      videoPoster: "https://res.cloudinary.com/dzydzte9h/video/upload/so_2,q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/same-day-smile-hero.jpg",
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/case-1.jpg",
      name: "Same Day Veneers",
      description: "Thin ceramic facings bonded to the front surface of a tooth to change shape, colour, or alignment. Designed digitally, milled chairside, bonded the same day.",
      longDescription: "Veneers are thin ceramic facings bonded to the front surface of a tooth to change its shape, colour, or alignment. Using CEREC and Ivoclar e.max ceramic, we can design and mill veneers in-house and bond them the same day. For larger smile makeovers we often combine ceramic veneers (front 2–4 teeth, where the cosmetic improvement is most visible) with composite bonding on the remaining visible teeth — a strategy that balances long-term aesthetics with cost. Typical investment: from approximately $1,600 per ceramic veneer; flexible weekly payment plans available.",
      whatToExpect: ["Digital smile design preview before any tooth is touched", "Shade-matched to your whitening result (if applicable)", "Milled and bonded same day", "Premium ceramic — no metal", "From ~$1,600 per tooth; weekly payment options"],
      risksContent: "Preparation of the tooth for veneers involves removing a thin layer of enamel — this is permanent and cannot be undone. Risks include post-operative sensitivity, the possibility of root canal treatment if the nerve is affected, and chipping or debonding over time. Cases requiring complex layering or specialty aesthetics may be referred to a ceramist for traditional lab-made veneers.",
      beforeAfter: [
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-1-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-1-after.jpg", caption: "Premium Emax ceramic veneers for a durable, natural smile makeover. The after photo was taken at a 10-year follow-up appointment." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-2-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-2-after.jpg", caption: "Premium ceramic veneers standing the test of time — in service for 10 years and continuing to do so." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-3-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-3-after.jpg", caption: "Same-day smile transformation with Emax veneers and Zoom whitening for the lower teeth — fixing broken-down, chipped teeth and faded colour in one efficient treatment." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-4-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-4-after.jpg", caption: "Emax veneers made with the CEREC machine — all in one day." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-5-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-5-after.jpg", caption: "A well-deserved 60th birthday present — delivered in one day with premium Emax veneers." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-6-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-6-after.jpg", caption: "A retirement gift to self — a veneer smile makeover with premium Emax ceramic." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-7-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-7-after.jpg", caption: "A close-up of the transformation with Emax ceramic veneers, done with our in-house Same Day Smile technology." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-8-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/cerec-crowns-veneers/before-and-after/case-8-after.jpg", caption: "Long-term gum disease can create gaps between the teeth. Once the gum disease was stabilised and under control, the gaps were closed with Emax ceramic veneers — done with our in-house Same Day Smile technology." },
      ],
    },
    {
      _key: key(),
      id: "inlays",
      slug: slug("ceramic-inlays-onlays"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/ceramic-inlays-onlays-hero.jpg",
      name: "Ceramic Inlays & Onlays",
      description: "A custom Ivoclar e.max ceramic restoration that sits between a filling and a full crown — designed and milled chairside with CEREC and bonded in a single ~90-minute visit, keeping more of your natural tooth than a crown.",
      longDescription: "When a tooth is too damaged for a simple filling but still has enough healthy structure that it doesn't quite need a full crown, an Inlay or Onlay is the ideal evidence-based solution. Think of it as a \"partial crown\" or a custom-engineered puzzle piece. An Inlay sits inside the grooves of your tooth, while an Onlay (often called a \"three-quarter crown\") covers one or more of the biting points (cusps) to provide structural reinforcement. At Leichhardt Dental, we do not use generic lab-processed ceramics. For every restoration, we exclusively use Ivoclar e.max®—widely considered the world's best-selling and most reliable glass-ceramic. We chose Ivoclar e.max® for two critical reasons: unrivalled strength, designed to withstand the heavy biting forces of back teeth and significantly reduce the risk of your tooth fracturing; and natural aesthetics, mimicking the translucency and light-reflection of real tooth enamel so perfectly that the restoration is virtually invisible once bonded. By combining Ivoclar materials with our in-house CEREC technology, we 3D-scan your tooth (no putty required), precision-design your restoration on screen to match your bite perfectly, mill it from a solid Ivoclar e.max block in our clinic, and fit and bond it in a single 90-minute visit. A typical inlay or onlay is approximately $1,500–$1,700.",
      whatToExpect: ["Maximum Tooth Preservation: we only remove the decayed part, keeping most of your healthy natural enamel", "No \"Putty\" Impressions: a digital 3D scanner — faster, more comfortable, and more accurate than traditional moulds", "Perfect Bite Alignment: designed to the micron so your bite feels perfectly balanced", "Exceptional Durability: high-strength Ivoclar e.max — doesn't shrink, leak, or stain, providing a permanent seal against future decay", "Bonded in a single 90-minute visit — no temporary, no second appointment"],
      pricing: [
        { _key: key(), name: "CEREC Ivoclar e.max inlay / onlay", price: "$1,500–$1,700", description: "A large composite filling costs around $490; for a more heavily damaged tooth, a bonded ceramic onlay restores more of the tooth's strength and is designed to last longer." },
      ],
      processSteps: [
        { _key: key(), title: "3D Scan", description: "Capture a high-definition digital map of your tooth — no putty required." },
        { _key: key(), title: "Custom Design", description: "Precision-design your restoration on screen to match your bite perfectly." },
        { _key: key(), title: "Instant Milling", description: "Carve your restoration from a solid Ivoclar e.max block in our clinic." },
        { _key: key(), title: "Bond Permanently", description: "Fit and bond your restoration in a single 90-minute visit." },
      ],
      risksContent: "As with crowns, possible risks include transient sensitivity after preparation, the small chance the nerve is affected and root canal treatment becomes necessary, and — uncommonly — chipping or debonding of the restoration over time. How long a restoration lasts depends on your bite, oral hygiene, and regular check-ups.",
      faqs: [
        { _key: key(), q: "What's the difference between an inlay, an onlay, and a crown?", a: "An Inlay sits within the grooves on the top of the tooth; an Onlay (often called a \"three-quarter crown\") also covers one or more of the biting cusps to reinforce the tooth; a crown covers the whole tooth. Inlays and onlays are more conservative than a crown — we keep more of your healthy natural tooth." },
        { _key: key(), q: "Why do you use Ivoclar e.max?", a: "Ivoclar e.max® is widely considered the world's best-selling and most reliable glass-ceramic — the gold standard in material. It has unrivalled strength to withstand the heavy biting forces of back teeth, and its natural aesthetics mimic the translucency and light-reflection of real tooth enamel so the restoration is virtually invisible once bonded. We mill it in-house with CEREC." },
        { _key: key(), q: "Do I need a temporary or a second appointment?", a: "No. Because we design and mill your restoration chairside with CEREC, it's bonded the same day — typically a single 90-minute visit. There's no two-week wait, no temporary filling, and no second round of numbing." },
        { _key: key(), q: "Why choose an onlay over a large filling?", a: "A large composite filling costs less upfront (around $490) and can be the right choice for a smaller cavity. For a more heavily damaged tooth, a bonded ceramic onlay (around $1,500–$1,700) restores more of the tooth's strength and is designed to last longer." },
      ],
    },
    {
      _key: key(),
      id: "whitening",
      slug: slug("zoom-whitening"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/whitening/case-1.jpg",
      name: "Zoom Whitening",
      description: "In-chair Philips ZOOM whitening to lighten the shade of your teeth in a single one-hour session. Sensitivity managed with desensitising gels.",
      longDescription: "Philips ZOOM in-chair whitening lifts the shade of your natural teeth using a hydrogen peroxide gel activated by a specialised light. One session typically takes about an hour. When a same-day smile makeover is planned, we often whiten first so any ceramic restorations can be colour-matched to your new shade. Take-home trays are usually provided for top-ups between sessions.",
      whatToExpect: ["~60 minutes in-chair", "Gel applied, light activated", "Desensitising agents to manage sensitivity", "Take-home trays for maintenance"],
      risksContent: "Transient tooth sensitivity and mild gum irritation are common for 24–48 hours after whitening. Whitening does not change the colour of existing crowns, veneers, or fillings — these may need to be replaced if a shade match is important.",
    },
    {
      _key: key(),
      id: "bonding",
      slug: slug("composite-bonding"),
      imageUrl: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-1.jpg",
      name: "Composite Bonding",
      description: "Composite veneering / dental bonding — an affordable, single-visit solution for immediate smile enhancement, sculpted by hand and polished the same day.",
      longDescription: "Dental bonding, also referred to as composite veneering, provides an affordable, single-visit solution for immediate smile enhancement. Individuals with generally healthy teeth exhibiting minor wear, slight chipping, or a somewhat dulled appearance are ideal candidates. Addressing these concerns through composite resin application is both straightforward and highly effective. Those who are not yet prepared—emotionally or financially—to pursue ceramic veneers will find this an excellent interim option for improving their smile. With proper care, a composite smile design typically maintains its results for approximately 5–7 years before a transition to ceramic alternatives becomes advisable. A combined approach incorporating both ceramic and composite veneering is a strategy we frequently recommend: ceramic veneers are placed on the front 2–4 teeth requiring the most significant cosmetic improvement, while the remaining visible teeth are treated with composite bonding — delivering optimal results from both techniques while managing your total investment.",
      whatToExpect: ["Personalised Consultation: we discuss your aesthetic goals, select the ideal shade match, and map out your custom smile design", "Surface Preparation: we gently clean and prepare the tooth surface to ensure a strong, long-lasting bond", "Artistic Sculpting: our dentist meticulously layers the composite resin, shaping it by hand to match your facial features", "Curing & Final Polish: a specialized light hardens the resin instantly, followed by high-gloss polishing for a smooth, natural sheen"],
      beforeAfter: [
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-1-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-1-after.jpg", caption: "Minimal smile intervention with only the front two teeth veneered, plus a little Zoom whitening." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-2-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-2-after.jpg", caption: "A pleasant, healthy, natural-looking smile transformation — angle correction with a minimal approach, using ceramic veneers on only the front two teeth." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-3-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-3-after.jpg", caption: "A minimal-intervention smile design with just the two front teeth getting ceramic veneers — minimal cost, minimal intervention, and an optimal, natural-looking result." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-4-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-4-after.jpg", caption: "A simple solution of veneers on only the front two teeth — not only to create a pleasant look, but to protect the wearing-down enamel." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-5-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-5-after.jpg", caption: "Natural-looking harmony and balance." },
        { _key: key(), before: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-6-before.jpg", after: "https://res.cloudinary.com/dzydzte9h/image/upload/q_auto,f_auto/dental-website/same-day-smile/bonding/case-6-after.jpg", caption: "A pleasant smile transformation to suit the patient's overall age — restoring broken-down and chipped teeth in the process, using a combination of bonding and ceramic veneers." },
      ],
      pricing: [
        { _key: key(), name: "Composite Veneers / Bonding", price: "Approx. $550 AUD", description: "Per tooth. Flexible financing can reduce costs to as little as $60 AUD per week." },
        { _key: key(), name: "Ceramic Veneers", price: "Approx. $1,600 AUD", description: "Per tooth, for the most significant cosmetic improvement on the front teeth." },
      ],
      risksContent: "Your composite resin requires a short window to fully cure and stabilize. For the first 48 hours, avoid staining materials (coffee, tea, red wine, berries, and dark sauces), expect mild temporary sensitivity to hot or cold foods, stick to softer foods, and do not bite down hard on your front teeth. Long-term, brush and floss daily with a non-abrasive fluoride toothpaste, limit staining agents and tobacco, refrain from biting hard objects like ice, pens, or fingernails, wear a custom nightguard if you grind your teeth, and visit us every six months for professional cleaning and veneer maintenance.",
      faqs: [
        { _key: key(), q: "How long do composite veneers last?", a: "With proper care, a composite smile design typically maintains its results for approximately 5–7 years before a transition to ceramic alternatives becomes advisable." },
        { _key: key(), q: "How much does composite bonding cost?", a: "Composite veneers / bonding are approximately $550 AUD per tooth, while ceramic veneers are approximately $1,600 AUD per tooth. Flexible financing is available across all treatment options, with the potential to reduce costs to as little as $60 AUD per week." },
        { _key: key(), q: "Can I combine ceramic and composite veneers?", a: "Yes — a combined approach is a strategy we frequently recommend. Ceramic veneers are placed on the front 2–4 teeth requiring the most significant cosmetic improvement, and the remaining visible teeth are treated with composite bonding. This delivers optimal results from both techniques while managing your total investment." },
        { _key: key(), q: "How do I get started?", a: "Should you wish to explore a meaningful yet cost-conscious enhancement, we welcome you to schedule a complimentary 30-minute assessment to determine whether dental bonding or composite veneering is the most suitable option for your needs." },
      ],
    },
  ],
  processSteps: [
    { _key: key(), title: "Consultation & plan", description: "We discuss what you want to change, take photographs and digital scans, and design a treatment plan tailored to you. Nothing starts until you're happy with the plan." },
    { _key: key(), title: "Treatment day begins", description: "On the day, we walk through the plan again. Photographs and digital mock-ups show what we're aiming for before any tooth is touched." },
    { _key: key(), title: "Prepare & scan", description: "Teeth are prepared and scanned in 3D with CEREC. Restorations are designed on screen and milled in the practice — roughly 2–3 hours. You can stay, watch TV, or step out for a break." },
    { _key: key(), title: "Fit & bond", description: "Each restoration is tried in, checked for fit and bite, adjusted if needed, and then bonded. You leave with your final smile in place." },
  ],
  risksContent:
    "Same-day cosmetic dentistry is elective and involves permanent reshaping of enamel for crown and veneer preparations — enamel that cannot be replaced. Risks include post-operative sensitivity, the possibility of root canal treatment if the nerve is affected, gum recession around aggressively prepared margins, and restoration chipping or debonding over time. This is why careful planning, honest expectations, and a detailed consultation are non-negotiable.",
  faqs: [
    { _key: key(), q: "Is same-day cosmetic dentistry right for me?", a: "It suits patients with discolouration, minor alignment issues, or small structural concerns who want a visible change in a single visit. A consultation determines whether you're a candidate." },
    { _key: key(), q: "How many teeth are typically treated?", a: "Anywhere from 6 to 10 upper teeth is most common for a visible smile makeover, though the number depends on your bite, smile line, and goals." },
    { _key: key(), q: "How long is the appointment?", a: "Same-day crowns and onlays typically take 90 minutes to 2 hours per restoration. Larger combined smile makeovers usually run 4–6 hours with planned breaks." },
    { _key: key(), q: "Is it reversible?", a: "Composite bonding and whitening are largely reversible. Crowns and veneers involve permanent reshaping of the tooth — the restoration itself can be replaced later, but the prepared tooth cannot be un-prepared." },
    { _key: key(), q: "How long will the result last?", a: "Ceramic restorations are designed for long-term durability — typical longevity 15+ years with proper care. Composite bonding typically lasts 5–7 years. Longevity depends on hygiene, bite forces, grinding habits, and regular check-ups." },
    { _key: key(), q: "Can I whiten my natural teeth at the same time?", a: "Yes — we often whiten before any crown or veneer work so the ceramics can be matched to your new shade." },
    { _key: key(), q: "What materials do you use?", a: "Premium ceramics from Ivoclar (e.max) for crowns, veneers, inlays, and onlays — milled chairside via CEREC. Composite resins from 3M ESPE and Ivoclar for bonding and fillings. All restorations are designed and milled in-house, then finished by local Sydney master technicians where lab work is required. No overseas lab work." },
  ],
  ctaHeadline: "Curious what your smile could look like?",
  ctaSubhead: "The first step is a consultation and digital preview — so you know exactly what we're designing before the day begins.",
};

// ---------------------------------------------------------------------------
// Pillar 04 — Orthodontics (new)
// ---------------------------------------------------------------------------

const pillarOrthodontics = {
  _type: "servicePillar",
  _id: "pillar-orthodontics",
  number: "04",
  title: "Orthodontics.",
  slug: slug("orthodontics"),
  tagline: "A healthy bite, a balanced airway.",
  shortDescription:
    "Clear aligners for adults, early interventive orthodontics and palatal expanders for children, and adult airway, snoring & sleep care — visiting orthodontic clinician Dr. Sagar (Jimmy) Rao.",
  intro:
    "Orthodontics at Leichhardt Dental is led by visiting clinician Dr. Sagar (Jimmy) Rao, who comes in once a month for orthodontic reviews and consultations. The approach is evidence-based and family-focused, with a strong emphasis on airway health and functional alignment — not just a straight smile. For adults seeking discreet teeth straightening we use Invisalign clear aligners, and we screen for snoring and sleep-disordered breathing with custom appliances where indicated. For children, we focus on early interventive orthodontics — guiding jaw growth and airway development, with custom palatal expanders where needed — to help prevent more invasive treatment later.",
  bentoSpan: "md:col-span-2 lg:col-span-12",
  bentoAspect: "aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]",
  subTreatments: [
    {
      _key: key(),
      id: "invisalign",
      slug: slug("invisalign-clear-aligners"),
      imageUrl: IMG.technicianMaking,
      name: "Invisalign Clear Aligners",
      description: "Discreet teeth straightening with custom clear-tray aligners. Planned digitally with 3D scans, reviewed monthly by Dr. Jimmy.",
      longDescription: "Invisalign uses a series of custom clear aligners to gradually move your teeth into a better position — without metal brackets or wires. We begin with a 3D digital scan and Invisalign's planning software to map your tooth movements before treatment starts, so you can see the projected result and estimated timeline at your first planning consultation. You wear each set of trays for about one to two weeks, around 22 hours a day, removing them only to eat, drink, brush, and floss. Dr. Jimmy reviews your progress every 6–8 weeks at his monthly visits and hands over your next sets. Most adult cases take 6–18 months depending on complexity. For many adults, aligners do more than straighten teeth — gently widening a narrow upper arch can create \"tongue space\" that supports clearer nighttime breathing. Treatment is fully bundled: all 3D scans and planning, your complete aligner series, progress checkups, any end-of-treatment refinement aligners, and a set of retainers to hold your result.",
      whatToExpect: ["Virtually Invisible: the clear material lets you undergo treatment discreetly, without impacting your professional or social life", "Completely Removable: take your aligners out to eat, drink, brush, and floss normally, making it easier to maintain excellent oral hygiene", "Enhanced Comfort: custom-moulded from smooth medical-grade plastic, eliminating the painful lip and cheek irritation often caused by metal wires and brackets", "Worn around 22 hours per day; reviews every 6–8 weeks with Dr. Jimmy", "Refinement aligners and retainers included; typically 6–18 months for adults"],
      pricing: [
        { _key: key(), name: "Minor cases", price: "$3,500–$5,000", description: "Mild crowding, small gaps, or minor cosmetic alignment of the front teeth." },
        { _key: key(), name: "Moderate cases", price: "$5,000–$7,500", description: "Noticeable crowding, prominent spacing, and mild bite issues." },
        { _key: key(), name: "Comprehensive cases", price: "$7,500–$9,500+", description: "Full-arch correction for complex crowding or deeper bite misalignment." },
      ],
      processSteps: [
        { _key: key(), title: "Initial assessment", description: "Dr. Jimmy evaluates your teeth, bite, and airway to confirm clear aligners are the right fit for you." },
        { _key: key(), title: "Digital scan & plan", description: "A fast, comfortable 3D scan programmes your custom aligner series — and previews the projected result and timeline." },
        { _key: key(), title: "Daily wear", description: "Wear your aligners around 22 hours a day, changing to the next set roughly every one to two weeks as directed." },
        { _key: key(), title: "Progress checks", description: "Every 6–8 weeks Dr. Jimmy reviews your movement and hands over your next sets of aligners." },
        { _key: key(), title: "Retention", description: "Any refinement aligners are made at the end of active treatment, then a set of retainers holds your new smile in place." },
      ],
      risksContent: "Clear-aligner treatment requires consistent daily wear to be effective. Risks include mild discomfort with each new tray, transient lisping in the first week, gum irritation if a tray edge is rough, and treatment delays if trays aren't worn as prescribed. Some complex bite issues may not be suitable for clear aligners and may require referral to a specialist orthodontist.",
      faqs: [
        { _key: key(), q: "How much does Invisalign cost?", a: "In Australia, Invisalign typically ranges from $3,500 to $9,500+ depending on the complexity of your case — roughly $3,500–$5,000 for minor cases, $5,000–$7,500 for moderate cases, and $7,500–$9,500+ for comprehensive full-arch correction. Dr. Jimmy gives you an itemised quote at your 3D planning consultation." },
        { _key: key(), q: "What's included in the price?", a: "Your plan is fully bundled: all 3D scans and planning, your complete series of clear aligners, every progress checkup with Dr. Jimmy, any refinement aligners at the end of treatment, and a set of retainers to stabilise your result." },
        { _key: key(), q: "Will private health insurance help?", a: "If your policy includes Major Dental or Orthodontic Extras cover, your fund will usually contribute a rebate toward clear-aligner therapy — commonly $1,000–$3,000 depending on your fund and tier. We print your item codes at consultation so you can confirm your rebate beforehand." },
        { _key: key(), q: "Are payment plans available?", a: "Yes — interest-free payment plans let you split the cost of treatment into manageable weekly or monthly instalments across your treatment timeline." },
      ],
    },
    {
      _key: key(),
      id: "early-intervention",
      slug: slug("early-interventive-orthodontics"),
      imageUrl: IMG.toolsColorful,
      name: "Early Interventive Orthodontics",
      description: "Guiding jaw growth, tooth eruption, and airway development in children to help prevent more invasive treatment later. Ideally assessed from age 7, with custom palatal expanders where indicated.",
      longDescription: "Dr. Jimmy's philosophy on paediatric orthodontics is simple: the less time a child spends in treatment, the better. By assessing development early, we look at how the jaw, palate, and airway are growing together — not just whether the teeth are straight. The Australian Society of Orthodontists recommends a first orthodontic evaluation between ages 7 and 8, once the first permanent molars have erupted, well before visible crowding becomes obvious. Catching structural issues early — while the facial bones are still highly adaptable — can resolve crossbites and crowding and often simplifies or reduces the need for extensive braces or extractions later. We also screen for persistent mouth breathing, which can be a sign of a restricted airway (narrow passages, enlarged tonsils, or allergies) and, left unaddressed, may contribute to a narrow palate, a recessed lower jaw, severe crowding, and disrupted sleep. Where a child has a narrow upper jaw or a crossbite, a custom palatal expander can gently widen the upper arch — because the two halves of a child's upper jaw don't fully fuse until puberty. This creates room for incoming permanent teeth and widens the floor of the nasal cavity, which can make nasal breathing easier. Our expanders are fixed appliances made with a 3D digital scan and CAD/CAM manufacturing rather than messy putty, so they work consistently without relying on a child to wear a removable plate. Not every child needs active treatment — sometimes watchful monitoring is the right call.",
      whatToExpect: ["First evaluation from age 7–8", "Gentle, conversational appointments", "Screening for mouth breathing and airway development", "Custom CAD/CAM palatal expanders where clearly indicated", "Watchful monitoring rather than over-treatment", "Coordinated with your general dentist for ongoing care"],
      pricing: [
        { _key: key(), name: "Early interventive treatment / palatal expander", price: "$2,800–$5,500", description: "Varies with the complexity of your child's case. Includes the digital workflow, fitting, monitoring adjustments, and the 6–9 month stabilisation phase." },
      ],
      processSteps: [
        { _key: key(), title: "First screening", description: "A relaxed assessment of your child's bite, jaw relationships, and airway development — identifying crossbites, narrow arches, or mouth-breathing signs while the bones are still adaptable." },
        { _key: key(), title: "Digital 3D workflow", description: "If an appliance is indicated, a 3D intraoral scan (no putty) is used to custom-design a fixed expander with CAD/CAM manufacturing for an accurate, comfortable fit." },
        { _key: key(), title: "Fitting & monitoring", description: "The fixed expander is placed and gently widens the upper arch, with routine progress adjustments." },
        { _key: key(), title: "Retention & stabilisation", description: "Continued monitoring over roughly 6–9 months so the structural changes settle safely." },
      ],
      risksContent: "Early orthodontic treatment is conservative and reversible where appliances are used. The main consideration is that not every developmental issue is best addressed in early childhood — some are better watched and treated later. Dr. Jimmy will give you a clear, honest read on whether your child needs treatment now, watchful monitoring, or no intervention at all.",
      faqs: [
        { _key: key(), q: "What is the right age for a first orthodontic evaluation?", a: "The Australian Society of Orthodontists recommends a first evaluation between ages 7 and 8. By then the first permanent molars have usually erupted, so we can accurately assess your child's bite, jaw relationships, and airway development — and most children won't need active treatment yet." },
        { _key: key(), q: "Why do you screen for mouth breathing?", a: "Persistent mouth breathing can be a sign of a restricted airway — narrow passages, enlarged tonsils, or chronic allergies. Left unaddressed it may contribute to a narrow palate, a recessed lower jaw, severe crowding, and disrupted sleep. Screening early helps us catch these developmental issues when they're gentler to manage." },
        { _key: key(), q: "What is a palatal expander and how does it help?", a: "It's a custom appliance that gently widens a child's narrow upper jaw — possible because the two halves of the upper jaw don't fully fuse until puberty. It creates space for incoming permanent teeth (reducing crowding) and widens the floor of the nasal cavity, which can make nasal breathing easier." },
        { _key: key(), q: "How much does early interventive treatment cost?", a: "Because every child's development is different, costs vary with complexity. In Australia, early interceptive treatment or a fixed palatal expander typically ranges from $2,800 to $5,500. We give you a complete, itemised breakdown at your child's first screening, and interest-free payment plans are available." },
        { _key: key(), q: "Is it covered by private health insurance?", a: "If your family has Major Dental or Orthodontic Extras cover, your fund will generally cover a portion. We offer on-the-spot HICAPS claiming, and because rebate limits vary widely we recommend checking with your fund beforehand." },
      ],
    },
    {
      _key: key(),
      id: "airway",
      slug: slug("airway-and-functional-alignment"),
      imageUrl: IMG.glovedEquipment,
      name: "Airway, Snoring & Sleep (Adults)",
      description: "Adult airway and functional alignment — screening for snoring and sleep-disordered breathing, Arise home sleep studies, and custom Mandibular Advancement Splints (MAS) where indicated.",
      longDescription: "Adult dental care is about more than worn or crooked teeth. The structural position of your jaws, tongue, and bite affects how well you breathe and sleep. A narrow upper arch, a recessed lower jaw, or a deep overbite leaves less room for your tongue — and during sleep, when the throat muscles relax, the tongue can fall back and restrict the airway. That can show up as chronic snoring, obstructive sleep apnoea (OSA — where the airway partly or fully collapses and briefly cuts off oxygen), and daytime fatigue, brain fog, or morning headaches. We assess this airway picture as part of adult orthodontic care. Where sleep-disordered breathing is suspected, we partner with Arise to arrange a medical-grade home sleep study: you pick up a lightweight kit from the clinic, wear the non-invasive sensors for one night in your own bed, then drop it back the next morning — and the data is analysed by independent, qualified sleep physicians. We don't diagnose sleep conditions in-house. If a study confirms snoring or mild-to-moderate OSA, a custom Mandibular Advancement Splint (MAS) is one evidence-based option: a slim nighttime appliance that holds your lower jaw and tongue gently forward to keep the airway open. Adult Invisalign — widening a narrow arch to create \"tongue space\" — is another pathway. A custom MAS typically ranges from $1,800 to $2,500.",
      whatToExpect: ["Airway-aware assessment of jaw structure and bite", "Arise medical-grade home sleep study (analysed by sleep physicians)", "Custom Mandibular Advancement Splint (MAS) where indicated", "Adult Invisalign arch-widening as an alternative pathway", "Diagnosis of sleep conditions referred to medical specialists", "Custom MAS typically $1,800–$2,500"],
      pricing: [
        { _key: key(), name: "Custom Mandibular Advancement Splint (MAS)", price: "$1,800–$2,500", description: "Medical-grade, custom-engineered nighttime appliance. Includes the digital scan, lab fabrication, fitting and titration, and follow-up reviews over the first 6 months." },
      ],
      processSteps: [
        { _key: key(), title: "Airway screening", description: "An initial assessment at Leichhardt Dental Centre. If a sleep issue is suspected, you're set up with an Arise home sleep study kit to take away." },
        { _key: key(), title: "Home sleep study", description: "You wear the lightweight, non-invasive sensors for a single night in your own bed, then drop the kit back the next morning. The data is analysed by independent, qualified sleep physicians." },
        { _key: key(), title: "Digital scan & fabrication", description: "If a MAS is indicated, a 3D intraoral scan (no putty) is used to custom-make a slim, medical-grade appliance." },
        { _key: key(), title: "Fitting & titration", description: "The appliance is fitted and gradually fine-tuned over the first few months to bring your jaw to the optimal breathing position." },
        { _key: key(), title: "Follow-up care", description: "Regular reviews over the first 6 months track your sleep improvements and protect your jaw joint health." },
      ],
      risksContent: "Diagnosis of sleep-disordered breathing requires referral to an appropriate medical specialist — we don't diagnose sleep conditions in-house, and any home sleep study is analysed by independent sleep physicians. A MAS suits snoring and mild-to-moderate OSA; severe OSA is generally better managed with CPAP, and we refer accordingly. A MAS can cause temporary jaw or tooth discomfort, increased salivation, or minor bite changes, which titration and regular reviews help manage. It isn't suitable for everyone — your jaw-joint health and bite are assessed first.",
      faqs: [
        { _key: key(), q: "CPAP machine or a Mandibular Advancement Splint — which is right for me?", a: "CPAP uses continuous air pressure through a mask to hold the airway open and is the standard for severe sleep apnoea, though some people find the mask hard to tolerate long-term — clinical trials show up to around half of patients struggle with ongoing use. A custom MAS holds the lower jaw forward to keep the airway open; it suits snoring and mild-to-moderate OSA, or people who can't tolerate CPAP. Because it's cordless, quiet, and travel-friendly, many people wear it more consistently — and for the right candidates a MAS can achieve similar real-world results. Dr. Jimmy and your sleep physician help you choose the right pathway." },
        { _key: key(), q: "What is an Arise home sleep study?", a: "It's a medical-grade sleep study you do from your own bed instead of an overnight hospital lab. You pick up a lightweight kit from us, wear the non-invasive sensors for one night, and drop it back the next morning. The recording — your breathing, oxygen levels, and sleep cycles — is analysed by independent, qualified sleep physicians who provide the diagnosis." },
        { _key: key(), q: "How much does a custom MAS cost?", a: "In Australia a custom-engineered, medical-grade Mandibular Advancement Splint typically ranges from $1,800 to $2,500, depending on the appliance design and the complexity of your bite. We provide an itemised breakdown before starting any treatment." },
        { _key: key(), q: "What's included in the cost?", a: "The fee covers your digital 3D scan, the precision lab fabrication of the appliance, fitting and titration (fine-tuning the jaw position over the first few months), and follow-up reviews over the first 6 months to track your progress and protect your jaw joint." },
        { _key: key(), q: "Is a MAS covered by private health insurance?", a: "Usually, yes. Because a custom MAS is an evidence-based treatment for diagnosed snoring and sleep apnoea, most Australian funds offer a rebate under Major Dental or Orthodontic Extras cover. We provide the specific item numbers so you can confirm your out-of-pocket cost with your fund beforehand. Interest-free payment plans are also available." },
      ],
    },
  ],
  processSteps: [
    { _key: key(), title: "Initial consultation", description: "Dr. Jimmy reviews your goals, medical and dental history, and takes 3D digital scans. For Invisalign cases, you see a preview of the projected movement before committing." },
    { _key: key(), title: "Treatment plan", description: "A written plan covering the expected duration, number of trays or stages, and total investment — including any coordination with other clinicians if needed." },
    { _key: key(), title: "Active treatment", description: "Adults: weekly tray changes worn 20–22 hours a day. Children: appliances or monitoring as needed. Monthly reviews with Dr. Jimmy at his Leichhardt visits." },
    { _key: key(), title: "Retention", description: "Once teeth are in their new position, retainers preserve the result. Lifelong nightly retainer wear is usually recommended to prevent relapse." },
  ],
  risksContent:
    "Orthodontic treatment generally carries low risk. Possible considerations include transient discomfort, root shortening (rare and usually clinically insignificant), enamel decalcification if hygiene is poor, and treatment relapse if retainers aren't worn. Complex cases or skeletal discrepancies may require referral to a specialist orthodontist or maxillofacial surgeon — we'll tell you up-front if that's the right path for you.",
  faqs: [
    { _key: key(), q: "Who provides orthodontic care at Leichhardt Dental?", a: "Dr. Sagar (Jimmy) Rao is a visiting general dentist with a special interest in orthodontics and airway management. He visits Leichhardt Dental Centre once a month for orthodontic reviews and consultations." },
    { _key: key(), q: "Am I a candidate for Invisalign?", a: "Most mild to moderate alignment cases are suitable for clear aligners. More complex bite issues — significant skeletal discrepancies, severely rotated teeth, or large gaps — may require traditional braces or referral to a specialist orthodontist. Dr. Jimmy will tell you honestly which path suits your case." },
    { _key: key(), q: "When should my child have an orthodontic assessment?", a: "The Australian Society of Orthodontists recommends an initial assessment around age 7. Most children won't need active treatment yet — but it's the right age to identify anything worth watching or intervening on early." },
    { _key: key(), q: "Why does Dr. Jimmy focus on airway?", a: "Mouth breathing, restless sleep, and crowded jaws in children can be early signs of airway compromise — which has implications well beyond dental alignment. Considering the airway alongside orthodontic planning helps ensure treatment supports overall health, not just a straighter smile." },
    { _key: key(), q: "Will I need to see Dr. Jimmy every week?", a: "No — typically monthly reviews. Tray changes happen at home; the monthly visit is to check progress and answer questions. Dr. Jimmy visits Leichhardt Dental Centre once a month." },
    { _key: key(), q: "How much does Invisalign treatment cost?", a: "Investment varies with complexity — typically $3,500–$5,000 for minor cases, $5,000–$7,500 for moderate cases, and $7,500–$9,500+ for comprehensive full-arch correction. We provide a detailed written quote at consultation, plus information on flexible payment plans." },
    { _key: key(), q: "Do you treat snoring and sleep apnoea?", a: "We screen adults for snoring and sleep-disordered breathing as part of airway-focused orthodontic care, and can arrange a medical-grade Arise home sleep study (analysed by independent sleep physicians). Where snoring or mild-to-moderate sleep apnoea is confirmed, a custom Mandibular Advancement Splint is one option we offer. We don't diagnose sleep conditions in-house — diagnosis is made by an appropriate medical specialist." },
  ],
  ctaHeadline: "Curious about orthodontics for you or your child?",
  ctaSubhead: "Book a consultation with Dr. Jimmy on his next monthly visit — we'll give you a clear read on whether treatment is right, and what's involved.",
};

// ---------------------------------------------------------------------------
// Clinicians
// ---------------------------------------------------------------------------

const clinicianNick = {
  _type: "clinician",
  _id: "clinician-nick-kulkarni",
  name: "Dr. Nick Kulkarni",
  role: "Principal Dentist",
  isPrincipal: true,
  qualifications:
    "BDS · GradDipClinDent (Oral Implants) · MSc Prosthodontics · Fellow ICOI",
  focus:
    "General and implant dentistry — from single-tooth implants to full-arch rehabilitation. Trains and mentors other dentists across Sydney and Australia through his training academy, First Implant.",
  bio: toBlocks([
    "For more than 25 years, Dr Nick has been helping patients smile with confidence. When he isn't in the clinic, his world revolves around his family. As a proud dad doting on his two teenage daughters, he understands the busy rhythms, worries, and needs of local Leichhardt families.",
    "He is passionate about health and fitness. He stays highly active and disciplined outside of work because he believes that a focused mind and healthy body are essential to delivering the highest level of surgical precision for his patients.",
    "To the wider Australian dental community, Dr Nick is a deeply respected teacher and mentor. Through his training academy, Place Your First Implant, he regularly teaches fellow clinicians advanced implant placement and sedation techniques. He is a continuous learner who constantly brings the latest evidence-based global standards back home to his patients.",
    "A Calm, Safe Space: Dr Nick knows that dental visits can feel overwhelming. Backed by over two decades of clinical experience, he is dedicated to creating a relaxed, gentle atmosphere where you are never rushed, your fears are validated, and you are truly heard. Tailored to Your Life: Dr Nick will never push a treatment on you. He takes the time to explain your options in plain, simple English, walking you through your 3D digital scans so you can make informed decisions at your own pace. Onshore Sydney Quality: Dr Nick cares deeply about the integrity of his work. He refuses to cut corners or send lab work overseas. Every single crown, bridge, and implant tooth he places is custom-made locally right here in Sydney by master technicians.",
    "Dr Nick has trained globally to bring world-class dental science to the inner west: over 25 years of clinical practice treating generations of families internationally and in Sydney; a Graduate Diploma in Clinical Dentistry (Oral Implants) from the University of Sydney; a Master of Science in Prosthodontics, specialising in tooth replacement; Fellow of the International Congress of Oral Implantologists (ICOI); and advanced surgical residencies at the Misch Implant Institute (USA) and Walpole Institute (UK).",
  ]),
  quote:
    "Dentistry isn't a one-size-fits-all conveyor belt. For over 25 years, my approach has always started the same way: by sitting down, listening to your story, and figuring out what is truly best for your life and health.",
  order: 1,
};

const clinicianSilvina = {
  _type: "clinician",
  _id: "clinician-silvina-cabrerizo",
  name: "Dr. Silvina Cabrerizo",
  role: "General Dentist & Restorative Dentistry",
  isPrincipal: false,
  qualifications: "BDS (National University of Cordoba, 2001)",
  focus:
    "Over 20 years in Argentina, New Zealand, and Australia. Particular interest in prosthetic dentistry, occlusion, and full-mouth rehabilitation. Known for a warm, considered manner with anxious patients.",
  bio: toBlocks([
    "For more than two decades, Dr Silvina has been dedicating her life to the art and science of healthy smiles. Her international dental journey began in her native Argentina, where she graduated from the National University of Cordoba in 2001 and successfully operated her own private practice for ten years. Before making Sydney her permanent home in 2017, she also spent several years providing trusted dental care to communities in New Zealand. This rich, global background gives her a deep understanding of people from all walks of life, allowing her to connect with patients on a truly human level.",
    "A Gentle Haven for Nervous Patients: If dental visits make you anxious, you are in safe hands. Dr Silvina is widely recognized for her exceptionally kind, warm, and compassionate clinical nature. She takes the time to listen to your concerns, gently walking you through every step of your care at a pace that keeps you completely relaxed.",
    "The Craftsmanship of Prosthetic Dentistry: Dr Silvina has a profound passion for the intricate detail and craftsmanship involved in rebuilding smiles. She has undertaken extensive postgraduate education in advanced fields, including prosthetic dentistry, occlusion, and full-mouth rehabilitations. She loves blending precision science with conservative techniques to restore both the perfect function and natural beauty of your teeth.",
    "Educator for Lifelong Health: She believes a great dentist doesn't just fix problems—they prevent them. Dr Silvina places a massive focus on patient education, explaining the evidence-based link between a healthy mouth and your body's overall well-being so you can make informed choices. Just like the rest of our team, she ensures that every crown, bridge, or ceramic restoration she designs is crafted right here locally in Sydney by master dental technicians.",
    "When she steps away from the chair, Dr Silvina believes in embracing life's simple pleasures. She is an avid reader who loves getting lost in a great book, exploring new travel destinations, and spending meaningful, relaxed quality time bonding with her loved ones.",
  ]),
  quote:
    "The true beauty of dentistry is its diversity. One day I am meticulously crafting a complex full-mouth rehabilitation, and the next, I am welcoming a child for their very first dental visit. No matter the treatment, my goal is always to ensure my patients feel completely safe, comfortable, and truly heard.",
  order: 2,
};

const clinicianLeah = {
  _type: "clinician",
  _id: "clinician-leah-morgan",
  name: "Dr. Leah Morgan",
  role: "General Dentist & Trauma Care",
  isPrincipal: false,
  qualifications: "BDS (Hons), University of Sydney",
  focus:
    "Nearly 15 years across metropolitan and rural practice. Clinical educator at the University of Sydney; particular focus on endodontics, emergency dentistry, and dental trauma management.",
  bio: toBlocks([
    "With nearly 15 years of diverse clinical experience, Dr Leah graduated with Honours from the University of Sydney. Since then, she has dedicated her career to providing exceptional care across both metropolitan Sydney and rural Australian communities. Beyond treating patients, Dr Leah is a passionate clinical educator. She regularly tutors upcoming dental students at the University of Sydney and is an invited speaker at continuing education conferences. She literally lectures the profession on emergency dentistry and dental trauma management, ensuring her own patients always receive the highest, most up-to-date evidence-based treatments.",
    "A Calm Hand in Dental Emergencies: Accidents happen, and dental trauma can be deeply distressing. Because acute emergency dentistry and trauma management are Dr Leah's absolute biggest passions, she is uniquely skilled at turning a high-stress dental emergency into a calm, gentle, and completely reassuring experience.",
    "The Power of Lifelong Continuity: Dr Leah fundamentally believes that dentistry is not a one-size-fits-all conveyor belt. She loves building genuine, long-term bonds with her patients. She takes the time to listen to your unique concerns, answer your questions in plain English, and empower you to make highly informed choices about your health goals.",
    "Comprehensive Family Expertise: Dr Leah has completed extensive postgraduate training across endodontics (root canals), crown and bridge restorations, and oral medicine. She is also a qualified basic life support teacher, meaning her clinical environment holds the highest possible standards for patient safety and well-being. In alignment with our practice philosophy, every crown, bridge, and customized preventative appliance she prescribes is custom-fabricated locally right here in Sydney, guaranteeing optimal material safety and a perfect structural fit.",
    "When she steps away from the dental chair, Dr Leah's world completely revolves around her family. As a proud mum to her beautiful baby girl, she deeply understands the busy schedules, real-life budgets, and health anxieties of local Leichhardt parents. To keep her own mind and body focused, she loves nothing more than packing up for a family weekend of bushwalking, exploring the outdoors, and enjoying nature.",
  ]),
  quote:
    "Being part of a family practice means gaining your trust over a lifetime—from a child's very first check-up to a senior's ongoing care. My goal is to listen carefully, explain things clearly, and support your health journey in a space where you always feel completely safe.",
  order: 3,
};

const clinicianJimmy = {
  _type: "clinician",
  _id: "clinician-jimmy-rao",
  name: "Dr. Sagar (Jimmy) Rao",
  role: "Visiting General Dentist · Orthodontics & Airway",
  isPrincipal: false,
  qualifications:
    "BDS (2002) · Postgraduate focus in Orthodontics · Languages: English, Hindi, Russian",
  focus:
    "Visits monthly. Early interventive orthodontics, paediatric airway screening, adult sleep and snoring care, and Invisalign clear aligners — for children and adults.",
  bio: toBlocks([
    "Known warmly around the practice as Dr Jimmy, his approach to dentistry is defined by optimism and clear communication. Outside the clinic, his lifestyle is centred around health and personal vitality. He is an avid fitness enthusiast who believes that staying physically active keeps his mind energized and sharp allowing him to maintain the peak concentration required for intricate clinical procedures. When he isn't studying modern orthodontic movements, he is usually working out, following his favorite sports, or unwinding with his family.",
    "Since graduating with a Bachelor of Dental Surgery in 2002, Dr Jimmy has pursued expansive international training, including a rigorous two-year postgraduate focus on orthodontics. He validated his Australian dental registration in 2012 and has spent over a decade practicing extensively across NSW. To ensure our patients have access to tailored alignment care, Dr Jimmy visits Leichhardt Dental Centre once a month.",
    "He is particularly passionate about Early Interventive Orthodontics. Dr Jimmy's philosophy is simple: the less time a patient spends in treatment, the better. By intervening early in a child's development, he focuses on Airway Management—identifying breathing issues early to help reduce the risks of sleep apnoea and other health complications in later life; Functional Alignment—guiding jaw growth and tooth eruption to prevent more invasive and lengthy treatments during the teenage years; and Holistic Health—ensuring your child doesn't just have a straight smile, but a functional bite and a healthy airway.",
    "A Light-Hearted, Friendly Space: Dr Jimmy understands that dental visits can feel daunting for children and adults alike. He keeps his surgery bright, welcoming, and conversational, ensuring everyone feels heard and completely safe. Leading Technology: For those seeking discrete teeth straightening, Dr Jimmy utilizes Invisalign® technology. During your monthly review, he leverages their world-class digital planning software and internationally manufactured clear tray systems to track your progress and keep your treatment on path. Honest, Plain-English Advice: Dr Jimmy believes in clinical transparency. He uses 3D scans to show you exactly how teeth can move, explains the biological \"why\" behind his recommendations, and empowers you to make informed decisions for your family's health.",
  ]),
  quote:
    "Orthodontics is about more than just a straight smile — it's about establishing a healthy foundation for a lifetime of better breathing and overall well-being.",
  order: 4,
};

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

const documents = [
  practiceSettings,
  homeHero,
  pillarGeneralDentistry,
  pillarDentalImplants,
  pillarSameDaySmile,
  pillarOrthodontics,
  clinicianNick,
  clinicianSilvina,
  clinicianLeah,
  clinicianJimmy,
];

const obsoleteIds = ["pillar-single-visit-crowns"];

async function seed() {
  console.log(`\nSeeding Sanity project ${PROJECT_ID} / dataset ${DATASET}...\n`);

  for (const id of obsoleteIds) {
    try {
      await client.delete(id);
      console.log(`  −  removed obsolete  ${id}`);
    } catch (err) {
      // Not fatal — doc may not exist
      console.log(`  ·  skip delete       ${id}  (${err.message})`);
    }
  }

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✓  ${doc._type}  ${doc._id}`);
    } catch (err) {
      console.error(`  ✗  ${doc._type}  ${doc._id}`, err.message);
    }
  }

  console.log(`\nDone. ${documents.length} documents written.\n`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
