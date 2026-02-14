import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { ClinicExperience } from "./components/ClinicExperience";
import { ResultsGrid } from "./components/ResultsGrid";
import { TeamSection } from "./components/TeamSection";
import { TeamGrid } from "./components/TeamGrid";
import { BookingSection } from "./components/BookingSection";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { StickyBookButton } from "./components/StickyBookButton";
import { TrustSection } from "./components/TrustSection";
import { PhilosophySection } from "./components/PhilosophySection";
// Booking
import { BookingProvider } from "./components/booking/BookingContext";
import { BookingWizard } from "./components/booking/BookingWizard";

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />

        <main>
          {/* Cinematic Hero */}
          <Hero />

          {/* Validation Bridge: Trust Indicators */}
          <TrustSection />

          {/* Brand Story: Philosophy */}
          <PhilosophySection />

          {/* Core Offering: Services */}
          <ServicesSection />
          <ClinicExperience />
          <ResultsGrid />

          {/* Editorial Team Section */}
          <TeamSection />
          <div className="hidden lg:block"> {/* Optional spacer or separator if needed, but grid has padding */} </div>
          <TeamGrid />

          {/* Social Proof */}
          <Testimonials />

          {/* Final Call to Action */}
          <BookingSection />
        </main>

        <Footer />

        {/* Persistent helper */}
        <StickyBookButton />

        {/* Global Modals */}
        <BookingWizard />
      </div>
    </BookingProvider>
  );
}
