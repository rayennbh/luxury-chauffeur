import { Expand, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { cannesPhotos } from "@/data/cannes";
import { useCarousel } from "@/hooks/use-carousel";

export function CannesGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const carousel = useCarousel({ count: cannesPhotos.length });
  const current = cannesPhotos[carousel.index];

  return (
    <section id="galerie" className="gallery section-rail">
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / CANNES IN PICTURES</p>
          <h2>
            A few moments <em>in Cannes.</em>
          </h2>
        </div>
        <p>
          La Croisette, the Palais des Festivals and Le Suquet. Discover the
          city before your next transfer.
        </p>
      </div>
      <div className="gallery-grid">
        {cannesPhotos.map((photo, index) => (
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
                srcSet={`${photo.src}?width=375 375w, ${photo.src}?width=768 768w, ${photo.src} ${photo.width}w`}
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
      <p className="gallery-note">Cannes scenery · illustrative images</p>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div {...carousel.regionProps} aria-label="Cannes gallery">
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
                {carousel.index + 1} / {cannesPhotos.length}
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