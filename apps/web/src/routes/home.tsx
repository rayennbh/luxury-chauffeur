import type { Route } from "./+types/home";
import { absoluteUrl, seo, siteOriginFrom } from "@/lib/seo";
import { organizationId, organizationSchema, serviceSchema } from "@/lib/business-schema";
import { businessDescription, businessName, serviceAreas } from "@/data/public-pages";

import { Hero } from "@/components/home/hero";


export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    href: "/images/home/hero-mobile.webp",
    media: "(width < 768px)",
    fetchPriority: "high",
  },
  {
    rel: "preload",
    as: "image",
    href: "/images/home/hero-desktop.webp",
    media: "(width >= 768px)",
    fetchPriority: "high",
  },
];

export function meta({ matches, location }: Route.MetaArgs) {
  const args = { matches, location };
  const origin = siteOriginFrom(matches);
  return seo(
    args,
    {
      title: "Luxury Chauffeur on the French Riviera & in the Alps",
      description:
        "Luxury chauffeur transfers in Nice, Monaco, Cannes, Saint-Tropez and Courchevel. Premium Mercedes fleet, airport transfers and private chauffeur service. Request a quote.",
      jsonLd: [
        organizationSchema(args),
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": absoluteUrl(origin, "/#website"),
          url: absoluteUrl(origin, "/"),
          name: businessName,
          inLanguage: "en",
          publisher: { "@id": organizationId(origin) },
        },
        serviceSchema(args, "Private chauffeur services", businessDescription, serviceAreas),
      ],
    },
  );
}

export default function HomePage() {
  return <Hero />;
}
