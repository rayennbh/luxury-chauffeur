import { CONTACT_EMAIL } from "@/constants/site";
import { businessDescription, businessName, businessPages, destinationPages, serviceAreas, transferPages } from "@/data/public-pages";

export const publicTool = {
  name: "get_chauffeur_service_info",
  description: "Read public Luxury Chauffeur service areas, transfer pages and contact information. Does not request a quote or make a booking.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false } as const,
  annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
};

export function getChauffeurServiceInfo(origin: string) {
  const withUrls = (pages: typeof businessPages) =>
    pages.map(({ path, title }) => ({ title, url: origin + path }));

  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        business: businessName,
        description: businessDescription,
        email: CONTACT_EMAIL,
        serviceAreas,
        destinations: withUrls(destinationPages),
        transfers: withUrls(transferPages),
        information: withUrls(businessPages),
        quoteForm: origin + "/#booking",
        bookingNotice: "A quote request is not a confirmed booking. Contact the team to confirm availability and the final fare.",
      }),
    }],
  };
}
