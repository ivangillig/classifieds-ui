import React from "react";
import { Button, Card } from "antd";
import { getImagesPath } from "@/utils/listingsUtils";
import { useRouter } from "next/router";
import {
  PhoneOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const ListingCard = ({ data: listing }) => {
  const router = useRouter();
  const { province } = router.query;

  const whatsappLink = `https://wa.me/${listing.phone.replace(/\D/g, "")}`;
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
          <div style={{ position: "relative" }}>
            <img
              src={mainImage}
              alt={listing.title}
              style={{ objectFit: "cover", height: "200px", width: "100%" }}
              onError={(e) =>
                (e.target.src = "/static/images/image_not_available.webp")
              }
            />
            <span className="listing-card-price">${listing.price}</span>
          </div>
        }
        style={{
          width: 210,
          margin: "0.3rem",
          border: "1px solid var(--surface-border)",
          position: "relative",
        }}
      >
        <Meta
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{listing.title}</span>
            </div>
          }
          description={
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.4rem",
                }}
              >
                <EnvironmentOutlined style={{ marginRight: "0.3rem" }} />
                <span>{listing.location.name}</span>
              </div>
              <Button
                type={"primary"}
                icon={
                  listing.useWhatsApp ? <WhatsAppOutlined /> : <PhoneOutlined />
                }
                className={
                  listing.useWhatsApp
                    ? "button-contact whatsapp"
                    : "button-contact phone"
                }
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
