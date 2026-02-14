import logo from "../assets/logo.svg";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60">
      <div className="max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 lg:px-12 py-16 xl:py-20 2xl:py-24">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Leichhardt Dental Centre"
              className="h-16 xl:h-20 2xl:h-24 w-auto mb-5 brightness-200"
            />
            <p className="text-white/40 leading-relaxed max-w-xs xl:max-w-sm text-sm xl:text-base 2xl:text-lg mb-6">
              Your comfort is our priority. Gentle, expert dental care in Sydney's Inner West.
            </p>
            {/* Quick Reassurance */}
            <ul className="space-y-2 text-sm xl:text-base 2xl:text-lg text-white/50">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Accepting new patients
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Same-week appointments available
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> All health funds accepted
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white/80 mb-5 text-sm xl:text-base 2xl:text-lg uppercase tracking-widest">
              Hours
            </h4>
            <ul className="space-y-2 xl:space-y-3 text-sm xl:text-base 2xl:text-lg">
              <li className="flex justify-between max-w-[220px] xl:max-w-[280px] 2xl:max-w-[320px]">
                <span>Mon - Fri</span>
                <span className="text-white/80">8am - 6pm</span>
              </li>
              <li className="flex justify-between max-w-[220px] xl:max-w-[280px] 2xl:max-w-[320px]">
                <span>Saturday</span>
                <span className="text-white/80">9am - 2pm</span>
              </li>
              <li className="flex justify-between max-w-[220px] xl:max-w-[280px] 2xl:max-w-[320px]">
                <span>Sunday</span>
                <span className="text-white/30">Closed</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/80 mb-5 text-sm xl:text-base 2xl:text-lg uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-2 xl:space-y-3 text-sm xl:text-base 2xl:text-lg">
              <li>(02) 9560 1212</li>
              <li>hello@leichardtdental.com.au</li>
              <li>123 Norton Street, Leichhardt NSW</li>
            </ul>
            <div className="flex gap-3 xl:gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-white/70" />
              </a>
              <a
                href="#"
                className="w-9 h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-white/70" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs xl:text-sm 2xl:text-base text-white/30">
          <p>&copy; 2026 Leichhardt Dental Centre. All rights reserved.</p>
          <div className="flex gap-6 xl:gap-8">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
