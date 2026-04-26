import { Seo } from "../components/Seo";
import { PageHero } from "../components/layout/PageHero";
import { PRACTICE } from "../lib/practice";

const LAST_UPDATED = "14 April 2026";

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy — Leichhardt Dental Centre"
        description="How Leichhardt Dental Centre collects, uses, and protects your personal and health information under Australian privacy law."
        path="/privacy"
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy."
        intro={`How we handle your personal and health information. Last updated ${LAST_UPDATED}.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
      />

      <article className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 prose prose-lg prose-stone max-w-none
                        prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold
                        prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed
                        prose-li:text-muted-foreground prose-li:font-light prose-li:leading-relaxed
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <p className="lead text-base text-muted-foreground/80 border-l-4 border-primary pl-4 py-2 italic">
            This policy is a working draft and should be reviewed by a solicitor
            before launch. Dental practices have additional obligations under
            health records legislation that your legal adviser will want to
            tailor.
          </p>

          <h2>1. About this policy</h2>
          <p>
            {PRACTICE.name} ("we", "us", "our") is committed to protecting your
            privacy. This policy explains how we collect, use, hold, and
            disclose your personal information, including health information,
            in accordance with the Privacy Act 1988 (Cth) and the Australian
            Privacy Principles (APPs), and — where applicable — the Health
            Records and Information Privacy Act 2002 (NSW).
          </p>

          <h2>2. What information we collect</h2>
          <p>
            We collect the information necessary to provide dental care and run
            our practice. This may include:
          </p>
          <ul>
            <li>Identifying information — name, date of birth, address, contact details, Medicare number, private health fund details, emergency contact.</li>
            <li>Health information — medical and dental history, medications, allergies, clinical notes, X-rays and 3D scans, photographs, treatment plans, and correspondence with other health providers.</li>
            <li>Payment and billing information — account details, payment records, and claim information.</li>
            <li>Website information — if you submit our contact form, we collect the name, email, phone number, and message you provide. We may also collect standard technical data (IP address, browser, pages visited) via analytics tools.</li>
          </ul>

          <h2>3. How we collect it</h2>
          <p>
            We collect information directly from you where possible — at your
            appointment, through our patient forms, by phone, email, or our
            website contact form. Where you consent, we may also receive
            information from other health providers involved in your care, your
            health fund, Medicare, or a person authorised to act on your
            behalf.
          </p>

          <h2>4. Why we collect it</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Provide, plan, and continue your dental treatment.</li>
            <li>Communicate with you about appointments, recalls, and aftercare.</li>
            <li>Process billing, payments, and claims to Medicare or your private health fund.</li>
            <li>Comply with our legal, regulatory, and professional obligations (including those of the Australian Health Practitioner Regulation Agency).</li>
            <li>Improve the care we provide, including internal quality review.</li>
          </ul>

          <h2>5. Who we may disclose it to</h2>
          <p>We may disclose your information, with your consent or as otherwise permitted by law, to:</p>
          <ul>
            <li>Other health practitioners involved in your care (e.g. specialists, pathology labs, dental technicians).</li>
            <li>Medicare, the Department of Veterans' Affairs, private health funds, and other payers — only the information required to process a claim.</li>
            <li>Service providers who help us run the practice (e.g. practice management software, secure messaging platforms, IT support) under appropriate confidentiality agreements.</li>
            <li>Government agencies and regulators where required by law.</li>
          </ul>
          <p>
            We do not sell your information and we do not disclose it for
            marketing purposes without your consent.
          </p>

          <h2>6. How we store and protect it</h2>
          <p>
            Your records are stored on secure practice management systems with
            access restricted to authorised personnel. Physical records are
            held in locked storage. Electronic records are protected by
            passwords, encryption where appropriate, and access logs. We retain
            health records for the periods required by law (generally seven
            years from last contact for adults, or until age 25 for minors).
          </p>

          <h2>7. Overseas disclosure</h2>
          <p>
            Some of our service providers (for example, cloud-hosting
            providers) may store data overseas. Where this is the case, we
            take reasonable steps to ensure those providers handle your
            information in a manner consistent with the APPs.
          </p>

          <h2>8. Accessing and correcting your information</h2>
          <p>
            You have the right to access the personal and health information we
            hold about you and to ask us to correct it if it is inaccurate,
            out-of-date, incomplete, or misleading. To make a request, contact
            us using the details below. We may charge a reasonable fee for
            copies of records, and we will respond within 30 days.
          </p>

          <h2>9. Making a complaint</h2>
          <p>
            If you have a concern about how we have handled your information,
            please contact us first — we take complaints seriously and will
            investigate and respond promptly. If you are not satisfied with our
            response, you may complain to:
          </p>
          <ul>
            <li>
              <strong>Office of the Australian Information Commissioner</strong>{" "}
              (OAIC) — <a href="https://www.oaic.gov.au">oaic.gov.au</a>, 1300 363 992.
            </li>
            <li>
              <strong>NSW Privacy Commissioner</strong> —{" "}
              <a href="https://www.ipc.nsw.gov.au">ipc.nsw.gov.au</a>, 1800 472 679.
            </li>
            <li>
              For complaints about clinical care or a registered health
              practitioner: <strong>AHPRA</strong> —{" "}
              <a href="https://www.ahpra.gov.au">ahpra.gov.au</a>, 1300 419 495.
            </li>
          </ul>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The current version
            and its last-updated date will always be available on this page.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions, access requests, or complaints about your information
            can be directed to:
          </p>
          <p>
            <strong>{PRACTICE.name}</strong>
            <br />
            {PRACTICE.address.streetAddress}
            <br />
            {PRACTICE.address.addressLocality} {PRACTICE.address.addressRegion}{" "}
            {PRACTICE.address.postalCode}
            <br />
            Phone: <a href={`tel:${PRACTICE.phoneIntl}`}>{PRACTICE.phone}</a>
            <br />
            Email: <a href={`mailto:${PRACTICE.email}`}>{PRACTICE.email}</a>
          </p>
        </div>
      </article>
    </>
  );
}
