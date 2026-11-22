import { useId } from "react";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { useDisclosure } from "@/hooks/use-disclosure";
import { whatsappUrl } from "@/lib/contact-links";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/site";
import { LanguageMenu } from "@/components/language-menu";

/** Vector interpretation of the supplied LR monogram; no image file required. */
export function LuxrideBrand() {
  const gradientId = `luxury-gold-${useId().replace(/:/g, "")}`;

  return (
    <a
      href="/#accueil"
      className="brand luxury-chauffeur-brand"
      aria-label="Luxury Chauffeur — Home"
    >
      <svg
        className="luxury-chauffeur-monogram"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b58942" />
            <stop offset="0.35" stopColor="#f3d58b" />
            <stop offset="0.7" stopColor="#c99a4d" />
            <stop offset="1" stopColor="#efd292" />
          </linearGradient>
        </defs>

        <g fill={`url(#${gradientId})`}>
          <path d="M79 20C72 14 65 12 57 12C35 12 21 28 21 50C21 73 35 88 57 88C66 88 74 85 81 79V63H77C74 76 68 82 58 82C42 82 34 69 34 50C34 31 42 18 58 18C68 18 74 24 77 36H81V20Z" />
          <path d="M39 30H60V33L54 35V69H67C72 69 75 66 78 59H82L78 76H39V73L44 71V35L39 33Z" />
        </g>
      </svg>

      <span className="luxury-chauffeur-wordmark">
        <strong>LUXURY</strong>
        <span>CHAUFFEUR</span>
        <small>FRENCH RIVIERA</small>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const menu = useDisclosure();
  const navigation = [
    { label: "Home", href: "/#accueil" },
    { label: "Services", href: "/#services" },
    { label: "Fleet", href: "/#vehicules" },
    { label: "Monaco", href: "/monaco" },
    { label: "Cannes", href: "/cannes" },
    { label: "The Riviera", href: "/#galerie" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="site-header">
      <LuxrideBrand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a
          className="icon-button header-whatsapp"
          href={whatsappUrl({
            phone: WHATSAPP_NUMBER,
            text: WHATSAPP_DEFAULT_MESSAGE,
          })}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
        <a className="button button-blue header-book" href="/#reservations">
          Request a transfer <ArrowUpRight size={17} />
        </a>
        <LanguageMenu />
      </div>
      <button
        className="icon-button mobile-menu"
        {...menu.triggerProps}
        aria-label={menu.isOpen ? "Close menu" : "Open menu"}
      >
        {menu.isOpen ? <X /> : <Menu />}
      </button>
      {menu.isOpen && (
        <nav
          {...menu.panelProps}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ...navigation.slice(0, -1),
            { label: "Appointment", href: "/#reservations" },
            navigation[navigation.length - 1],
          ].map((item) => (
            <a key={item.href} href={item.href} onClick={menu.close}>
              {item.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
