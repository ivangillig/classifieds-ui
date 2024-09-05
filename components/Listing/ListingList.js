import React from 'react';
import { Button } from 'primereact/button';

const ListingList = ({ data }) => {
    const whatsappLink = `https://wa.me/${data.phone.replace(/\D/g, '')}`;
    const callLink = `tel:${data.phone}`;

    const handleButtonClick = () => {
        if (data.useWhatsApp) {
            window.open(whatsappLink, '_blank');
        } else {
            window.open(callLink, '_self');
        }
    };

    return (
        <div className="col-12">
            <div className="listing-list-item">
                <img
                    src={`images/listing/${data.image}`}
                    onError={(e) =>
                        (e.target.src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                    }
                    alt={data.name}
                />
                <div className="listing-list-detail">
                    <div className="listing-name">{data.title}</div>
                    <div className="listing-description">{data.description}</div>
                    <i className="pi pi-map-marker listing-category-icon"></i>
                    <span className="listing-category">{data.location.name}</span>
                </div>
                <div className="listing-list-action">
                    <span className="listing-price">${data.price}</span>
                    <Button
                        icon={data.useWhatsApp ? "pi pi-whatsapp" : "pi pi-phone"}
                        label={data.phone}
                        className={data.useWhatsApp ? "p-button-success" : "p-button-primary"}
                        onClick={handleButtonClick}
                    />
                    <span className={`listing-badge status-instock}`}>
                        {data.inventoryStatus}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ListingList;
