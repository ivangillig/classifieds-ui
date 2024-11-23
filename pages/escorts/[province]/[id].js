import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchListingDetailsRequest } from "@/actions/listingActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chip } from "primereact/chip";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import EmblaWithGallery from "@/components/Listing/EmblaWithGallery";
import { getImagesPath } from "@/utils/listingsUtils";
import { useTranslation } from "react-i18next";

const ListingDetailsPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { listingDetails, isLoading, error } = useSelector(
    (state) => state.listing
  );

  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchListingDetailsRequest(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error: {error}</h2>
        <Button label="Go Back" onClick={() => router.back()} />
      </div>
    );
  }

  if (!listingDetails) {
    return (
      <div className="not-found-container">
        <h2>Listing not found</h2>
        <Button label="Go Back" onClick={() => router.back()} />
      </div>
    );
  }

  const images = listingDetails.photos.map((photo) => ({
    src: photo,
    alt: listingDetails.title,
  }));

  const openGallery = (index) => {
    setInitialIndex(index);
    setGalleryOpen(true);
  };

  return (
    <div className="listing-details-page">
      {/* Image Gallery */}
      <div className="image-gallery">
        {images.length > 3 && (
          <Button
            icon="pi pi-th-large"
            label="Ver todas las fotos"
            className="view-all-button"
            onClick={() => openGallery(0)}
          />
        )}
        <div className="main-image">
          <img
            src={getImagesPath() + images[0]?.src || "/placeholder.jpg"}
            alt={images[0]?.alt || "Main"}
            style={{ width: "100%", borderRadius: "8px" }}
            onClick={() => openGallery(0)}
          />
        </div>
        <div className="side-images">
          {images.slice(1, 3).map((img, idx) => (
            <div key={idx} className="side-image" style={{ marginTop: "10px" }}>
              <img
                onClick={() => openGallery(idx+1)}
                src={getImagesPath() + img.src}
                alt={img.alt}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <Card className="listing-card-details">
          <h2>{listingDetails.title}</h2>
          <div className="info-chips">
            {listingDetails.age && (
              <Chip
                label={listingDetails.age}
                icon={
                  <i
                    className="pi pi-calendar mr-1"
                    style={{ color: "#6c757d" }}
                  ></i>
                }
                className="p-mr-2"
              />
            )}
            <Chip
              label={listingDetails.location.name}
              icon={
                <i
                  className="pi pi-map-marker mr-1"
                  style={{ color: "#dc3545" }}
                ></i>
              }
              className="p-mr-2"
            />
            <Chip
              label={`${listingDetails.price}`}
              icon={
                <i
                  className="pi pi-dollar mr-1"
                  style={{ color: "#28a745" }}
                ></i>
              }
              className="p-mr-2"
            />
          </div>
          {listingDetails.description && (
            <p className="listing-description">{listingDetails.description}</p>
          )}
        </Card>
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        {listingDetails.phone && (
          <Button
            label={t("Call")}
            icon="pi pi-phone"
            className="button-phone font-medium"
            onClick={() => window.open(`tel:${listingDetails.phone}`, "_self")}
          />
        )}
        {listingDetails.useWhatsApp && (
          <Button
            label="WhatsApp"
            icon="pi pi-whatsapp"
            className="button-whatsapp font-medium"
            onClick={() =>
              window.open(
                `https://wa.me/${listingDetails.phone.replace(/\D/g, "")}`,
                "_blank"
              )
            }
          />
        )}
        <Button
          label={t("Report Listing")}
          icon="pi pi-exclamation-triangle"
          className="p-button-danger font-medium"
          onClick={() => alert("Report submitted")}
        />
      </div>

      {/* Swiper Gallery */}
      <EmblaWithGallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={initialIndex}
      />
    </div>
  );
};

export default ListingDetailsPage;
