import { airportTransferQuestions, AirportTransferFaq } from "@/components/airport-transfer-faq";
import { faqSchema, organizationSchema, serviceSchema } from "@/lib/business-schema";
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

const description = "Request a private transfer from Nice Côte d’Azur Airport (NCE) to your hotel, villa or event in Cannes. Share flight, passenger and luggage details for a quote.";
const faq = {
  airportName: "Nice Airport",
  destination: "Cannes",
  additionalQuestions: [{
    question: "Can I request a return transfer to Nice Airport?",
    answer: "Yes. Include the pickup address in Cannes and your departure flight time in your enquiry so the return journey can be quoted separately.",
  }],
};

export function meta(args: SeoArgs) {
  return seo(args, {
    title: `${NICE_AIRPORT_TO_CANNES_TITLE} | Luxury Chauffeur`,
    description,
    path: NICE_AIRPORT_TO_CANNES_PATH,
    jsonLd: [
      organizationSchema(args),
      serviceSchema(args, NICE_AIRPORT_TO_CANNES_TITLE, description, [faq.airportName, faq.destination], NICE_AIRPORT_TO_CANNES_PATH),
      faqSchema(airportTransferQuestions(faq)),
    ],
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
              Send your flight number and arrival time, and confirm where to meet your chauffeur in
              the arrivals hall before you travel. Let us know if you need help with luggage.
            </p>
            <p>If you know whether your flight arrives at Terminal 1 or Terminal 2, include it in your request.</p>
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
              For a hotel, share its name and preferred entrance. For the Palais des Festivals,
              include the event name and the entrance or drop-off point specified by your organiser.
              For the Vieux-Port, share the quay or berth number if known. During festivals, confirm
              vehicle access before you travel.
            </p>
          </article>
        </div>
        <a className="destination-text-link" href="/#fleet">Explore the vehicle options ↗</a>
      </section>

      <AirportTransferFaq {...faq} />

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
