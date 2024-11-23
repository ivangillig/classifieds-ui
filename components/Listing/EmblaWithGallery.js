import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog } from "primereact/dialog";
import { getImagesPath } from "@/utils/listingsUtils";
import Fade from 'embla-carousel-fade'

const EmblaWithGallery = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  useEffect(() => {
    if (isOpen && emblaApi) {
      emblaApi.scrollTo(initialIndex);
    }
  }, [isOpen, initialIndex, emblaApi]);

  return (
    <Dialog
      className="gallery-modal"
      closable={false}
      closeOnEscape={true}
      dismissableMask={true}
      visible={isOpen}
      onHide={onClose}
      style={{
        width: "90vw",
        maxWidth: "900px",
        overflow: "hidden",
      }}
      contentStyle={{ padding: 0 }}
    >
      {/* Main Slider */}
      <div className="embla embla--main" ref={emblaRef}>
        <div className="embla__container">
          {images.map((img, idx) => (
            <div className="embla__slide" key={idx}>
              <div className="embla__image-wrapper">
                <img
                  src={getImagesPath() + img.src}
                  alt={img.alt}
                  className="embla__image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div className="embla embla--thumbs" ref={thumbsRef}>
        <div className="embla__container embla__container--thumbs">
          {images.map((img, idx) => (
            <div
              className="embla__slide embla__slide--thumbs"
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
            >
              <div className="embla__image-wrapper embla__image-wrapper--thumbs">
                <img
                  src={getImagesPath() + img.src}
                  alt={img.alt}
                  className="embla__image embla__image--thumbs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default EmblaWithGallery;
