import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchListingDetailsRequest } from "@/actions/listingActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { getImagesPath } from "@/utils/listingsUtils";

const ListingDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { listingDetails, isLoading, error } = useSelector(
    (state) => state.listing
  );

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

  return (
    <div className="listing-details-page">
      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image">
          <img
            src={getImagesPath() + images[0]?.src || "/placeholder.jpg"}
            alt={images[0]?.alt || "Main"}
          />
        </div>
        <div className="side-images">
          {images.slice(1, 3).map((img, idx) => (
            <div key={idx} className="side-image">
              <img src={getImagesPath() + img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <Card className="listing-card-details">
          <h2>{listingDetails.title}</h2>
          <p>
            <strong>Age:</strong> {listingDetails.age || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {listingDetails.location.name}
          </p>
          <p>
            <strong>Price:</strong> ${listingDetails.price}
          </p>
        </Card>

        {listingDetails.description && (
          <Card title="Description" style={{ marginTop: "16px" }}>
            <p>{listingDetails.description}</p>
          </Card>
        )}
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        {listingDetails.phone && (
          <Button
            label="Call"
            icon="pi pi-phone"
            className="p-button-success"
            onClick={() => window.open(`tel:${listingDetails.phone}`, "_self")}
          />
        )}
        {listingDetails.useWhatsApp && (
          <Button
            label="WhatsApp"
            icon="pi pi-whatsapp"
            className="p-button-success"
            onClick={() =>
              window.open(
                `https://wa.me/${listingDetails.phone.replace(/\D/g, "")}`,
                "_blank"
              )
            }
          />
        )}
        <Button
          label="Report Listing"
          icon="pi pi-exclamation-triangle"
          className="p-button-danger"
          onClick={() => alert("Report submitted")}
        />
      </div>
    </div>
  );
};

export default ListingDetailsPage;
