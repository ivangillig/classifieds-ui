import React from "react";
import { Button, Card } from "antd";
import { getImagesPath, getWhatsAppLink } from "@/utils/listingsUtils";
import { useRouter } from "next/router";
import { PhoneOutlined, WhatsAppOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ListingCard = ({ data: listing }) => {
  const router = useRouter();
  const { province } = router.query;

  const whatsappLink = getWhatsAppLink(listing.phone);
  const callLink = `tel:${listing.phone}`;

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (listing.useWhatsApp) {
      window.open(whatsappLink, "_blank");
    } else {
      window.open(callLink, "_self");
    }
  };

  const handleCardClick = () => {
    router.push(`/${province}/${listing._id}`);
  };

  const mainImage =
    getImagesPath() + listing.photos[0] ||
    "/static/images/image_not_available.webp";

  return (
    <div className="listing-card-container">
      <Card
        hoverable
        onClick={handleCardClick}
        cover={
          <div className="listing-card-image-wrapper">
            <img
              src={mainImage}
              alt={listing.title}
              onError={(e) =>
                (e.target.src = "/static/images/image_not_available.webp")
              }
            />
            <span className="listing-card-price">${listing.price}</span>
          </div>
        }
      >
        <Meta
          title={<span className="listing-card-title">{listing.title}</span>}
          description={
            <>
              <div className="listing-card-location">
                <EnvironmentOutlined className="listing-category-icon" />
                <span>{listing.location.name}</span>
              </div>
              <Button
                type={"primary"}
                icon={
                  listing.useWhatsApp ? <WhatsAppOutlined /> : <PhoneOutlined />
                }
                className={`button-contact ${
                  listing.useWhatsApp ? "whatsapp" : "phone"
                }`}
                onClick={handleButtonClick}
                block
              >
                {listing.phone}
              </Button>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default ListingCard;
