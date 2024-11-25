import React from "react";
import { Card, Skeleton } from "antd";
import { useTranslation } from "react-i18next";

const ProvinceCard = ({ province, onClick, isLoading, index }) => {
  const { t } = useTranslation();

  const handleImageError = (e) => {
    e.target.src = "/static/images/image_not_available.svg";
  };

  return (
    <Card
      className="province-card"
      onClick={onClick}
      hoverable
      cover={
        !isLoading && (
          <img
            src={`/static/images/provinces/${index}.webp`}
            alt={province || "Unknown Province"}
            className="province-image"
            onError={handleImageError}
          />
        )
      }
    >
      {isLoading ? (
        <>
          <Skeleton.Image style={{ width: "100%", height: "150px" }} />
          <div className="province-card-content">
            <Skeleton active title={false} paragraph={{ rows: 2 }} />
          </div>
        </>
      ) : (
        <div className="province-card-content">
          <span className="province-card-text">{t("Ads_on")}</span>
          <span className="province-card-name">{province}</span>
        </div>
      )}
    </Card>
  );
};

export default ProvinceCard;
