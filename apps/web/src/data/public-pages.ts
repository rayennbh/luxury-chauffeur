import { NICE_AIRPORT_TO_CANNES_PATH, NICE_AIRPORT_TO_CANNES_TITLE } from "@/constants/transfer-routes";
import { airportTransfers } from "@/data/airport-transfers";

export const businessName = "Luxury Chauffeur";
export const businessDescription = "Private chauffeur services, airport transfers and hourly hire on the French Riviera and in the Alps.";
export const serviceAreas = ["Nice", "Cannes", "Monaco", "Saint-Tropez", "Courchevel"];

export const businessPages = [
  { path: "/about", title: "About Luxury Chauffeur" },
  { path: "/contact", title: "Contact Luxury Chauffeur" },
  { path: "/terms", title: "Booking terms and privacy" },
];

export const destinationPages = serviceAreas.map(name => ({
  path: `/${name.toLowerCase()}`,
  title: `Private chauffeur in ${name}`,
}));

export const transferPages = [
  { path: NICE_AIRPORT_TO_CANNES_PATH, title: NICE_AIRPORT_TO_CANNES_TITLE },
  ...airportTransfers.map(({ slug, title }) => ({ path: `/${slug}`, title })),
];

export const publicPages = [
  { path: "/", title: businessName },
  ...destinationPages,
  ...transferPages,
  ...businessPages,
];
