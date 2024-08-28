import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchListingsRequest } from "../actions";
import ListingCard from "../components/ListingCard";
import ListingList from "../components/ListingList";
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
    if (!listing) return null;

    return layout === "list"
      ? <ListingList data={listing} />
      : <ListingCard data={listing} />;
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
