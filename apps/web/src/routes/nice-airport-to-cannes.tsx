import { AirportTransferFaq } from "@/components/airport-transfer-faq";
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
      "Plan your private transfer from Nice Airport (NCE) to Cannes. Check the estimated drive time, arrange your terminal pickup and request a personalised quote.",
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
          <p>
            Allow roughly 30 to 50 minutes for the drive, depending on traffic and
            your drop-off address. Allow extra time during major events in Cannes.
            Your chauffeur will confirm the fare with you after you request a quote.
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
              Include your flight number, scheduled arrival time and terminal if you
              know it. Agree on the meeting point with your chauffeur before you fly.
              If your flight or terminal changes, contact your chauffeur with the new details.
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
              Share your hotel or venue name and its street address. For festival and
              conference dates, include the time you need to arrive so you can discuss
              traffic and any access restrictions near La Croisette or the Palais des Festivals.
            </p>
          </article>
        </div>
        <a className="destination-text-link" href="/#fleet">Explore the vehicle options ↗</a>
      </section>

      <AirportTransferFaq
        airportName="Nice Airport"
        destination="Cannes"
        additionalQuestions={[{
          question: "Can I request a return transfer to Nice Airport?",
          answer: "Yes. Include the pickup address in Cannes and your departure flight time in your enquiry so the return journey can be quoted separately.",
        }]}
      />

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
