import { useLocation } from "react-router";
import { seo, type SeoArgs } from "@/lib/seo";
import { whatsappUrl, mailtoHref } from "@/lib/contact-links";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/constants/site";
import {
  NICE_AIRPORT_TO_CANNES_PATH,
  NICE_AIRPORT_TO_CANNES_TITLE,
} from "@/constants/transfer-routes";
import { DestinationGallery } from "@/components/cannes/gallery";
import { cannesPhotos } from "@/data/cannes";
import { destinationPhotography, type DestinationPhoto } from "@/data/destination-photos";
import { airportTransfers } from "@/data/airport-transfers";

type Destination = {
  name: string;
  title: string;
  description: string;
  intro: string;
  services: [string, string][];
  routes: string[];
  note: string;
};

const destinations: Record<string, Destination> = {
  "/cannes": {
    name: "Cannes",
    title: "Private Chauffeur Cannes | Luxury Chauffeur",
    description:
      "Request a private chauffeur in Cannes for Nice Airport transfers, hotel arrivals, hourly hire and event transport. Receive a personalised quotation.",
    intro:
      "From an arrival on La Croisette to a busy business itinerary, arrange private transport around your stay in Cannes.",

    services: [
      [
        "Nice Airport to Cannes",
        "Request a private transfer to your hotel, villa or business address. Share your flight number, passenger count and luggage details.",
      ],
      [
        "Hourly chauffeur hire",
        "Plan meetings, shopping, restaurants or several stops with a chauffeur at your disposal. Schedule and minimum duration are confirmed in your quotation.",
      ],
      [
        "Festival and business transport",
        "Discuss transport for the Cannes Film Festival, Cannes Lions or a conference. Road restrictions and meeting points must be checked before your journey.",
      ],
    ],

    routes: [
      "Nice Airport",
      "Monaco",
      "Saint-Tropez",
      "Antibes",
    ],

    note:
      "During major events, allow additional time and confirm pickup points in advance.",
  },

  "/monaco": {
    name: "Monaco & Monte-Carlo",
    title: "Private Chauffeur Monaco & Monte-Carlo | Luxury Chauffeur",
    description:
      "Request a private chauffeur in Monaco or Monte-Carlo for a one-way transfer, hourly hire or an event. Share your itinerary for a personalised quote.",
    intro:
      "Request a private driver for a direct transfer to your hotel or venue in Monaco. For several stops, share your itinerary to arrange hourly or full-day chauffeur hire in Monaco and Monte-Carlo.",

    services: [
      [
        "Nice Airport to Monaco",
        "For a transfer from Nice Côte d’Azur Airport to Monaco, share your flight number, the exact drop-off address and the number of passengers and bags.",
      ],
      [
        "Hourly chauffeur hire in Monaco",
        "For meetings in Fontvieille or an evening in Monte-Carlo, include your stops, the times you need to arrive and any waiting time. Your chauffeur can discuss the schedule and confirm the fare with you.",
      ],
      [
        "Events and marina transfers",
        "For the Monaco Grand Prix, Monaco Yacht Show or a pickup at Port Hercule, share your venue entrance or berth and the time you need to be there. Confirm the meeting point and vehicle access before travel.",
      ],
    ],

    routes: [
      "Nice Airport",
      "Cannes",
      "Èze",
      "Saint-Jean-Cap-Ferrat",
    ],

    note:
      "Major Monaco events can involve road closures and restricted vehicle access.",
  },

  "/nice": {
    name: "Nice",
    title: "Private Chauffeur Nice & Airport Transfers | Luxury Chauffeur",
    description:
      "Book a private chauffeur enquiry in Nice. Arrange Nice Airport transfers, hotel pickups, business transport and private journeys across the French Riviera.",
    intro:
      "Start your Riviera stay with private transport from Nice Airport, or plan chauffeur-driven journeys between your hotel, meetings and coastal destinations.",

    services: [
      [
        "Nice Airport transfers",
        "Provide your flight number and exact destination to request an airport pickup. Meeting arrangements and any requested luggage assistance are confirmed before travel.",
      ],
      [
        "City and hotel journeys",
        "Arrange transport to a hotel, residence, restaurant or business address in Nice. Share the exact location so suitable access can be discussed.",
      ],
      [
        "Riviera day itineraries",
        "Plan several stops in Monaco, Cannes, Èze or nearby coastal towns. The route and stopping times can be discussed around your interests.",
      ],
    ],

    routes: [
      "Monaco",
      "Cannes",
      "Saint-Tropez",
      "Èze",
    ],

    note:
      "Flight details, luggage requirements and the exact pickup address help us prepare your quotation.",
  },

  "/saint-tropez": {
    name: "Saint-Tropez",
    title: "Private Chauffeur Saint-Tropez | Luxury Chauffeur",
    description:
      "Request private chauffeur transport to Saint-Tropez, Ramatuelle and Pampelonne. Arrange airport transfers, return journeys and hourly chauffeur hire.",
    intro:
      "Plan your arrival in Saint-Tropez and private journeys to villas, hotels, restaurants and the surrounding coast.",

    services: [
      [
        "Airport and Riviera transfers",
        "Request a journey from Nice Airport, Cannes or another address to Saint-Tropez. Share your arrival details and destination for a tailored quotation.",
      ],
      [
        "Ramatuelle and Pampelonne",
        "Arrange transport for a restaurant booking, beach visit or private address. Pickup times and access are agreed before your journey.",
      ],
      [
        "Hourly and return services",
        "Discuss a chauffeur for several stops, an evening itinerary or a return transfer. Confirm the schedule and waiting arrangements when enquiring.",
      ],
    ],

    routes: [
      "Nice Airport",
      "Cannes",
      "Ramatuelle",
      "Pampelonne",
    ],

    note:
      "Summer traffic can affect journey times. Plan appointments and return journeys with sufficient flexibility.",
  },

  "/courchevel": {
    name: "Courchevel",
    title: "Courchevel Private Chauffeur & Transfers | Luxury Chauffeur",
    description:
      "Request a private transfer to Courchevel from Geneva, Lyon, Chambéry or Grenoble Airport. Share passenger, luggage and ski equipment requirements.",
    intro:
      "Organise private travel to your Courchevel hotel or chalet, with arrangements discussed around your flight, group and luggage.",

    services: [
      [
        "Airport to Courchevel",
        "Enquire about transfers from Geneva, Lyon, Chambéry or Grenoble Airport. Provide flight details and the exact resort address.",
      ],
      [
        "Chalet and resort transport",
        "Share your hotel, chalet or appointment locations to request local or hourly chauffeur transport, subject to availability.",
      ],
      [
        "Luggage and ski equipment",
        "Specify suitcases, skis, snowboards and any child-seat requirements. Vehicle capacity and suitable equipment must be confirmed before booking.",
      ],
    ],

    routes: [
      "Geneva Airport",
      "Lyon Airport",
      "Chambéry Airport",
      "Grenoble Airport",
    ],

    note:
      "Mountain weather, road conditions and peak arrival periods can affect travel. Winter equipment and any special requirements must be confirmed with the operator.",
  },
};

