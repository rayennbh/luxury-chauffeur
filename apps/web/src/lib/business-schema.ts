import { CONTACT_EMAIL } from "@/constants/site";
import { businessDescription, businessName, serviceAreas } from "@/data/public-pages";
import { absoluteUrl, siteOriginFrom, type SeoArgs } from "@/lib/seo";

export function organizationId(origin: string) {
  return absoluteUrl(origin, "/#organization");
}

export function organizationSchema(args: SeoArgs) {
  const origin = siteOriginFrom(args.matches);
  const root = args.matches.find(match => match?.id === "root");
  const profiles = (root?.loaderData as { businessProfiles?: string[] } | undefined)?.businessProfiles;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(origin),
    name: businessName,
    url: absoluteUrl(origin, "/"),
    description: businessDescription,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      email: CONTACT_EMAIL,
      url: absoluteUrl(origin, "/contact"),
    },
    areaServed: serviceAreas.map(name => ({ "@type": "Place", name })),
    ...(profiles?.length ? { sameAs: profiles } : {}),
  };
}

export function serviceSchema(args: SeoArgs, name: string, description: string, areaServed: string[], path = args.location.pathname) {
  const origin = siteOriginFrom(args.matches);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(origin, path) + "#service",
    name,
    description,
    areaServed: areaServed.map(name => ({ "@type": "Place", name })),
    url: absoluteUrl(origin, path),
    provider: { "@id": organizationId(origin) },
  };
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
