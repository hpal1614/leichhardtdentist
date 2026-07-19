export const PRACTICE = {
  name: "Leichhardt Dental Centre",
  legalName: "Leichhardt Dental Centre",
  principal: "Dr. Nick Kulkarni",
  url: "https://leichhardtdentist.com",
  phone: "02 9568 3593",
  phoneIntl: "+61295683593",
  phoneAlt: "0475 742 607",
  phoneAltIntl: "+61475742607",
  email: "leichhardtdentist@gmail.com",
  address: {
    streetAddress: "Shop 4/39-45 Norton Street",
    addressLocality: "Leichhardt",
    addressRegion: "NSW",
    postalCode: "2040",
    addressCountry: "AU",
  },
  geo: { latitude: -33.8836, longitude: 151.1574 },
  hours: [
    { days: "Mon – Fri", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "https://www.facebook.com/leichhardtdentalcentre",
    instagram: "https://www.instagram.com/leichhardt_dental/",
    tiktok: "https://www.tiktok.com/@leichhardtdentalcentre",
    twitter: "https://twitter.com/LeichhardtDC",
  },
  openingHoursSpec: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:00",
    },
  ],
} as const;
