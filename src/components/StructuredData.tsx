import { Helmet } from "react-helmet-async";
import { usePractice } from "../lib/usePractice";

export function DentistStructuredData() {
  const practice = usePractice();

  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: practice.name,
    url: practice.url,
    telephone: practice.phoneIntl,
    email: practice.email,
    image: `${practice.url}/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.address.streetAddress,
      addressLocality: practice.address.addressLocality,
      addressRegion: practice.address.addressRegion,
      postalCode: practice.address.postalCode,
      addressCountry: practice.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: practice.geo.latitude,
      longitude: practice.geo.longitude,
    },
    openingHoursSpecification: practice.openingHoursSpec,
    areaServed: [
      { "@type": "Place", name: "Leichhardt" },
      { "@type": "Place", name: "Inner West Sydney" },
    ],
    medicalSpecialty: ["Dentistry", "ImplantDentistry"],
    // Ties the practice's social profiles (including Dr. Nick's YouTube
    // channel) to this entity, so search engines can tell they're the same
    // business rather than unrelated accounts.
    sameAs: Object.values(practice.social),
    employee: {
      "@type": "Person",
      name: practice.principal,
      jobTitle: "Principal Dentist",
      hasCredential: [
        "BDS",
        "Graduate Diploma in Clinical Dentistry (Oral Implants) — University of Sydney",
        "Fellowship, International Congress of Oral Implantologists",
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
