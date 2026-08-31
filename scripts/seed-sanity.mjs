/**
 * Seed the Sanity "production" dataset with all content from the hardcoded
 * TypeScript fallbacks.  Safe to run multiple times — uses createOrReplace.
 *
 * Prerequisites:
 *   1. Add SANITY_WRITE_TOKEN to .env (sanity.io/manage → project → API → Tokens, role Editor)
 *   2. npm run seed
 */

import { createClient } from "@sanity/client";
import { readFileSync, mkdtempSync, rmSync } from "fs";
import { resolve, join } from "path";
import { tmpdir } from "os";
import { pathToFileURL } from "url";

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

// `--dry-run` builds every document and reports on it without touching Sanity,
// so it deliberately works with no token and no .env (used by verify-seed).
const DRY_RUN = process.argv.includes("--dry-run");

if (!TOKEN && !DRY_RUN) {
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
  token: TOKEN || undefined,
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
  headline: "Where evidence-based science\nmeets honest local care.",
  subhead:
    "Twenty-five years of practice. A calm room. Evidence-based care — delivered one patient at a time.",
  videoUrl:
    "https://res.cloudinary.com/dzydzte9h/video/upload/dental-website/home/hero/hero-main.mp4",
  primaryCtaLabel: "Book an appointment online",
  secondaryCtaLabel: "Meet Our Team",
  secondaryCtaAnchor: "/about",
  trustCardName: "Dr. Nick Kulkarni",
  trustCardRole: "Principal Dentist",
  // Mirrors DEFAULTS in src/components/Hero.tsx, which is what the homepage
  // renders today. NOTE: this differs from Dr Nick's credential string in
  // src/lib/clinician-fallbacks.ts ("BDS · GradDipClinDent (Oral Implants) ·
  // MSc Prosthodontics · Fellow ICOI"). AHPRA expects one identical credential
  // string everywhere; that mismatch is live and needs a decision — it is NOT
  // resolved here, because resolving it means changing published copy.
  trustCardCredentials: "BDS · GradDipClinDent · PGDip Implant Dentistry",
};

// ---------------------------------------------------------------------------
// Service pillars — derived from the live site's own content
// ---------------------------------------------------------------------------
//
// Pillar content is deliberately NOT duplicated here. It is read straight out
// of src/lib/pillar-fallbacks.ts — the exact data the site renders — so the CMS
// can never drift away from the published copy.
//
// It used to be duplicated, and it drifted badly: the dataset sat on pre-audit
// wording for months ("optimal breathing position", "affordable, immediate
// smile enhancement"), and re-seeding would have pushed that copy back onto a
// live health-service ad. Deriving it makes that failure mode impossible.
//
// The fallbacks are TypeScript and import image assets, so they are bundled
// with esbuild (a Vite dependency, present whenever devDependencies are) before
// being imported.

