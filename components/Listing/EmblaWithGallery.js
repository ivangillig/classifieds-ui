import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog } from "primereact/dialog";
import { getImagesPath } from "@/utils/listingsUtils";

const EmblaWithGallery = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: initialIndex });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(initialIndex, true);
    }
  }, [initialIndex, emblaApi]);

  return (
    <Dialog
      closable={false}
      closeOnEscape={true}
      dismissableMask={true}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "90vw", maxWidth: "900px" }}
    >
      {/* Main Slider */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {images.map((img, idx) => (
            <div className="embla__slide" key={idx}>
              <img
                src={getImagesPath() + img.src}
                alt={img.alt}
                className="embla__image"
              />
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
              <img
                src={getImagesPath() + img.src}
                alt={img.alt}
                className="embla__image embla__image--thumbs"
              />
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default EmblaWithGallery;
