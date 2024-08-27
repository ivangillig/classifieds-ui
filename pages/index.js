import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchListingsRequest } from "../actions";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [layout, setLayout] = useState("grid");
  const { listings, isLoading } = useSelector((state) => state.listing);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };
  const itemTemplate = (listing, layout) => {
    if (!listing) return;

    return layout === "list"
      ? renderListItem(listing)
      : renderGridItem(listing);
  };

  const renderListItem = (data) => {
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
            ></Button>
            <span className={`product-badge status-instock}`}>
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-3">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.location.name}</span>
            </div>
            <span className={`product-badge status.instock}`}>
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
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          />
        </div>
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchListingsRequest());
  }, [dispatch]);

  return (
    <div className="dataview-listings">
      <div className="card">
        <DataView
          value={listings}
          layout={layout}
          header={renderHeader()}
          itemTemplate={itemTemplate}
          paginator
          rows={9}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
  };
}

export default HomePage;
