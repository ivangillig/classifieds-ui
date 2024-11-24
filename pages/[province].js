import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { useRouter } from "next/router";
import { fetchListingsByProvinceRequest } from "../actions/listingActions";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ListingCard from "../components/Listing/ListingCard";
import ListingList from "../components/Listing/ListingList";
import { useTranslation } from "next-i18next";
import { Dropdown } from "primereact/dropdown";
import listingReducer from "@/reducers/listingReducer";

const ProvincePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { province, page = 1, limit = 4 } = router.query;

  const { t } = useTranslation();

  const [layout, setLayout] = useState("grid");
  const { listings, pagination, isLoading } = useSelector((state) => state.listing);
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

  useEffect(() => {
    if (province) {
      dispatch(
        fetchListingsByProvinceRequest({
          province,
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
        })
      );
    }
  }, [dispatch, province, page, limit]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const onPageChange = (event) => {
    const newPage = event.page + 1;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage, limit },
    });
  };

  const itemTemplate = (listing, layout) => {
    if (!listing) return null;

    return layout === "list" ? (
      <ListingList data={listing} />
    ) : (
      <ListingCard data={listing} />
    );
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{ textAlign: "left" }}>
          {/* <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          /> */}
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

  return (
    <div className="dataview-listings">
      <div className="card">
        <DataView
          emptyMessage={
            <div className="empty-message-container">
              <strong>{t("escorts_not_found")}</strong>
            </div>
          }
          value={Array.isArray(listings) ? listings : []}
          layout={layout}
          header={renderHeader()}
          itemTemplate={itemTemplate}
          paginator
          rows={parseInt(limit, 10)}
          first={(parseInt(page, 10) - 1) * parseInt(limit, 10)}
          totalRecords={pagination?.total || 0}
          onPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProvincePage;
