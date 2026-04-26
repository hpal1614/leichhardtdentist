import { Helmet } from "react-helmet-async";
import { PRACTICE } from "../lib/practice";

type Props = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function Seo({ title, description, path, noIndex }: Props) {
  const canonical = `${PRACTICE.url}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
