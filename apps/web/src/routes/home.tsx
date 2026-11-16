import type { Route } from "./+types/home";
import { seo } from "@/lib/seo";

import { Hero } from "@/components/home/hero";


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