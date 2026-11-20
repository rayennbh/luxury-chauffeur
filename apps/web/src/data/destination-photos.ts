export type DestinationPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit?: { author: string; source: string; license: string; licenseUrl: string };
};

const licenses = {
  by2: { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  by3: { license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" },
  bySa3: { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  bySa4: { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  cc0: { license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
};

type DestinationPhotography = {
  heroIndex: 0 | 1 | 2;
  description: string;
  photos: [GalleryDestinationPhoto, GalleryDestinationPhoto, GalleryDestinationPhoto];
};

type GalleryDestinationPhoto = DestinationPhoto & { title: string };

export const destinationPhotography: Partial<Record<string, DestinationPhotography>> = {
  "/nice": {
    heroIndex: 0,
    description: "From the Baie des Anges to the colourful façades of the old town and Place Masséna.",
    photos: [
      {
        src: "/images/destinations/nice-seafront.webp",
        width: 1440, height: 507,
        title: "Baie des Anges",
        alt: "The curve of the Baie des Anges and the Promenade des Anglais in Nice",
        credit: {
          author: "Rafael Puerto",
          source: "https://commons.wikimedia.org/wiki/File:Nice_France_panorama.jpg",
          ...licenses.bySa4,
        },
      },
      {
        src: "/images/destinations/nice-old-town.webp",
        width: 960, height: 535,
        title: "Old Nice",
        alt: "Rose-coloured façades and wrought-iron balconies in Vieux Nice",
        credit: {
          author: "Lamiot",
          source: "https://commons.wikimedia.org/wiki/File:Fa%C3%A7ade_rose_Nice_avril_2018a37.jpg",
          ...licenses.bySa4,
        },
      },
      {
        src: "/images/destinations/nice-place-massena.webp",
        width: 960, height: 639,
        title: "Place Masséna",
        alt: "Colourful buildings and patterned paving on Place Masséna in Nice",
        credit: {
          author: "Tiia Monto",
          source: "https://commons.wikimedia.org/wiki/File:Nice_-_Place_Mass%C3%A9na.jpg",
          ...licenses.bySa4,
        },
      },
    ],
  },
  "/monaco": {
    heroIndex: 0,
    description: "Explore Port Hercule, the Prince’s Palace in Monaco-Ville and the casino in Monte-Carlo.",
    photos: [
      {
        src: "/images/destinations/monaco-harbour.webp",
        width: 1440, height: 714,
        title: "Port Hercule",
        alt: "Panoramic view of Port Hercule and the hillside buildings of Monaco",
        credit: {
          author: "Gérard Kieffer",
          source: "https://commons.wikimedia.org/wiki/File:Monaco_Hercule_Harbour_Panorama.jpg",
          ...licenses.bySa3,
        },
      },
      {
        src: "/images/destinations/monaco-princes-palace.webp",
        width: 960, height: 720,
        title: "Prince’s Palace",
        alt: "The Prince’s Palace and its open square in Monaco-Ville",
        credit: {
          author: "Claphi",
          source: "https://commons.wikimedia.org/wiki/File:Ext%C3%A9rieur_du_palais_de_la_principaut%C3%A9_de_Monaco.jpg",
          ...licenses.bySa4,
        },
      },
      {
        src: "/images/destinations/monaco-casino.webp",
        width: 886, height: 630,
        title: "Monte-Carlo Casino",
        alt: "The seaside façade of the Monte-Carlo Casino and its surrounding gardens",
        credit: {
          author: "Qypchak",
          source: "https://commons.wikimedia.org/wiki/File:Casino_Monte_Carlo.jpg",
          ...licenses.by3,
        },
      },
    ],
  },
  "/saint-tropez": {
    heroIndex: 2,
    description: "Yachts in the old port, the church tower above the village and the beach at Pampelonne.",
    photos: [
      {
        src: "/images/destinations/saint-tropez-panorama.webp",
        width: 1280, height: 544,
        title: "The Old Port",
        alt: "Yachts and the waterfront of Saint-Tropez seen across the harbour",
        credit: {
          author: "François de Dijon",
          source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_Le_port_01.jpg",
          ...licenses.bySa4,
        },
      },
      {
        src: "/images/destinations/saint-tropez-old-town.webp",
        width: 960, height: 443,
        title: "View from the Citadel",
        alt: "The colourful bell tower of Saint-Tropez framed by trees near the citadel",
        credit: {
          author: "Arnaudagius",
          source: "https://commons.wikimedia.org/wiki/File:Eglise_de_Saint-Tropez_vue_de_la_citadelle.jpg",
          ...licenses.bySa3,
        },
      },
      {
        src: "/images/destinations/saint-tropez-pampelonne.webp",
        width: 1440, height: 959,
        title: "Pampelonne Beach",
        alt: "Aerial view of the sandy shore and turquoise water at Pampelonne in Ramatuelle",
        credit: {
          author: "dronepicr",
          source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_turquoise_waters_of_the_French_Riviera_at_Pampelonne_Beach_(52723791601).jpg",
          ...licenses.by2,
        },
      },
    ],
  },
  "/courchevel": {
    heroIndex: 2,
    description: "See the mountain slopes above Le Praz, Courchevel Village and the chalets of Courchevel 1850.",
    photos: [
      {
        src: "/images/destinations/courchevel-le-praz.webp",
        width: 1440, height: 957,
        title: "The Slopes Above Le Praz",
        alt: "Snow-covered slopes above Le Praz in Courchevel",
        credit: {
          author: "DimiTalen",
          source: "https://commons.wikimedia.org/wiki/File:Courchevel_Le_Praz.jpg",
          ...licenses.cc0,
        },
      },
      {
        src: "/images/destinations/courchevel-village.webp",
        width: 960, height: 638,
        title: "Courchevel Village",
        alt: "Snow-covered pistes and chalets at the front de neige of Courchevel Village",
        credit: {
          author: "DimiTalen",
          source: "https://commons.wikimedia.org/wiki/File:Courchevel_Village_front_de_neige.jpg",
          ...licenses.cc0,
        },
      },
      {
        src: "/images/destinations/courchevel-1850-winter.webp",
        width: 1440, height: 1041,
        title: "Courchevel 1850 in Winter",
        alt: "A gondola above snow-covered chalets in Courchevel 1850",
        credit: {
          author: "Florian Pépellin",
          source: "https://commons.wikimedia.org/wiki/File:Courchevel_1850_et_front_de_neige_avant_No%C3%ABl_(d%C3%A9cembre_2019).JPG",
          ...licenses.bySa4,
        },
      },
    ],
  },
};
