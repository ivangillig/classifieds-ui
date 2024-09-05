import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { getImagesPath } from '@/utils/listingsUtils';

const ListingCard = ({ data: listing }) => {
    const { t } = useTranslation();

    const whatsappLink = `https://wa.me/${listing.phone.replace(/\D/g, '')}`;
    const callLink = `tel:${listing.phone}`;

    const handleButtonClick = () => {
        if (listing.useWhatsApp) {
            window.open(whatsappLink, '_blank');
        } else {
            window.open(callLink, '_self');
        }
    };

    const mainImage = listing.photos && listing.photos.length > 0 
        ? getImagesPath() + listing.photos[0] 
        : "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";

    return (
        <div className="col-12 md:col-3">
            <div className="listing-card card">
                <div className="listing-grid-item-top">
                    <div>
                        <i className="pi pi-map-marker listing-category-icon"></i>
                        <span className="listing-category">{listing.location.name}</span>
                    </div>
                    <span className={`listing-badge status-instock}`}>
                        {listing.inventoryStatus}
                    </span>
                </div>
                <div className="listing-grid-item-content">
                    <img
                        src={mainImage}
                        onError={(e) =>
                            (e.target.src =
                                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                        }
                        alt={listing.title}
                    />
                    <div className="listing-name">{listing.title}</div>
                    <div className="listing-description">{listing.description}</div>
                    <span className="listing-price">${listing.price}</span>
                </div>
                <div className="listing-grid-item-bottom">
                    <Button
                        icon={listing.useWhatsApp ? "pi pi-whatsapp" : "pi pi-phone"}
                        label={listing.phone}
                        className={listing.useWhatsApp ? "button-whatsapp" : "button-phone"}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
