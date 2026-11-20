import type { Route } from "./+types/home";
import { seo } from "@/lib/seo";

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
  return seo(
    { matches, location },
    {
      title: "Luxury Chauffeur | Private Transfers on the French Riviera & Alps",
      description:
        "Luxury chauffeur transfers in Nice, Monaco, Cannes, Saint-Tropez and Courchevel. Premium Mercedes fleet, airport transfers and private chauffeur service. Request a quote.",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Luxury Chauffeur",
          inLanguage: "en",
        },
      ],
    },
  );
}

export default function HomePage() {
  return <Hero />;
}
