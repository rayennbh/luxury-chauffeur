import { useLocation } from "react-router";
import { CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/site";
import { whatsappUrl } from "@/lib/contact-links";
import { seo, type SeoArgs } from "@/lib/seo";
import { organizationSchema } from "@/lib/business-schema";
import { businessDescription, businessPages, destinationPages } from "@/data/public-pages";

const pageCopy = {
  "/about": { heading: businessPages[0].title, description: businessDescription },
  "/contact": { heading: businessPages[1].title, description: "Contact Luxury Chauffeur about a transfer, hourly service or an existing quote request." },
  "/terms": { heading: businessPages[2].title, description: "How to request a chauffeur, what is confirmed separately and how your quote request is handled." },
};

function getPage(pathname: string) {
  const path = pathname.replace(/\/$/, "") as keyof typeof pageCopy;
  return pageCopy[path];
}

export function meta(args: SeoArgs) {
  const page = getPage(args.location.pathname);
  return seo(args, {
    title: page.heading,
    description: page.description,
    jsonLd: organizationSchema(args),
  });
}

function About() {
  return (
    <>
      <h2>Where we drive</h2>
      <p>Plan a private airport transfer, a point-to-point journey or an hourly chauffeur service.</p>
      <ul>{destinationPages.map(page => <li key={page.path}><a className="destination-text-link" href={page.path}>{page.title}</a></li>)}</ul>
      <p>Share your travel date, itinerary, passenger count and luggage when you request a quote.</p>
    </>
  );
}

function Contact() {
  return (
    <>
      <h2>Transfers and existing enquiries</h2>
      <p>For a quote, include your pickup and drop-off locations, date, time, passenger count and luggage. If you already have a quote, reply to the original email with any changes.</p>
      <a className="destination-text-link" href={whatsappUrl({ phone: WHATSAPP_NUMBER, text: WHATSAPP_DEFAULT_MESSAGE })}>Contact us on WhatsApp</a>
    </>
  );
}

function Terms() {
  return (
    <>
      <h2>Quote and booking confirmation</h2>
      <p>Submitting a request does not confirm a booking. The team confirms availability, the final fare, vehicle and pickup details separately. Ask the team to confirm any waiting, changes or cancellation arrangements before accepting your quote.</p>
      <p>Vehicle illustrations are indicative. Tell us about large bags, child seats or any accessibility needs so we can discuss a suitable vehicle.</p>
      <h2 id="privacy">Privacy notice for quote enquiries</h2>
      <p>Your submitted itinerary, contact details and special requests are sent through FormSubmit to deliver the enquiry by email. The website does not store those requests in its application database. The team uses your details to respond and arrange your journey.</p>
      <p>The booking form can suggest addresses using Photon, an OpenStreetMap-based geocoding service. Search terms entered in those address fields are sent to that service to return suggestions. The browser also saves your language and cookie preferences.</p>
      <p>Contact us with privacy questions or requests about your information.</p>
    </>
  );
}

export default function BusinessInfo() {
  const { pathname } = useLocation();
  const page = getPage(pathname);
  return (
    <main id="main-content" className="destination-page">
      <section className="destination-hero">
        <div className="destination-container">
          <h1>{page.heading}</h1>
          <p>{page.description}</p>
        </div>
      </section>
      <section className="destination-section destination-container">
        {page === pageCopy["/about"] && <About />}
        {page === pageCopy["/contact"] && <Contact />}
        {page === pageCopy["/terms"] && <Terms />}
        <p><a className="destination-text-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <p><a className="destination-text-link" href="/#booking">Request a quote</a></p>
      </section>
    </main>
  );
}
