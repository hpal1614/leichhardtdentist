import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin, Twitter } from "lucide-react";
import logo from "../assets/logo.svg";
import { usePractice } from "../lib/usePractice";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

const services = [
  { label: "General Dentistry", to: "/services/general-dentistry" },
  { label: "Dental Implants", to: "/services/dental-implants" },
  { label: "Single Visit Crowns", to: "/services/single-visit-crowns" },
  { label: "Same Day Smile", to: "/services/same-day-smile" },
];

const practiceLinks = [
  { label: "About Dr. Nick", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const practice = usePractice();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white/60">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand + tagline */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="inline-block mb-6" aria-label="Leichhardt Dental — home">
              <img
                src={logo}
                alt="Leichhardt Dental Centre"
                className="h-14 w-auto brightness-200"
              />
            </Link>
            <p className="text-white/50 leading-relaxed max-w-sm text-sm lg:text-base mb-6 font-light">
              General and implant dentistry in Sydney's Inner West — led by Dr.
              Nick Kulkarni, practised with patience and skill.
            </p>
            <div className="flex gap-3">
              <a
                href={practice.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-white/70" />
              </a>
              <a
                href={practice.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Facebook className="w-4 h-4 text-white/70" />
              </a>
              <a
                href={practice.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <TikTokIcon className="w-4 h-4 text-white/70" />
              </a>
              <a
                href={practice.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Twitter className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white/90 mb-5 text-xs uppercase tracking-[0.25em] font-semibold">
              Services
            </h4>
            <ul className="space-y-3 text-sm lg:text-base">
              {services.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-white/55 hover:text-white transition-colors duration-300"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div className="lg:col-span-2">
            <h4 className="text-white/90 mb-5 text-xs uppercase tracking-[0.25em] font-semibold">
              Practice
            </h4>
            <ul className="space-y-3 text-sm lg:text-base">
              {practiceLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/55 hover:text-white transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="col-span-2 lg:col-span-3">
            <h4 className="text-white/90 mb-5 text-xs uppercase tracking-[0.25em] font-semibold">
              Visit
            </h4>
            <ul className="space-y-4 text-sm lg:text-base">
              <li>
                <a
                  href={`tel:${practice.phoneIntl}`}
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-mono tabular-nums">{practice.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${practice.email}`}
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group break-all"
                >
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{practice.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/55">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="leading-snug">
                  {practice.address.streetAddress}
                  <br />
                  {practice.address.addressLocality} {practice.address.addressRegion}{" "}
                  {practice.address.postalCode}
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h5 className="text-white/70 text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
                Hours
              </h5>
              <ul className="space-y-1.5 text-xs lg:text-sm text-white/50">
                {practice.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="font-mono tabular-nums">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* AHPRA disclaimer */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed max-w-4xl mb-6 font-light">
            Leichhardt Dental Centre is a general dental practice regulated under the
            Health Practitioner Regulation National Law (Australia). All dental
            procedures carry potential risks and benefits; individual results vary. A
            consultation with a registered dental practitioner is required to
            determine whether a treatment is suitable for you.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/30">
            <p>
              &copy; {year} {practice.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white/60 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
