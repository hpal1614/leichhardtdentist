import { Seo } from "../components/Seo";
import { DentistStructuredData } from "../components/StructuredData";
import { Hero, type HomeHeroData } from "../components/Hero";
import { useSanityDoc } from "../lib/useSanityDoc";
import { HOME_HERO_QUERY } from "../lib/queries";
import { TrustSection } from "../components/TrustSection";
import { PhilosophySection } from "../components/PhilosophySection";
import { ServicesSection } from "../components/ServicesSection";
import { ClinicExperience } from "../components/ClinicExperience";
import { ResultsGrid } from "../components/ResultsGrid";
import { TeamSection } from "../components/TeamSection";
import { TeamGrid } from "../components/TeamGrid";
import { BookingSection } from "../components/BookingSection";

export function Home() {
  const heroData = useSanityDoc<HomeHeroData>(HOME_HERO_QUERY);

  return (
    <>
      <Seo
        title="Leichhardt Dental Centre — General & Implant Dentistry, Inner West Sydney"
        description="General and implant dentistry in Leichhardt, led by Dr. Nick Kulkarni. Evidence-based care, calm approach, 20+ years of practice in Sydney's Inner West."
        path="/"
      />
      <DentistStructuredData />
      <Hero data={heroData} />
      <TrustSection />
      <PhilosophySection />
      <ServicesSection />
      <ClinicExperience />
      <ResultsGrid />
      <TeamSection />
      <TeamGrid />
      <BookingSection />
    </>
  );
}
