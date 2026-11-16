import { useState } from "react";
import { ArrowUpRight, Users, Briefcase, Car } from "lucide-react";
import { vehicles } from "@/data/vehicles";

function VehiclePhoto({ src, name }: { src: string; name: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className="fleet-photo-placeholder">
        <Car size={48} strokeWidth={1} aria-hidden="true" />
        <span>Photo coming soon</span>
      </div>
    );
  }

  return (
    <img
      className="fleet-photo"
      src={src}
      alt={name}
      width={640}
      height={400}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );
}

export function Vehicles() {
  return (
    <section
      id="vehicules"
      className="vehicles section-rail"
      aria-labelledby="vehicles-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / OUR FLEET</p>

          <h2 id="vehicles-title">
            Your journey,
            <br />
            <em>your signature.</em>
          </h2>
        </div>

        <p>
          The comfort of a saloon, the space of a van or the versatility of an
          SUV. Explore the vehicles for your next journey.
        </p>
      </div>

      <div className="fleet-grid">
        {vehicles.map((vehicle, index) => (
          <article className="fleet-card" key={vehicle.name}>
            <div className="fleet-visual">
              <VehiclePhoto src={vehicle.image} name={vehicle.name} />

              <span className="fleet-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="fleet-content">
              <p className="fleet-eyebrow">CHAUFFEUR-DRIVEN TRAVEL</p>

              <h3>{vehicle.name}</h3>

              <div className="fleet-specs" aria-label="Indicative capacities">
                <span>
                  <Users size={16} aria-hidden="true" />
                  {vehicle.passengers} passengers
                </span>

                <span>
                  <Briefcase size={16} aria-hidden="true" />
                  {vehicle.luggage} bags
                </span>
              </div>

              <a
                className="fleet-cta"
                href="#reservations"
                aria-label={`Request a transfer in ${vehicle.name}`}
              >
                <span>Request a transfer</span>

                <span className="fleet-cta-icon">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="fleet-footer">
        <p>
          Illustrative photos. Availability, configuration and luggage capacity
          will be confirmed when you enquire.
        </p>

        <a className="text-link" href="#contact">
          Need help choosing?
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}