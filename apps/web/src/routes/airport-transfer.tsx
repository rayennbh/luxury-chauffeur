import { useLocation } from "react-router";
import { WHATSAPP_NUMBER } from "@/constants/site";
import { airportTransfers } from "@/data/airport-transfers";
import { whatsappUrl } from "@/lib/contact-links";
import { seo, type SeoArgs } from "@/lib/seo";

function getTransfer(pathname: string) {
  const slug = pathname.toLowerCase().replace(/^\/|\/$/g, "");
  const transfer = airportTransfers.find((entry) => entry.slug === slug);
  if (!transfer) throw new Response("Not found", { status: 404 });
  return transfer;
}

export function meta(args: SeoArgs) {
  const transfer = getTransfer(args.location.pathname);
  return seo(args, {
    title: `${transfer.title} | Luxury Chauffeur`,
    description: transfer.description,
    path: `/${transfer.slug}`,
  });
}

export default function AirportTransferPage() {
  const transfer = getTransfer(useLocation().pathname);
  const bookingHref = `/?${new URLSearchParams({
    pickup: transfer.pickup,
    destination: transfer.destination,
  })}#booking`;
  const whatsappHref = whatsappUrl({
    phone: WHATSAPP_NUMBER,
    text: `Hello Luxury Chauffeur, I’d like a quote from ${transfer.pickup} to ${transfer.destination}.`,
  });

  return (
    <main id="main-content" className="destination-page">
      <section className="destination-hero">
        <div className="destination-container">
          <h1>{transfer.title}</h1>
          <p>{transfer.intro}</p>
          <div className="destination-actions">
            <a className="destination-button" href={bookingHref}>Request a Transfer Quote ↗</a>
            <a className="destination-outline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Ask on WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      <section className="destination-section destination-container">
        <h2>Plan your airport transfer</h2>
        <div className="destination-grid-cards">
          <article>
            <h3>Airport pickup</h3>
            <p>Send your flight number and arrival time. Confirm your meeting point and the arrangements for flight delays before travelling.</p>
          </article>
          <article>
            <h3>{transfer.arrival.heading}</h3>
            <p>{transfer.arrival.details}</p>
          </article>
          <article>
            <h3>Passengers and luggage</h3>
            <p>{transfer.luggage}</p>
          </article>
        </div>
        <a className="destination-text-link" href="/#fleet">Explore the vehicle options ↗</a>
      </section>

      <section className="destination-section destination-soft">
        <div className="destination-container">
          <h2>Before you book</h2>
          {transfer.questions.map(({ question, answer }) => (
            <details className="destination-faq" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="destination-links destination-container" aria-label="Related chauffeur services">
        {transfer.pickupPath && <a href={transfer.pickupPath}>Nice Airport transfers</a>}
        <a href={transfer.destinationPath}>Private chauffeur in {transfer.destination}</a>
      </nav>

      <section className="destination-section destination-cta">
        <div className="destination-container">
          <h2>Get a quote for your transfer to {transfer.destination}</h2>
          <p>Share your travel date, flight details, passenger count and drop-off address to check availability and request a fare.</p>
          <div className="destination-actions">
            <a className="destination-button" href={bookingHref}>Request a Transfer Quote ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
