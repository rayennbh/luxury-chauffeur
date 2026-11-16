import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { mailtoHref, whatsappUrl } from "@/lib/contact-links";
import {
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/constants/site";

export function Reservations() {
  return (
    <section id="reservations" className="reservations">
      <div className="reservation-inner">
        <div className="reservation-copy">
          <p className="eyebrow">04 / APPOINTMENT</p>

          <h2>
            Let us discuss
            <br />
            <em>your next journey.</em>
          </h2>

          <p>
            Request an appointment with our team to discuss your plans,
            transport requirements or a personalised itinerary.
          </p>

          <ol className="booking-steps">
            <li>
              <span>01</span>
              <div>
                <strong>Choose your preferred time.</strong>
                <p>Share your contact details and appointment preferences.</p>
              </div>
            </li>

            <li>
              <span>02</span>
              <div>
                <strong>Tell us what you need.</strong>
                <p>Let us know what you would like to discuss.</p>
              </div>
            </li>

            <li>
              <span>03</span>
              <div>
                <strong>We get back to you.</strong>
                <p>Our team will contact you to agree the appointment.</p>
              </div>
            </li>
          </ol>

          <p className="reservation-note">
            To reserve a vehicle or request a transfer quotation, contact us
            directly on WhatsApp or by email.
          </p>

          <div
            className="hero-actions"
            style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
          >
            <a
              className="button button-blue"
              href={whatsappUrl({
                phone: WHATSAPP_NUMBER,
                text: WHATSAPP_DEFAULT_MESSAGE,
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Book via WhatsApp
            </a>

            <a
              className="text-link"
              href={mailtoHref({
                email: CONTACT_EMAIL,
                subject: "LUXRIDE — Transfer enquiry",
                body:
                  "Hello LUXRIDE,\n\n" +
                  "I would like to request a transfer quotation.\n\n" +
                  "Pickup location:\n" +
                  "Destination:\n" +
                  "Travel date and time:\n" +
                  "Passengers:\n" +
                  "Luggage:\n" +
                  "Preferred vehicle:\n" +
                  "Phone number:\n\n" +
                  "Thank you.",
              })}
            >
              <Mail size={18} />
              Book via email
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="reservation-form">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}