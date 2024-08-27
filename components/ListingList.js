import React from 'react';
import { Button } from 'primereact/button';

const ListingList = ({ data }) => {
    return (
        <div className="col-12">
            <div className="product-list-item">
                <img
                    src={`images/product/${data.image}`}
                    onError={(e) =>
                        (e.target.src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                    }
                    alt={data.name}
                />
                <div className="product-list-detail">
                    <div className="product-name">{data.title}</div>
                    <div className="product-description">{data.description}</div>
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="product-category">{data.location.name}</span>
                </div>
                <div className="product-list-action">
                    <span className="product-price">${data.price}</span>
                    <Button
                        icon="pi pi-shopping-cart"
                        label="Add to Cart"
                        disabled={data.inventoryStatus === "OUTOFSTOCK"}
                    />
                    <span className={`product-badge status-instock}`}>
                        {data.inventoryStatus}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ListingList;
