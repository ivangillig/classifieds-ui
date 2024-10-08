import React from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { getImagesPath } from "@/utils/listingsUtils";

const ListingCard = ({ data: listing }) => {
  const { t } = useTranslation();

  const whatsappLink = `https://wa.me/${listing.phone.replace(/\D/g, "")}`;
  const callLink = `tel:${listing.phone}`;

  const handleButtonClick = () => {
    if (listing.useWhatsApp) {
      window.open(whatsappLink, "_blank");
    } else {
      window.open(callLink, "_self");
    }
  };

  const mainImage =
    listing.photos && listing.photos.length > 0
      ? getImagesPath() + listing.photos[0]
      : "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";

  return (
    <div className="listing-card-container">
      <div className="listing-card">
        <div className="listing-card-content">
          <img
            src={mainImage}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={listing.title}
          />
          <span className="listing-card-price">${listing.price}</span>

          <div className="listing-card-info">
            <div className="listing-card-name">{listing.title}</div>
            <div className="listing-card-location">
              <i className="pi pi-map-marker listing-category-icon"></i>
              <span className="listing-card-location-name">
                {listing.location.name}
              </span>
            </div>
            <div className="listing-card-item-bottom">
              <Button
                icon={listing.useWhatsApp ? "pi pi-whatsapp" : "pi pi-phone"}
                label={listing.phone}
                className={
                  listing.useWhatsApp ? "button-whatsapp" : "button-phone"
                }
                onClick={handleButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
