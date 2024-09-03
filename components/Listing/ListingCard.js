import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { getImagesPath } from '@/utils/listingsUtils';

const ListingCard = ({ data }) => {
    const { t } = useTranslation();

    const whatsappLink = `https://wa.me/${data.phone.replace(/\D/g, '')}`;
    const callLink = `tel:${data.phone}`;

    const handleButtonClick = () => {
        if (data.useWhatsApp) {
            window.open(whatsappLink, '_blank');
        } else {
            window.open(callLink, '_self');
        }
    };

    const mainImage = data.photos && data.photos.length > 0 
        ? getImagesPath() + data.photos[0] 
        : "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";

    return (
        <div className="col-12 md:col-3">
            <div className="product-grid-item card">
                <div className="product-grid-item-top">
                    <div>
                        <i className="pi pi-map-marker product-category-icon"></i>
                        <span className="product-category">{data.location.name}</span>
                    </div>
                    <span className={`product-badge status-instock}`}>
                        {data.inventoryStatus}
                    </span>
                </div>
                <div className="product-grid-item-content">
                    <img
                        src={mainImage}
                        onError={(e) =>
                            (e.target.src =
                                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                        }
                        alt={data.title}
                    />
                    <div className="product-name">{data.title}</div>
                    <div className="product-description">{data.description}</div>
                </div>
                <div className="product-grid-item-bottom">
                    <span className="product-price">${data.price}</span>
                    <Button
                        icon={data.useWhatsApp ? "pi pi-whatsapp" : "pi pi-phone"}
                        label={data.phone}
                        className={data.useWhatsApp ? "p-button-success" : "p-button-primary"}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
