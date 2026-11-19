export type DestinationPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit?: { author: string; source: string; license: string; licenseUrl: string };
};

const licenses = {
  by2: { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  bySa3: { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  bySa4: { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  cc0: { license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
};

type DestinationPhotography = {
  hero: DestinationPhoto;
  landmark: { title: string; description: string; photo: DestinationPhoto };
};

export const destinationPhotography: Partial<Record<string, DestinationPhotography>> = {
  "/nice": {
    hero: {
      src: "/images/destinations/nice-seafront.webp",
      width: 1440, height: 507,
      alt: "The curve of the Baie des Anges and the Promenade des Anglais in Nice",
      credit: {
        author: "Rafael Puerto",
        source: "https://commons.wikimedia.org/wiki/File:Nice_France_panorama.jpg",
        ...licenses.bySa4,
      },
    },
    landmark: {
      title: "Cours Saleya, in the heart of Old Nice",
      description: "Spend part of your stay among the market stalls and colourful façades of Vieux Nice. If your hotel is in a pedestrian street, share its name when you enquire so a convenient meeting point can be arranged.",
      photo: {
        src: "/images/destinations/nice-cours-saleya.webp",
        width: 960, height: 719,
        alt: "Fruit stalls under striped awnings at the Cours Saleya market in Nice",
        credit: {
          author: "Mike is Michi",
          source: "https://commons.wikimedia.org/wiki/File:Cours_Saleya_market_fruit_stalls_Nice_2026.JPG",
          ...licenses.bySa4,
        },
      },
    },
  },
  "/monaco": {
    hero: {
      src: "/images/destinations/monaco-harbour.webp",
      width: 1440, height: 714,
      alt: "Panoramic view of Port Hercule and the hillside buildings of Monaco",
      credit: {
        author: "Gérard Kieffer",
        source: "https://commons.wikimedia.org/wiki/File:Monaco_Hercule_Harbour_Panorama.jpg",
        ...licenses.bySa3,
      },
    },
    landmark: {
      title: "Place du Palais, Monaco-Ville",
      description: "Explore the old town above Port Hercule. If your itinerary includes Monaco-Ville or a busy event, share the venue and your preferred arrival time so the team can confirm where to drop you off.",
      photo: {
        src: "/images/destinations/monaco-palace.webp",
        width: 960, height: 720,
        alt: "Visitors gathered in front of the Prince’s Palace on Place du Palais in Monaco",
        credit: {
          author: "David Jones",
          source: "https://commons.wikimedia.org/wiki/File:Place_du_Palais,_Monaco_(30087835213).jpg",
          ...licenses.by2,
        },
      },
    },
  },
  "/saint-tropez": {
    hero: {
      src: "/images/destinations/saint-tropez-panorama.webp",
      width: 1280, height: 544,
      alt: "Yachts and the waterfront of Saint-Tropez seen across the harbour",
      credit: {
        author: "François de Dijon",
        source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_Le_port_01.jpg",
        ...licenses.bySa4,
      },
    },
    landmark: {
      title: "The old town from the citadel",
      description: "The colourful church tower looks out over the old town and the bay. For a pickup in the village, send your hotel or restaurant name and the time you would like to leave.",
      photo: {
        src: "/images/destinations/saint-tropez-old-town.webp",
        width: 960, height: 443,
        alt: "The colourful bell tower of Saint-Tropez framed by trees below the citadel",
        credit: {
          author: "Arnaudagius",
          source: "https://commons.wikimedia.org/wiki/File:Eglise_de_Saint-Tropez_vue_de_la_citadelle.jpg",
          ...licenses.bySa3,
        },
      },
    },
  },
  "/courchevel": {
    hero: {
      src: "/images/destinations/courchevel-le-praz.webp",
      width: 1440, height: 957,
      alt: "Snow-covered slopes above Le Praz in Courchevel",
      credit: {
        author: "DimiTalen",
        source: "https://commons.wikimedia.org/wiki/File:Courchevel_Le_Praz.jpg",
        ...licenses.cc0,
      },
    },
    landmark: {
      title: "An arrival in Courchevel Village",
      description: "Share the village name and exact chalet or hotel address when you request a transfer. Include how many ski bags, snowboards and suitcases you are bringing so the team can confirm vehicle capacity.",
      photo: {
        src: "/images/destinations/courchevel-village.webp",
        width: 960, height: 638,
        alt: "Snow-covered pistes and chalets at the front de neige of Courchevel Village",
        credit: {
          author: "DimiTalen",
          source: "https://commons.wikimedia.org/wiki/File:Courchevel_Village_front_de_neige.jpg",
          ...licenses.cc0,
        },
      },
    },
  },
};
