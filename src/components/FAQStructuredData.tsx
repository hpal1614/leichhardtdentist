import { Helmet } from "react-helmet-async";
import type { FAQ } from "../lib/pillar";

type Props = {
  faqs: FAQ[];
};

/**
 * Emits schema.org FAQPage JSON-LD for a list of Q&A pairs.
 * Strong signal for Google rich results AND LLM retrieval systems.
 */
export function FAQStructuredData({ faqs }: Props) {
  if (!faqs.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
