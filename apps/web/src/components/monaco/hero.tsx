import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { monacoHero } from "@/data/monaco";

export function MonacoHero() {
  return (
    <section className="hero" id="monaco">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line" /> MONACO · FRENCH RIVIERA{" "}
          <span className="tiny-line" />
        </p>

        <h1>
          Private chauffeur
          <br />
          <em>Monaco &amp; Monte-Carlo.</em>
        </h1>

        <p className="hero-description">
          Private transfers from Nice Airport to Monaco, luxury hotel arrivals
          and hourly chauffeur hire.
          <br />
          Arrange your business appointments, private stays and event
          transportation with LUXRIDE.
        </p>

        <div className="hero-actions">
          <a href="#decouvrir" className="button button-blue">
            Explore Monaco <ArrowUpRight size={18} />
          </a>

          <a href="#reservations" className="text-link">
            Request a transfer <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <div className="hero-landscape">
        <img
          src={monacoHero}
          srcSet={`${monacoHero}?width=375 375w, ${monacoHero}?width=768 768w, ${monacoHero}?width=1024 1024w, ${monacoHero}?width=1440 1440w, ${monacoHero} 1344w`}
          sizes="(min-width: 1440px) 1360px, 96vw"
          alt="Monaco harbour and Monte-Carlo bay at sunset"
          width={1344}
          height={756}
          fetchPriority="high"
        />

        <div className="landscape-caption">
          <span>
            <MapPin size={15} /> MONACO, FRENCH RIVIERA
          </span>
          <span>The principality and its harbour.</span>
        </div>

        <a
          href="#decouvrir"
          className="image-scroll"
          aria-label="Discover Monaco"
        >
          <ArrowDown size={20} />
        </a>
      </div>

      <div className="hero-footnote">
        <span>An iconic destination on the Riviera.</span>
        <span>PALACE · CASINO · GRAND PRIX</span>
      </div>
    </section>
  );
}