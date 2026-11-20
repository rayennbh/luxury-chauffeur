import { Expand, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { useCarousel } from "@/hooks/use-carousel";

type GalleryPhoto = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  credit?: ReactNode;
};

type GalleryProps = {
  name: string;
  description: string;
  photos: GalleryPhoto[];
  note?: string;
};

export function DestinationGallery({ name, description, photos, note }: GalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const carousel = useCarousel({ count: photos.length });
  const current = photos[carousel.index];

  return (
    <section id="galerie" className="gallery section-rail">
      <div className="section-heading">
        <div>
          <h2>
            A few moments <em>in {name}.</em>
          </h2>
        </div>
        <p>{description}</p>
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
                srcSet={photo.srcSet}
                sizes={photo.srcSet ? "(min-width: 900px) 33vw, (min-width: 600px) 50vw, 90vw" : undefined}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                alt={photo.caption}
              />
              <span className="expand-icon">
                <Expand size={18} />
              </span>
            </button>
            <figcaption>
              <div>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
                {photo.credit && <div className="destination-photo-credit">{photo.credit}</div>}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {note && <p className="gallery-note">{note}</p>}
      <dialog
        ref={dialog}
        className="gallery-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div {...carousel.regionProps} aria-label={`${name} gallery`}>
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
          {photos.length > 1 && (
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
          )}
        </div>
      </dialog>
    </section>
  );
}