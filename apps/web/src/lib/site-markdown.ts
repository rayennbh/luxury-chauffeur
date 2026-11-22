import { CONTACT_EMAIL } from "@/constants/site";
import { businessDescription, businessName, businessPages, destinationPages, transferPages } from "@/data/public-pages";
import { vehicles } from "@/data/vehicles";

export function renderSiteMarkdown(origin: string) {
  const list = (pages: typeof businessPages) =>
    pages.map(({ path, title }) => `- [${title}](${origin}${path})`).join("\n");

  return `# ${businessName}

> ${businessDescription}

Requests are subject to availability. The final fare, vehicle and pickup details are confirmed separately.

- [Request a quote](${origin}/#booking)
- [Email ${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})

## Destinations

${list(destinationPages)}

## Airport transfers

${list(transferPages)}

## Company information

${list(businessPages)}
`;
}

export function renderHomepageMarkdown(origin: string) {
  const fleet = vehicles.map(({ name, passengers, luggage }) => `- ${name}: up to ${passengers} passengers and ${luggage} bags.`).join("\n");

  return `${renderSiteMarkdown(origin)}
## Chauffeur services

- Private transfers between pickup and drop-off locations.
- Hourly chauffeur service for itineraries with multiple stops.
- Airport arrivals on the French Riviera and transfers to Alpine resorts.

## Fleet

${fleet}

Vehicle illustrations and capacities are indicative. Confirm the vehicle and luggage requirements when requesting a quote.

## Request a quote

Share your pickup and drop-off locations or preferred duration, travel date and time, passenger count and any special requirements. [Open the booking form](${origin}/#booking) or [contact the team](${origin}/contact).
`;
}
