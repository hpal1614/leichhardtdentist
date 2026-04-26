import { motion } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo";
import { PageHero } from "../components/layout/PageHero";
import { BOOKING_LINK_PROPS } from "../lib/booking";
import { usePractice } from "../lib/usePractice";

const MAP_EMBED =
  "https://www.google.com/maps?q=Shop+4+39-45+Norton+Street+Leichhardt+NSW+2040&output=embed";

export function Contact() {
  const practice = usePractice();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${practice.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Seo
        title="Contact — Leichhardt Dental Centre"
        description="Leichhardt Dental Centre, Shop 4/39-45 Norton Street, Leichhardt NSW 2040. Call 02 9568 3593. Open Mon-Fri 9-6, Sat 9-4."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Say hello."
        intro="For appointments, questions, or a quick chat before booking — here's how to reach us."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      {/* Quick-action cards */}
      <section className="pt-4 pb-12 lg:pb-16 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {/* Phone */}
            <motion.a
              href={`tel:${practice.phoneIntl}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-8 rounded-3xl bg-background border border-foreground/[0.04] hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">
                Call
              </p>
              <p className="text-xl lg:text-2xl font-heading font-bold text-foreground leading-tight mb-1">
                {practice.phone}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                or {practice.phoneAlt}
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${practice.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="group p-8 rounded-3xl bg-background border border-foreground/[0.04] hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">
                Email
              </p>
              <p className="text-sm lg:text-base font-heading font-semibold text-foreground leading-snug break-all">
                {practice.email}
              </p>
            </motion.a>

            {/* Address */}
            <motion.a
              href="https://maps.google.com/?q=Shop+4+39-45+Norton+Street+Leichhardt+NSW+2040"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group p-8 rounded-3xl bg-background border border-foreground/[0.04] hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">
                Visit
              </p>
              <p className="text-sm lg:text-base font-heading font-semibold text-foreground leading-snug mb-1">
                {practice.address.streetAddress}
              </p>
              <p className="text-xs text-muted-foreground">
                {practice.address.addressLocality} {practice.address.addressRegion} {practice.address.postalCode}
              </p>
            </motion.a>

            {/* Book CTA */}
            <motion.a
              {...BOOKING_LINK_PROPS}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group p-8 rounded-3xl bg-[#1a1a1a] text-white hover:bg-primary transition-all duration-500 text-left block"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-white group-hover:rotate-0 transition-transform" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 font-semibold mb-2">
                Or just
              </p>
              <p className="text-xl lg:text-2xl font-heading font-bold leading-tight">
                Book online
              </p>
              <p className="text-xs text-white/60 mt-1">
                With Dr. Nick
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Hours + Form */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Hours */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">
                    Opening hours
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.02] mb-10">
                  Six days a week.
                </h2>

                <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
                  {practice.hours.map((h) => (
                    <li key={h.days} className="py-5 flex items-baseline justify-between gap-4">
                      <span className="text-base lg:text-lg font-medium text-foreground">
                        {h.days}
                      </span>
                      <span className="text-base lg:text-lg text-muted-foreground font-mono tabular-nums text-right">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm text-muted-foreground leading-relaxed font-light">
                  Public holidays: closed. For dental emergencies outside hours,
                  please call the main line and follow the message prompts.
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="lg:col-span-7 bg-secondary/40 rounded-[2rem] p-8 lg:p-12 border border-foreground/[0.04]"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4 block">
                Or send a message
              </span>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.05] mb-8">
                Tell us what's on your mind.
              </h2>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 block">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 block">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </label>
              </div>

              <label className="block mb-5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 block">
                  Phone <span className="text-muted-foreground/60 normal-case tracking-normal">(optional)</span>
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </label>

              <label className="block mb-8">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 block">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </label>

              <button
                type="submit"
                className="group bg-primary hover:bg-primary/90 text-white px-7 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-12px_rgba(232,106,44,0.5)] inline-flex items-center"
              >
                Send message
                <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed">
                This form opens your email client. For appointment bookings,
                using the Book button is quicker.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 lg:pb-28 bg-background">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="aspect-[21/9] rounded-[2rem] overflow-hidden border border-foreground/[0.06] shadow-2xl"
          >
            <iframe
              title="Leichhardt Dental Centre — map"
              src={MAP_EMBED}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
