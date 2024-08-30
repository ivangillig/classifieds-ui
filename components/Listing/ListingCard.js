import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const ListingCard = ({ data }) => {
    const { t } = useTranslation()

    return (
        <div className="col-12 md:col-3">
            <div className="product-grid-item card">
                <div className="product-grid-item-top">
                    <div>
                        <i className="pi pi-tag product-category-icon"></i>
                        <span className="product-category">{data.location.name}</span>
                    </div>
                    <span className={`product-badge status-instock}`}>
                        {data.inventoryStatus}
                    </span>
                </div>
                <div className="product-grid-item-content">
                    <img
                        src={`images/product/${data.image}`}
                        onError={(e) =>
                            (e.target.src =
                                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                        }
                        alt={data.name}
                    />
                    <div className="product-name">{data.title}</div>
                    <div className="product-description">{data.description}</div>
                </div>
                <div className="product-grid-item-bottom">
                    <span className="product-price">${data.price}</span>
                    <Button
                        icon="pi pi-shopping-cart"
                        label="Add to Cart"
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