async function loadFallbacks(entry) {
  let build;
  try {
    ({ build } = await import("esbuild"));
  } catch {
    throw new Error(
      "esbuild is needed to read the TypeScript fallbacks. Run `npm install` first."
    );
  }

  const dir = mkdtempSync(join(tmpdir(), "seed-fallbacks-"));
  const outfile = join(dir, "bundle.mjs");
  try {
    await build({
      entryPoints: [entry],
      outfile,
      bundle: true,
      format: "esm",
      platform: "node",
      logLevel: "error",
      // Asset imports are irrelevant to the copy; keep them from failing the build.
      loader: {
        ".webp": "text", ".jpg": "text", ".jpeg": "text",
        ".png": "text", ".svg": "text", ".avif": "text", ".gif": "text",
      },
      define: { "import.meta.env": "{}" },
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Strip undefined/empty values so Sanity never stores a field the fallback
 * doesn't have. This matters: mergePillar treats a present-but-empty remote
 * field as authoritative, which would blank that section on the live site.
 */
function defined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

const keyed = (arr, map) =>
  (arr || []).map((item) => ({ _key: key(), ...defined(map(item)) }));

const step = (s) => ({ title: s.title, description: s.description });
const faq = (f) => ({ q: f.q, a: f.a });

function toPillarDoc(p) {
  return defined({
    _type: "servicePillar",
    _id: `pillar-${p.slug}`,
    number: p.number,
    title: p.title,
    slug: slug(p.slug),
    tagline: p.tagline,
    shortDescription: p.shortDescription,
    intro: p.intro,
    bentoSpan: p.bentoSpan,
    bentoAspect: p.bentoAspect,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    subTreatments: keyed(p.subTreatments, (s) =>
      defined({
        id: s.id,
        slug: slug(s.slug),
        imageUrl: s.imageUrl,
        name: s.name,
        description: s.description,
        longDescription: s.longDescription,
        whatToExpect: s.whatToExpect,
        pricing: keyed(s.pricing, (x) => ({
          name: x.name, price: x.price, description: x.description,
        })),
        processSteps: keyed(s.processSteps, step),
        risksContent: s.risksContent,
        faqs: keyed(s.faqs, faq),
      })
    ),
    processSteps: keyed(p.processSteps, step),
    secondaryProcessTitle: p.secondaryProcessTitle,
    secondaryProcessSteps: keyed(p.secondaryProcessSteps, step),
    risksContent: p.risksContent,
    faqs: keyed(p.faqs, faq),
    ctaHeadline: p.ctaHeadline,
    ctaSubhead: p.ctaSubhead,
  });
  // `image` / `heroImage` are intentionally never written. In the fallbacks
  // they are bundled asset imports (binary), not Sanity image assets, and
  // mergePillar runs urlFor() over remote.image — a plain string there would
  // break the hero image on every pillar page.
}

const { ALL_PILLARS } = await loadFallbacks(
  resolve(process.cwd(), "src/lib/pillar-fallbacks.ts")
);
const pillarDocs = ALL_PILLARS.map(toPillarDoc);

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
    "He is passionate about health and fitness. He stays highly active and disciplined outside of work because he believes that a focused mind and healthy body are essential to delivering a high level of surgical precision for his patients.",
    "To the wider Australian dental community, Dr Nick is a deeply respected teacher and mentor. Through his training academy, Place Your First Implant, he regularly teaches fellow clinicians advanced implant placement and sedation techniques. He is a continuous learner who constantly brings the latest evidence-based global standards back home to his patients.",
    "A Calm, Safe Space: Dr Nick knows that dental visits can feel overwhelming. Backed by over two decades of clinical experience, he is dedicated to creating a relaxed, gentle atmosphere where you are never rushed, your fears are validated, and you are truly heard. Tailored to Your Life: Dr Nick will never push a treatment on you. He takes the time to explain your options in plain, simple English, walking you through your 3D digital scans so you can make informed decisions at your own pace. Onshore Sydney Quality: Dr Nick cares deeply about the integrity of his work. He refuses to cut corners or send lab work overseas. Every single crown, bridge, and implant tooth he places is custom-made locally right here in Sydney by master technicians.",
    "Dr Nick has trained internationally to bring advanced dental science to the inner west: over 25 years of clinical practice treating generations of families internationally and in Sydney; a Graduate Diploma in Clinical Dentistry (Oral Implants) from the University of Sydney; a Master of Science in Prosthodontics, with a focus on tooth replacement; Fellow of the International Congress of Oral Implantologists (ICOI); and advanced surgical residencies at the Misch Implant Institute (USA) and Walpole Institute (UK).",
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
    "A Gentle Haven for Nervous Patients: If dental visits make you anxious, you are in safe hands. Dr Silvina is known for her kind, warm, and compassionate manner. She takes the time to listen to your concerns, gently walking you through every step of your care at a pace that keeps you completely relaxed.",
    "The Craftsmanship of Prosthetic Dentistry: Dr Silvina has a strong interest in the detail and craftsmanship involved in rebuilding smiles. She has undertaken extensive postgraduate education in advanced fields, including prosthetic dentistry, occlusion, and full-mouth rehabilitations. She loves blending precision science with conservative techniques to restore both the function and natural beauty of your teeth.",
    "Educator for Lifelong Health: She believes a great dentist doesn't just fix problems—they prevent them. Dr Silvina places a massive focus on patient education, explaining the evidence-based link between a healthy mouth and your body's overall well-being so you can make informed choices. Just like the rest of our team, she ensures that every crown, bridge, or ceramic restoration she designs is crafted right here locally in Sydney by master dental technicians.",
    "When she steps away from the chair, Dr Silvina believes in embracing life's simple pleasures. She is an avid reader who loves getting lost in a great book, exploring new travel destinations, and spending meaningful, relaxed quality time bonding with her loved ones.",
  ]),
  quote:
    "The true beauty of dentistry is its diversity. One day I am meticulously crafting a complex full-mouth rehabilitation, and the next, I am welcoming a child for their very first dental visit. No matter the treatment, my goal is always to help my patients feel safe, comfortable, and truly heard.",
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
    "With nearly 15 years of diverse clinical experience, Dr Leah graduated with Honours from the University of Sydney. Since then, she has dedicated her career to providing exceptional care across both metropolitan Sydney and rural Australian communities. Beyond treating patients, Dr Leah is a passionate clinical educator. She regularly tutors upcoming dental students at the University of Sydney and is an invited speaker at continuing education conferences. She teaches emergency dentistry and dental trauma management, and brings up-to-date, evidence-based treatments to her own patients.",
    "A Calm Hand in Dental Emergencies: Accidents happen, and dental trauma can be deeply distressing. Because acute emergency dentistry and trauma management are Dr Leah's absolute biggest passions, she is skilled at making a high-stress dental emergency a calmer, gentler experience.",
    "The Power of Lifelong Continuity: Dr Leah fundamentally believes that dentistry is not a one-size-fits-all conveyor belt. She loves building genuine, long-term bonds with her patients. She takes the time to listen to your unique concerns, answer your questions in plain English, and empower you to make highly informed choices about your health goals.",
    "Comprehensive Family Expertise: Dr Leah has completed extensive postgraduate training across endodontics (root canals), crown and bridge restorations, and oral medicine. She is also a qualified basic life support teacher, meaning her clinical environment holds high standards for patient safety and well-being. In alignment with our practice philosophy, every crown, bridge, and customized preventative appliance she prescribes is custom-fabricated locally right here in Sydney for reliable material quality and a well-fitting result.",
    "When she steps away from the dental chair, Dr Leah's world completely revolves around her family. As a proud mum to her beautiful baby girl, she deeply understands the busy schedules, real-life budgets, and health anxieties of local Leichhardt parents. To keep her own mind and body focused, she loves nothing more than packing up for a family weekend of bushwalking, exploring the outdoors, and enjoying nature.",
  ]),
  quote:
    "Being part of a family practice means gaining your trust over a lifetime—from a child's very first check-up to a senior's ongoing care. My goal is to listen carefully, explain things clearly, and support your health journey in a space where you always feel safe and supported.",
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
    "He is particularly passionate about Early Interventive Orthodontics. Dr Jimmy's philosophy is simple: the less time a patient spends in treatment, the better. By assessing children early in their development, he focuses on Airway Awareness—screening for breathing issues as part of overall care; Functional Alignment—guiding jaw growth and tooth eruption, which may reduce the need for more involved treatment during the teenage years; and Holistic Health—looking beyond a straight smile to the bite and airway. Individual results vary and are discussed at consultation.",
    "A Light-Hearted, Friendly Space: Dr Jimmy understands that dental visits can feel daunting for children and adults alike. He keeps his surgery bright, welcoming, and conversational, helping everyone feel heard and at ease. Modern Technology: For those seeking discreet teeth straightening, Dr Jimmy uses Invisalign® technology. During your monthly review, he uses their digital planning software and internationally manufactured clear tray systems to track your progress and keep your treatment on path. Honest, Plain-English Advice: Dr Jimmy believes in clinical transparency. He uses 3D scans to show you exactly how teeth can move, explains the biological \"why\" behind his recommendations, and empowers you to make informed decisions for your family's health.",
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
  ...pillarDocs,
  clinicianNick,
  clinicianSilvina,
  clinicianLeah,
  clinicianJimmy,
];

const obsoleteIds = ["pillar-single-visit-crowns"];

async function seed() {
  if (DRY_RUN) {
    // `--json` emits the built documents so they can be diffed against the
    // fallbacks without touching Sanity.
    if (process.argv.includes("--json")) {
      console.log(JSON.stringify(documents, null, 2));
      return;
    }
    console.log(`\nDRY RUN — nothing will be written to ${PROJECT_ID}/${DATASET}\n`);
    for (const doc of documents) {
      const subs = doc.subTreatments?.length;
      const faqs = doc.faqs?.length;
      const priced = doc.subTreatments?.filter((s) => s.pricing?.length).length;
      const detail = [
        subs != null ? `${subs} subs` : null,
        priced != null ? `${priced} priced` : null,
        faqs != null ? `${faqs} faqs` : null,
      ].filter(Boolean).join(", ");
      console.log(`  ·  ${doc._type.padEnd(16)} ${doc._id.padEnd(30)} ${detail}`);
    }
    console.log(`\n${documents.length} documents built, 0 written.\n`);
    return;
  }

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
