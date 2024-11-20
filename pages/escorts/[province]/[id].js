import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchListingDetailsRequest } from "@/actions/listingActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
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
    itemImageSrc: getImagesPath() + photo,
    thumbnailImageSrc: getImagesPath() + photo,
    alt: listingDetails.title,
  }));

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 5 },
    { breakpoint: "768px", numVisible: 3 },
    { breakpoint: "560px", numVisible: 1 },
  ];

  const itemTemplate = (item) => (
    <div className="galleria-item-container">
      <img src={item.itemImageSrc} alt={item.alt} />
    </div>
  );

  const thumbnailTemplate = (item) => (
    <div className="galleria-thumbnail-container">
      <img src={item.thumbnailImageSrc} alt={item.alt} />
    </div>
  );

  return (
    <div
      className="listing-details-page"
      style={{ display: "flex", gap: "16px" }}
    >
      {/* Left Column (80%) */}
      <div style={{ flex: "4" }}>
        {/* Gallery Card */}
        <Card className="listing-card-details">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            circular
            style={{ maxWidth: "640px" }}
            showItemNavigators
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        </Card>

        {/* Info Card */}
        <Card
          title="Information"
          style={{ marginTop: "16px" }}
          className="listing-card-details"
        >
          <p>
            <strong>Name:</strong> {listingDetails.title}
          </p>
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

        {/* Description Card */}
        {listingDetails.description && (
          <Card title="Description" style={{ marginTop: "16px" }}>
            <p>{listingDetails.description}</p>
          </Card>
        )}
      </div>

      {/* Right Column (20%) */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Contact Buttons */}
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

        {/* Report Button */}
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
