import { Button } from "./ui/button";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-border/30"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <img
            src={logo}
            alt="Leichhardt Dental Centre"
            className="h-14 w-auto"
          />
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: "Services", href: "#services" },
              { label: "Our Dentist", href: "#team" },
              { label: "First Visit", href: "#first-visit" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-all duration-300 hover:opacity-100 ${scrolled
                    ? "text-foreground/60 hover:text-primary"
                    : "text-white/70 hover:text-white"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className={`hidden sm:inline-flex transition-all duration-300 shadow-lg ${scrolled
                ? "bg-primary hover:bg-primary/90 text-white"
                : "bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/20"
              }`}
          >
            Book Online
          </Button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-foreground" : "text-white"
              }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border/30 shadow-lg">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {[
              { label: "Services", href: "#services" },
              { label: "Our Dentist", href: "#team" },
              { label: "First Visit", href: "#first-visit" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-foreground/70 hover:text-primary transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-white mt-2 w-full">
              Book Online
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
