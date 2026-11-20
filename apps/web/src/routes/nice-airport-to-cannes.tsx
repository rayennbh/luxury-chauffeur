import {
  NICE_AIRPORT_TO_CANNES_PATH,
  NICE_AIRPORT_TO_CANNES_TITLE,
} from "@/constants/transfer-routes";
import { WHATSAPP_NUMBER } from "@/constants/site";
import { whatsappUrl } from "@/lib/contact-links";
import { seo, type SeoArgs } from "@/lib/seo";

const bookingHref = `/?${new URLSearchParams({
  pickup: "Nice Côte d’Azur Airport (NCE)",
  destination: "Cannes",
})}#booking`;

const whatsappHref = whatsappUrl({
  phone: WHATSAPP_NUMBER,
  text: "Hello Luxury Chauffeur, I’d like a quote for a private transfer from Nice Airport to Cannes.",
});

export function meta(args: SeoArgs) {
  return seo(args, {
    title: `${NICE_AIRPORT_TO_CANNES_TITLE} | Luxury Chauffeur`,
    description:
      "Request a private transfer from Nice Côte d’Azur Airport (NCE) to your hotel, villa or event in Cannes. Share flight, passenger and luggage details for a quote.",
    path: NICE_AIRPORT_TO_CANNES_PATH,
  });
}

export default function NiceAirportToCannes() {
  return (
    <main id="main-content" className="destination-page">
      <section className="destination-hero">
        <div className="destination-container">
          <h1>{NICE_AIRPORT_TO_CANNES_TITLE}</h1>
          <p>
            Request a chauffeur from Nice Côte d’Azur Airport (NCE) to your hotel
            on La Croisette, a villa in Cannes or an event at the Palais des Festivals.
          </p>
          <div className="destination-actions">
            <a className="destination-button" href={bookingHref}>Request a Transfer Quote ↗</a>
            <a className="destination-outline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Ask on WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      <section className="destination-section destination-container">
        <h2>Plan your airport pickup</h2>
        <div className="destination-grid-cards">
          <article>
            <h3>Meeting your chauffeur at NCE</h3>
            <p>
              Include your flight number and arrival time. The meeting point and any
              luggage assistance can be agreed before travel.
            </p>
          </article>
          <article>
            <h3>Choosing a vehicle</h3>
            <p>
              Tell us how many people are travelling and how many bags you have.
              Mention large luggage, strollers or child seats so we can confirm a
              suitable vehicle.
            </p>
          </article>
          <article>
            <h3>Arriving in Cannes</h3>
            <p>
              Share the exact drop-off address. For festival and conference dates,
              ask about access restrictions near La Croisette and the Palais des Festivals.
            </p>
          </article>
        </div>
        <a className="destination-text-link" href="/#fleet">Explore the vehicle options ↗</a>
      </section>

      <section className="destination-section destination-soft">
        <div className="destination-container">
          <h2>Before you book</h2>
          <details className="destination-faq">
            <summary>How much does a private transfer from Nice Airport to Cannes cost?</summary>
            <p>
              After you send your request, your chauffeur will discuss your trip
              with you and confirm the fare.
            </p>
          </details>
          <details className="destination-faq">
            <summary>Where will I meet my chauffeur at Nice Airport?</summary>
            <p>
              Share your flight number and arrival time when you request a transfer.
              Your chauffeur will agree on a meeting point with you based on your
              arrival details.
            </p>
          </details>
          <details className="destination-faq">
            <summary>What if my flight is delayed?</summary>
            <p>
              If your flight is delayed, contact your chauffeur to discuss a new
              pickup time and confirm any waiting arrangements.
            </p>
          </details>
          <details className="destination-faq">
            <summary>How much luggage can I bring?</summary>
            <p>
              Tell us how many passengers and bags you’re travelling with, including
              any oversized items. Your chauffeur will confirm which vehicle suits
              your group and luggage.
            </p>
          </details>
          <details className="destination-faq">
            <summary>Can I request a return transfer to Nice Airport?</summary>
            <p>
              Yes. Include the pickup address in Cannes and your departure flight time
              in your enquiry so the return journey can be quoted separately.
            </p>
          </details>
        </div>
      </section>

      <nav className="destination-links destination-container" aria-label="Related chauffeur services">
        <a href="/nice">Nice Airport transfers</a>
        <a href="/cannes">Private chauffeur in Cannes</a>
      </nav>

      <section className="destination-section destination-cta">
        <div className="destination-container">
          <h2>Get a quote for your transfer to Cannes</h2>
          <p>Availability and your final fare are confirmed after you send your request.</p>
          <div className="destination-actions">
            <a className="destination-button" href={bookingHref}>Request a Transfer Quote ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
