import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Dialog } from "primereact/dialog";
import { getImagesPath } from "@/utils/listingsUtils";

const SwiperWithGallery = ({ images, isOpen, onClose }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Dialog
      visible={isOpen}
      onHide={onClose}
      style={{ width: "90vw", maxWidth: "900px" }}
    >
      <Swiper
        modules={[Thumbs, Navigation, Pagination]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        className="swiper-gallery"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={getImagesPath() + img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Thumbs, Navigation, Pagination]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="swiper-gallery"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={getImagesPath() + img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Dialog>
  );
};

export default SwiperWithGallery;
