import { ArrowUpRight, MessageCircle } from "lucide-react";
import { LuxrideBrand } from "@/components/site-header";
import { openCookiePreferences } from "@/lib/cookie-consent";
import { whatsappUrl } from "@/lib/contact-links";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <LuxrideBrand />
        <p>Your Riviera journey starts with a conversation.</p>
        <div className="footer-contact">
          <a href="/#contact" className="text-link">
            Let us plan your journey <ArrowUpRight size={18} />
          </a>
          <a
            className="text-link footer-whatsapp"
            href={whatsappUrl({
              phone: WHATSAPP_NUMBER,
              text: WHATSAPP_DEFAULT_MESSAGE,
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Luxury Chauffeur · FRENCH RIVIERA</span>
        <nav aria-label="Footer links">
          <a href="/#services">Services</a>
          <a href="/#reservations">Appointment</a>
<a href="/#vehicules">Fleet</a>
          <a href="/#contact">Contact</a>
          <button onClick={openCookiePreferences}>Cookie preferences</button>
        </nav>
      </div>
    </footer>
  );
}