const cannesHero: DestinationPhoto = {
  src: cannesPhotos[0].src,
  width: 1600,
  height: 900,
  alt: "Illustrative view of La Croisette in Cannes",
};

function photoCredit(credit: NonNullable<DestinationPhoto["credit"]>) {
  return (
    <>
      Photo by <a href={credit.source}>{credit.author}</a>
      {" · "}
      <a href={credit.licenseUrl}>{credit.license}</a>
      {" · Resized and cropped for display"}
    </>
  );
}

export function meta(args: SeoArgs) {
  const page =
    destinations[args.location.pathname] ?? destinations["/cannes"];

  const photography = destinationPhotography[args.location.pathname];
  const hero = photography ? photography.photos[photography.heroIndex] : cannesHero;

  return seo(args, {
    title: page.title,
    description: page.description,
    image: hero.src,
    path: args.location.pathname,
  });
}

export default function DestinationPage() {
  const { pathname } = useLocation();

  const page =
    destinations[pathname] ?? destinations["/cannes"];

  const photography = destinationPhotography[pathname];
  const heroPhoto = photography ? photography.photos[photography.heroIndex] : cannesHero;

  const bookingHref =
    "/?destination=" + encodeURIComponent(page.name) + "#booking";

  const whatsappHref = whatsappUrl({
    phone: WHATSAPP_NUMBER,
    text:
      "Hello Luxury Chauffeur, I would like a quotation for private transport in " +
      page.name +
      ".",
  });

  const emailHref = mailtoHref({
    email: CONTACT_EMAIL,
    subject: "Luxury Chauffeur — " + page.name + " enquiry",
  });

  return (
    <main id="main-content" className="destination-page">
      <section className="destination-hero">
        {heroPhoto && (
          <img
            className="destination-hero-photo"
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            width={heroPhoto.width}
            height={heroPhoto.height}
            fetchPriority="high"
            decoding="async"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
        )}

        <div className="destination-container">
          <p className="destination-eyebrow">
            PRIVATE CHAUFFEUR · FRENCH RIVIERA &amp; ALPS
          </p>

          <h1>
            Private chauffeur
            <br />
            <em>{page.name}</em>
          </h1>

          <p>{page.intro}</p>

          <div className="destination-actions">
            <a
              className="destination-button"
              href={bookingHref}
            >
              Request a Quote ↗
            </a>

            <a
              className="destination-outline"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      {heroPhoto?.credit && (
        <p className="destination-photo-credit destination-container">
          {photoCredit(heroPhoto.credit)}
        </p>
      )}

      <nav
        className="destination-links destination-container"
        aria-label="Chauffeur destinations"
      >
        {Object.entries(destinations).map(([path, item]) => (
          <a
            href={path}
            key={path}
            aria-current={pathname === path ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
      </nav>

      <section className="destination-section destination-container">
        <p className="destination-eyebrow">
          PRIVATE TRANSPORT, PERSONALLY ARRANGED
        </p>

        <h2>Chauffeur services in {page.name}</h2>

        <div className="destination-grid-cards">
          {page.services.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        {(pathname === "/cannes" || pathname === "/nice") && (
          <a className="destination-text-link" href={NICE_AIRPORT_TO_CANNES_PATH}>
            {NICE_AIRPORT_TO_CANNES_TITLE} ↗
          </a>
        )}
        {airportTransfers
          .filter(({ pickupPath, destinationPath }) => pickupPath === pathname || destinationPath === pathname)
          .map(({ slug, title }) => (
            <div key={slug}>
              <a className="destination-text-link" href={`/${slug}`}>
                {title} ↗
              </a>
            </div>
          ))}
      </section>

      {photography ? (
        <DestinationGallery
          name={page.name}
          description={photography.description}
          photos={photography.photos.map(({ credit, ...photo }) => ({
            ...photo,
            caption: photo.alt,
            credit: credit && photoCredit(credit),
          }))}
        />
      ) : pathname === "/cannes" && (
        <DestinationGallery
          name={page.name}
          description="La Croisette, the Palais des Festivals and Le Suquet. Discover the city before your next transfer."
          photos={cannesPhotos.map((photo) => ({
            ...photo,
            srcSet: `${photo.src}?width=375 375w, ${photo.src}?width=768 768w, ${photo.src} ${photo.width}w`,
          }))}
          note="Cannes scenery · illustrative images"
        />
      )}

      <section className="destination-section destination-soft">
        <div className="destination-container">
          <p className="destination-eyebrow">
            PLAN YOUR JOURNEY
          </p>

          <h2>Popular journeys and travel details</h2>

          <ul className="destination-routes">
            {page.routes.map((name) => (
              <li key={name}>
                {page.name} ↔ {name}
              </li>
            ))}
          </ul>

          <p>{page.note}</p>

          <a
            className="destination-text-link"
            href="/#fleet"
          >
            Explore our full fleet ↗
          </a>
        </div>
      </section>

      {pathname === "/cannes" && (
        <section className="destination-section destination-container" lang="fr">
          <h2>Chauffeur privé haut de gamme à Cannes</h2>
          <p>
            Organisez un transfert depuis l’aéroport de Nice vers votre hôtel sur
            la Croisette ou demandez un chauffeur à l’heure pour plusieurs rendez-vous.
            Pour un événement au Palais des Festivals, indiquez votre heure d’arrivée
            et l’entrée du bâtiment afin de convenir d’un point de dépose accessible.
          </p>
          <p>
            Pour obtenir un devis, indiquez la date, les adresses, le nombre de
            passagers et vos bagages. Le chauffeur confirme le tarif avec vous.
          </p>
          <a
            className="destination-text-link"
            href={whatsappUrl({
              phone: WHATSAPP_NUMBER,
              text: "Bonjour, je souhaite un devis pour un chauffeur privé à Cannes.",
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Demander un devis sur WhatsApp ↗
          </a>
        </section>
      )}

      <section className="destination-section destination-cta">
        <div className="destination-container">
          <h2>Let us arrange your next journey.</h2>

          <p>
            Share your itinerary and request a personalised quotation.
          </p>

          <div className="destination-actions">
            <a
              className="destination-button"
              href={bookingHref}
            >
              Request a Quote ↗
            </a>

            <a
              className="destination-outline"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>

            <a
              className="destination-outline"
              href={emailHref}
            >
              Email us ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
