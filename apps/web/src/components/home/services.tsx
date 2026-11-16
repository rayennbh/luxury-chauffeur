import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/riviera";

export function Services() {
  return (
    <section id="services" className="services section-rail">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / OUR SERVICES</p>

          <h2>
            Private transfers.
            <br />
            <em>Personalised chauffeur services.</em>
          </h2>
        </div>

        <p>
          Arrange a private driver for your French Riviera journey. From Nice
          Airport transfers to chauffeur-driven travel in Cannes and Monaco,
          share your itinerary and request a personalised quotation.
        </p>
      </div>

      <div className="service-list">
        {services.map((service) => (
          <article className="service-row" key={service.number}>
            <span className="service-number">{service.number}</span>

            <h3>{service.title}</h3>

            <div>
              <p>{service.text}</p>

              <a className="text-link" href={service.href}>
                {service.link}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}