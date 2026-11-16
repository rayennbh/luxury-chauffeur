import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useRef } from "react";
import { photos, imageSet } from "@/data/riviera";
import { useCarousel } from "@/hooks/use-carousel";

export function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const carousel = useCarousel({ count: photos.length });
  const current = photos[carousel.index];
  return (
    <section id="galerie" className="gallery section-rail">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / A MEDITERRANEAN ESCAPE</p>
          <h2>
            A glimpse of <em>the Riviera.</em>
          </h2>
        </div>
        <p>
          Sunlight, sea and coastal roads.
          <br />A first look at your next destination.
        </p>
      </div>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <figure key={photo.src}>
            <button
              onClick={() => {
                carousel.goTo(index);
                dialog.current?.showModal();
              }}
              className="gallery-photo"
              aria-label={`Enlarge: ${photo.title}`}
            >
              <img
                src={photo.src}
                srcSet={imageSet(photo.src, photo.width)}
                sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 90vw"
                width={photo.width}
                height={photo.height}
                loading="lazy"
                alt={photo.caption}
              />
              <span className="expand-icon">
                <Expand size={18} />
              </span>
            </button>
            <figcaption>
              <span>0{index + 1}</span>
              <div>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery-note">
        French Riviera scenery · illustrative images
      </p>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div {...carousel.regionProps} aria-label="French Riviera gallery">
          <button
            className="gallery-close icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close gallery"
          >
            <X />
          </button>
          <img
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.caption}
          />
          <div className="lightbox-controls">
            <button
              className="icon-button"
              onClick={carousel.prev}
              aria-label="Previous photo"
            >
              <ArrowLeft />
            </button>
            <p>
              {current.title}{" "}
              <span>
                {carousel.index + 1} / {photos.length}
              </span>
            </p>
            <button
              className="icon-button"
              onClick={carousel.next}
              aria-label="Next photo"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}