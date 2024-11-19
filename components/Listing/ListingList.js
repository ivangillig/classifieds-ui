import React from "react";
import { Button } from "primereact/button";
import { getImagesPath } from "@/utils/listingsUtils";

const ListingList = ({ data: listing }) => {
  const whatsappLink = `https://wa.me/${listing.phone.replace(/\D/g, "")}`;
  const callLink = `tel:${listing.phone}`;

  const handleButtonClick = () => {
    if (listing.useWhatsApp) {
      window.open(whatsappLink, "_blank");
    } else {
      window.open(callLink, "_self");
    }
  };

  const mainImage = getImagesPath() + listing.photos[0] || null;

  return (
    <div className="col-12">
      <div className="listing-list-item">
        <img
          src={mainImage}
          onError={(e) =>
            (e.target.src = "/static/images/image_not_available.webp")
          }
          alt={listing.name}
        />
        <div className="listing-list-detail">
          <div className="listing-name">{listing.title}</div>
          <div className="listing-description">{listing.description}</div>
          <i className="pi pi-map-marker listing-category-icon"></i>
          <span className="listing-category">{listing.location.name}</span>
        </div>
        <div className="listing-list-action">
          <span className="listing-price">${listing.price}</span>
          <Button
            icon={listing.useWhatsApp ? "pi pi-whatsapp" : "pi pi-phone"}
            label={listing.phone}
            className={
              listing.useWhatsApp ? "p-button-success" : "p-button-primary"
            }
            onClick={handleButtonClick}
          />
          <span className={`listing-badge status-instock}`}>
            {listing.inventoryStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingList;
