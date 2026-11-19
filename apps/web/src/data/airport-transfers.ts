type AirportTransfer = {
  slug: string;
  title: string;
  description: string;
  pickup: string;
  pickupPath?: string;
  destination: string;
  destinationPath: string;
  intro: string;
  arrival: { heading: string; details: string };
  luggage: string;
  questions: { question: string; answer: string }[];
};

const niceAirport = "Nice Côte d’Azur Airport (NCE)";

export const airportTransfers: AirportTransfer[] = [
  {
    slug: "nice-airport-to-monaco",
    title: "Nice Airport to Monaco Private Transfer",
    description: "Request a private transfer from Nice Airport to Monaco. Plan a hotel drop-off in Monte-Carlo or a pickup for a return flight with Luxury Chauffeur.",
    pickup: niceAirport,
    pickupPath: "/nice",
    destination: "Monaco",
    destinationPath: "/monaco",
    intro: "Arrange a chauffeur from Nice Côte d’Azur Airport to a hotel in Monte-Carlo, a residence in Monaco or a meeting point near Port Hercule.",
    arrival: {
      heading: "Hotel and port drop-offs",
      details: "Share your hotel entrance or marina meeting point. If you are joining a yacht, include the berth or the name of the person meeting you at the port.",
    },
    luggage: "Share your passenger and luggage counts. Mention extra bags or a child seat request so the team can confirm a suitable vehicle.",
    questions: [
      {
        question: "How do I arrange a transfer during a Monaco event?",
        answer: "Share the venue and the time you need to arrive. If access around the venue is restricted, agree on a pickup or drop-off point with the team before you travel.",
      },
      {
        question: "Can I request a return transfer from Monaco to Nice Airport?",
        answer: "Include your Monaco pickup address, flight number and departure time when you request the return journey.",
      },
    ],
  },
  {
    slug: "nice-airport-to-saint-tropez",
    title: "Nice Airport to Saint-Tropez Private Transfer",
    description: "Request a private chauffeur from Nice Airport to Saint-Tropez, Ramatuelle or Pampelonne. Share your flight and drop-off details for a quote.",
    pickup: niceAirport,
    pickupPath: "/nice",
    destination: "Saint-Tropez",
    destinationPath: "/saint-tropez",
    intro: "Plan a private transfer from Nice Côte d’Azur Airport to a hotel or villa in Saint-Tropez, or to an address in Ramatuelle or Pampelonne.",
    arrival: {
      heading: "Villa and beach drop-offs",
      details: "For a villa, share the street address and any useful entrance or gate instructions. For Pampelonne, include the beach venue name and its entrance if you know it.",
    },
    luggage: "List suitcases, strollers and any other large items alongside your passenger count so the team can check vehicle capacity.",
    questions: [
      {
        question: "What if I have a restaurant reservation after landing?",
        answer: "Include your reservation time when you enquire. Allow time for baggage collection and summer road traffic when planning the journey.",
      },
      {
        question: "Can I request a transfer back to Nice Airport?",
        answer: "Send your Saint-Tropez pickup address and departure flight time. Include any stops you want to arrange on the way.",
      },
    ],
  },
  {
    slug: "geneva-airport-to-courchevel",
    title: "Geneva Airport to Courchevel Private Transfer",
    description: "Request a private chauffeur from Geneva Airport to your Courchevel hotel or chalet. Include your flight, luggage and ski equipment for a quote.",
    pickup: "Geneva Airport (GVA)",
    destination: "Courchevel",
    destinationPath: "/courchevel",
    intro: "Arrange a private transfer from Geneva Airport to your hotel or chalet in Courchevel. Share your resort address and ski luggage when requesting a quote.",
    arrival: {
      heading: "Hotel and chalet drop-offs",
      details: "Include the village and the full address. Ask your accommodation provider about the best meeting point if the chalet has restricted vehicle access.",
    },
    luggage: "List your suitcases, ski bags and snowboards separately. Include any child seat requirements so the team can confirm capacity for the whole group.",
    questions: [
      {
        question: "Can snow affect the pickup or arrival time?",
        answer: "Mountain weather and road conditions can affect the journey. Share any check-in deadline and confirm the pickup arrangements and winter equipment with the team before travel.",
      },
      {
        question: "Can I book a return journey to Geneva Airport?",
        answer: "Include your chalet or hotel pickup address and departure flight details so the team can review the return journey and timing.",
      },
    ],
  },
];
