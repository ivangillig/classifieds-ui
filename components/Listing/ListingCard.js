import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { getImagesPath } from "@/utils/listingsUtils";
import { useRouter } from "next/router";
import {
  PhoneOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const ListingCard = ({ data: listing }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { province } = router.query;

  const whatsappLink = `https://wa.me/${listing.phone.replace(/\D/g, "")}`;
  const callLink = `tel:${listing.phone}`;

  const handleButtonClick = () => {
    if (listing.useWhatsApp) {
      window.open(whatsappLink, "_blank");
    } else {
      window.open(callLink, "_self");
    }
  };

  const handleCardClick = () => {
    router.push(`/${province}/${listing._id}`);
  };

  const mainImage = getImagesPath() + listing.photos[0] || null;

  return (
    <div
      className="listing-card-container"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="listing-card">
        <div className="listing-card-content">
          <img
            src={mainImage}
            onError={(e) =>
              (e.target.src = "/static/images/image_not_available.webp")
            }
            alt={listing.title}
          />
          <span className="listing-card-price">${listing.price}</span>

          <div className="listing-card-info">
            <div className="listing-card-name">{listing.title}</div>
            <div className="listing-card-location">
              <EnvironmentOutlined className="listing-category-icon" />
              <span className="listing-card-location-name">
                {listing.location.name}
              </span>
            </div>
            <div className="listing-card-item-bottom">
              <Button
                type={listing.useWhatsApp ? "primary" : "default"}
                icon={
                  listing.useWhatsApp ? <WhatsAppOutlined /> : <PhoneOutlined />
                }
                className={
                  listing.useWhatsApp ? "button-whatsapp" : "button-phone"
                }
                onClick={handleButtonClick}
              >
                {listing.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
