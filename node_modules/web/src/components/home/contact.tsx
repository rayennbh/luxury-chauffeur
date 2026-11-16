import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { mailtoHref, whatsappUrl } from "@/lib/contact-links";
import {
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/constants/site";

export function Contact() {
  return (
    <section id="contact" className="contact section-rail">
      <div>
        <p className="eyebrow">05 / GET IN TOUCH</p>

        <h2>
          Your next journey,
          <br />
          <em>one message away.</em>
        </h2>

        <p className="contact-intro">
          Contact LUXRIDE on WhatsApp or by email to request a quotation,
          arrange a transfer or discuss your travel plans.
        </p>
      </div>

      <div>
        <div className="contact-channels">
          <a
            className="contact-whatsapp text-link"
            href={whatsappUrl({
              phone: WHATSAPP_NUMBER,
              text: WHATSAPP_DEFAULT_MESSAGE,
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={21} />
            Book via WhatsApp
            <ArrowUpRight size={17} />
          </a>

          <a
            className="text-link"
            href={mailtoHref({
              email: CONTACT_EMAIL,
              subject: "LUXRIDE — Booking enquiry",
            })}
          >
            <Mail size={21} />
            Book via email
            <ArrowUpRight size={17} />
          </a>
        </div>

        <p className="contact-note">
          Include your pickup location, destination, travel date,
          passenger count and preferred vehicle.
          <br />
          Our team will confirm availability, pricing and arrangements.
        </p>
      </div>
    </section>
  );
}