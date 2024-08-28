import React from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { useTranslation } from 'react-i18next';

const ProvinceCard = ({ province, onClick, isLoading, index }) => {
  const { t } = useTranslation();

  const handleImageError = (e) => {
    e.target.src = "/static/images/image_not_available.svg";
  };

  return (
    <Card className="province-card" onClick={onClick}>
      {isLoading ? (
        <>
          <Skeleton width="100%" height="150px" />
          <div className="province-card-content">
            <Skeleton width="70%" height="1.5em" />
            <Skeleton width="50%" height="1.2em" className="mt-2" />
          </div>
        </>
      ) : (
        <>
          <img
            src={`/static/images/provinces/${index}.webp`}
            alt={province || "Unknown Province"}
            className="province-image"
            onError={handleImageError}
          />
          <div className="province-card-content">
            <span className="province-card-text">{t("Ads_on")}</span>
            <span className="province-card-name">{province}</span>
          </div>
        </>
      )}
    </Card>
  );
};

export default ProvinceCard;
