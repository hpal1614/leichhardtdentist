import { Seo } from "../components/Seo";
import { PageHero } from "../components/layout/PageHero";
import { PRACTICE } from "../lib/practice";

const LAST_UPDATED = "14 April 2026";

export function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use — Leichhardt Dental Centre"
        description="Terms governing the use of the Leichhardt Dental Centre website."
        path="/terms"
      />
      <PageHero
        eyebrow="Legal"
        title="Terms of Use."
        intro={`The terms on which this website is offered. Last updated ${LAST_UPDATED}.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]}
      />

      <article className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 prose prose-lg prose-stone max-w-none
                        prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold
                        prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed
                        prose-li:text-muted-foreground prose-li:font-light prose-li:leading-relaxed
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <p className="lead text-base text-muted-foreground/80 border-l-4 border-primary pl-4 py-2 italic">
            This is a working draft. Have a solicitor review it before launch —
            health practice websites have specific obligations your lawyer will
            want to tailor to your situation.
          </p>

          <h2>1. Acceptance</h2>
          <p>
            By accessing or using the {PRACTICE.name} website (the "site"), you
            agree to be bound by these Terms of Use. If you do not agree, please
            do not use the site.
          </p>

          <h2>2. No medical advice</h2>
          <p>
            Information on this site is general in nature and is provided for
            informational purposes only. It is not a substitute for a clinical
            consultation with a registered dental practitioner. Individual
            results from any treatment vary, and all dental procedures carry
            potential risks and benefits. You should not rely on information on
            this site to make health decisions — always consult a qualified
            practitioner about your specific circumstances.
          </p>

          <h2>3. Booking and appointments</h2>
          <p>
            Requests made through our online booking system are subject to
            confirmation. A booking is not final until we confirm it with you.
            Appointment cancellations should be made at least 24 hours in
            advance where possible; fees may apply for missed or late-cancelled
            appointments as advised at the time of booking.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            All content on this site — text, photographs, video, logos, design
            — is the property of {PRACTICE.name} or used with permission, and is
            protected by Australian and international copyright law. You may
            view and print pages for personal, non-commercial reference, but
            you may not reproduce, republish, modify, or distribute any content
            without our prior written consent.
          </p>

          <h2>5. Images of treatment</h2>
          <p>
            Images of dental work shown on this site are of real cases treated
            at the practice and are published with the informed consent of the
            patients depicted. Images are illustrative only. Results are
            specific to the individual case and do not guarantee any particular
            outcome in another patient's situation. A consultation with a
            registered dental practitioner is required to determine whether a
            treatment is suitable for you.
          </p>

          <h2>6. Website availability</h2>
          <p>
            We aim to keep the site available and up-to-date but do not
            guarantee uninterrupted access. The site is provided on an "as is"
            basis. To the maximum extent permitted by law, we exclude liability
            for any loss or damage arising from the use of, or inability to
            use, the site.
          </p>

          <h2>7. Third-party links</h2>
          <p>
            This site may contain links to external websites (for example,
            health funds, professional bodies, or partner practices). Those
            sites are not under our control; we are not responsible for their
            content, availability, or privacy practices.
          </p>

          <h2>8. Privacy</h2>
          <p>
            Your use of the site is also governed by our{" "}
            <a href="/privacy">Privacy Policy</a>, which explains how we
            handle the information you provide to us.
          </p>

          <h2>9. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            site after a change constitutes acceptance of the updated Terms.
            The current version and last-updated date appear at the top of this
            page.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These Terms are governed by the laws of New South Wales, Australia.
            Any disputes arising from your use of the site are subject to the
            exclusive jurisdiction of the courts of New South Wales.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these Terms can be directed to:
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
