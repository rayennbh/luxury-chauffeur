import { destinationPlacePhotos } from "@/data/destination-place-photos";
import { useLocation } from "react-router";
import { seo, type SeoArgs } from "@/lib/seo";
import { organizationSchema, serviceSchema } from "@/lib/business-schema";
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
  heroLead?: string;
  title: string;
  description: string;
  intro: string;
  services: [string, string][];
  routes: string[];
  note: string;
  quoteIntro?: string;
};

const destinations: Record<string, Destination> = {
  "/cannes": {
    name: "Cannes",
    title: "Private Chauffeur in Cannes | Luxury Chauffeur",
    description:
      "Request a private chauffeur in Cannes for Nice Airport transfers, hotel arrivals, hourly hire and event transport. Receive a personalised quotation.",
    intro:
      "Arrange a private driver in Cannes for a hotel pickup on La Croisette, an event at the Palais des Festivals or an hourly booking between meetings. For arrivals at Nice Airport, share your flight and final address in Cannes.",

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
    title: "Private Chauffeur in Monaco & Monte-Carlo | Luxury Chauffeur",
    description:
      "Request a private chauffeur in Monaco or Monte-Carlo for a one-way transfer, hourly hire or an event. Share your itinerary for a personalised quote.",
    intro:
      "Arrange a private chauffeur in Monaco and Monte-Carlo for a hotel or marina pickup, a direct transfer or an event. Share your stops and preferred timings for hourly or full-day chauffeur hire.",

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
      "Request a private chauffeur in Nice for luxury Nice Airport transfers, hotel pickups and private journeys across the French Riviera.",
    intro:
      "Arriving at Nice Côte d’Azur Airport? Request a luxury airport transfer to your hotel in Nice or onward to Cannes, Monaco or Saint-Tropez. Include your flight number, passenger count and luggage details.",

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
    heroLead: "Private chauffeur in",
    title: "Private Chauffeur in Courchevel | Luxury Chauffeur",
    description:
      "Request a private chauffeur in Courchevel for hotel and chalet pickups, local journeys, hourly hire or airport transfers. Share your plans for a quote.",
    intro:
      "Arrange a private driver in Courchevel for a chalet pickup in Le Praz, dinner in Courchevel 1850 or an airport transfer to your hotel. For several stops around the resort, ask about hourly chauffeur hire.",

    services: [
      [
        "Hotel and chalet pickups",
        "For pickups in Courchevel 1850, Moriond, Courchevel Village or Le Praz, include the village, the full address and any chalet access instructions so your chauffeur can confirm where to meet you.",
      ],
      [
        "Hourly chauffeur hire in Courchevel",
        "For a restaurant reservation, a return to your chalet or several stops around the resort, share your itinerary and the times you need to arrive. Your chauffeur will confirm availability and discuss any waiting time with you.",
      ],
      [
        "Airport transfers to and from Courchevel",
        "Request a private transfer from Geneva, Lyon, Chambéry or Grenoble Airport. Include your flight details, your chalet or hotel address and any return journey so your chauffeur can review the timing with you.",
      ],
    ],

    routes: [
      "Geneva Airport",
      "Lyon Airport",
      "Chambéry Airport",
      "Grenoble Airport",
    ],

    note:
      "Allow extra time during snowy weather and on busy changeover days. List skis, snowboards and suitcases separately, and mention any child seat requirements so your chauffeur can confirm vehicle capacity and suitable equipment.",
    quoteIntro:
      "Share your pickup address, travel date, passenger count and luggage details. Your chauffeur will discuss your itinerary and confirm the fare with you before you book.",
  },
};

const destinationPlaces: Record<string, { hotels: string[]; events: string[]; sights: string[] }> = {
  "/cannes": {
    hotels: ["Carlton Cannes","Hôtel Martinez"],
    events: ["Festival de Cannes","Cannes Lions"],
    sights: ["La Croisette","Palais des Festivals et des Congrès","Le Suquet"],
  },
  "/monaco": {
    hotels: ["Hôtel de Paris Monte-Carlo","Hôtel Hermitage Monte-Carlo"],
    events: ["Grand Prix de Monaco","Monaco Yacht Show"],
    sights: ["Place du Casino","Port Hercule","Musée océanographique de Monaco"],
  },
  "/nice": {
    hotels: ["Le Negresco","Palais de la Méditerranée"],
    events: ["Carnaval de Nice","Nice Jazz Fest"],
    sights: ["Promenade des Anglais","Vieux-Nice","Colline du Château"],
  },
  "/saint-tropez": {
    hotels: ["Hôtel Byblos Saint-Tropez","Hôtel de Paris Saint-Tropez"],
    events: ["Les Voiles de Saint-Tropez","Les Voiles d’Automne"],
    sights: ["Vieux Port de Saint-Tropez","Citadelle de Saint-Tropez","Pampelonne"],
  },
  "/courchevel": {
    hotels: ["Les Airelles Courchevel","Cheval Blanc Courchevel"],
    events: ["Grand Prix de saut à ski de Courchevel"],
    sights: ["Courchevel 1850","Lac du Praz","Courchevel La Tania"],
  },
};

const placeGroups = [
  ["hotels", "Hotels and chalets"],
  ["events", "Local events"],
  ["sights", "Places to visit"],
] as const;

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
    jsonLd: [
      organizationSchema(args),
      serviceSchema(args, `Private chauffeur in ${page.name}`, page.description, [page.name]),
    ],
  });
}

export default function DestinationPage() {
  const { pathname } = useLocation();

  const page =
    destinations[pathname] ?? destinations["/cannes"];

  const places = destinationPlaces[pathname];
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
            {page.heroLead ?? "Private chauffeur"}
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

      {places && (
        <section className="destination-section destination-container" aria-labelledby="destination-places">
          <h2 id="destination-places">Plan your journey</h2>
          <div className="destination-grid-cards">
            {placeGroups.map(([group, title]) => (
              <div key={group}>
                <h3>{title}</h3>
                <ul className="destination-place-list">
                  {places[group].map((name) => {
                    const photo = destinationPlacePhotos[name];
                    return (
                      <li key={name}>
                        <figure>
                          <img src={photo.src} alt={photo.caption ?? name} width={520} height={320} loading="lazy" decoding="async" />
                          <figcaption>
                            <strong>{name}</strong>
                            {photo.caption && <span>{photo.caption}</span>}
                            <small>
                              <a href={photo.source}>Photo · {photo.author}</a>
                              {" · "}
                              <a href={photo.licenseUrl ?? photo.source}>{photo.license}</a>
                              {" · Resized and cropped for display"}
                            </small>
                          </figcaption>
                        </figure>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
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

          {pathname === "/courchevel" && (
            <div>
              <h3>Can I book a return ride after dinner in Courchevel?</h3>
              <p>Yes. Include the restaurant, your preferred pickup time and the hotel or chalet you are returning to. If you are unsure when dinner will finish, ask about waiting time when you request your quote.</p>
            </div>
          )}

          <a
            className="destination-text-link"
            href="/#fleet"
          >
            Explore our full fleet ↗
          </a>
        </div>
      </section>

      <section className="destination-section destination-cta">
        <div className="destination-container">
          <h2>Let us arrange your next journey.</h2>

          <p>
            {page.quoteIntro ?? "Share your itinerary and request a personalised quotation."}
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
