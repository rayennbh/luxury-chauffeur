import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { cannesHero } from "@/data/cannes";

export function CannesHero() {
  return (
    <section className="hero" aria-labelledby="cannes-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line" />
          CANNES · FRENCH RIVIERA
          <span className="tiny-line" />
        </p>

        <h1 id="cannes-title">
          Private chauffeur
          <br />
          <em>in Cannes.</em>
        </h1>

        <p className="hero-description">
          Nice Airport to Cannes private transfers, hotel pickups and hourly
          chauffeur hire.
          <br />
          Plan your stay on La Croisette, business appointments or Cannes Film
          Festival transportation with LUXRIDE.
        </p>

        <div className="hero-actions">
          <a href="#pratique" className="button button-blue">
            Request my transfer
            <ArrowUpRight size={18} />
          </a>

          <a href="#decouvrir" className="text-link">
            Discover Cannes
            <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <div className="hero-landscape">
        <img
          src={cannesHero}
          alt="Mediterranean scenery on the French Riviera"
          width={1472}
          height={640}
          fetchPriority="high"
        />

        <div className="landscape-caption">
          <span>
            <MapPin size={15} />
            YOUR CANNES ESCAPE
          </span>
          <span>Illustrative French Riviera scenery.</span>
        </div>

        <a
          href="#decouvrir"
          className="image-scroll"
          aria-label="Explore private transfers to Cannes"
        >
          <ArrowDown size={20} />
        </a>
      </div>

      <div className="hero-footnote">
        <span>Your French Riviera journey starts here.</span>
        <span>LEISURE · CONFERENCES · TRANSFERS</span>
      </div>
    </section>
  );
}