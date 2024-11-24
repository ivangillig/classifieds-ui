import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchListingsByProvinceRequest } from "../actions/listingActions";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ListingCard from "../components/Listing/ListingCard";
import ListingList from "../components/Listing/ListingList";
import { useTranslation } from "next-i18next";
import { List, Pagination, Radio } from "antd";

const ProvincePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { province, page = 1, limit = 20 } = router.query;

  const { t } = useTranslation();

  const [layout, setLayout] = useState("grid");
  const { listings, pagination, isLoading } = useSelector(
    (state) => state.listing
  );

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

  const onPageChange = (newPage, newPageSize) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage, limit: newPageSize },
    });
  };

  const renderHeader = () => (
    <div className="grid grid-nogutter">
      <div className="col-6" style={{ textAlign: "left" }}>
        <Radio.Group
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="grid">{t("Grid")}</Radio.Button>
          <Radio.Button value="list">{t("List")}</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );

  const renderItem = (item) =>
    layout === "list" ? (
      <ListingList data={item} />
    ) : (
      <ListingCard data={item} />
    );

  return (
    <div className="dataview-listings">
      <div className="card">
        {renderHeader()}
        <List
          grid={
            layout === "grid"
              ? { gutter: 10, xs: 1, sm: 2, md: 3, lg: 5 }
              : undefined
          }
          dataSource={listings || []}
          renderItem={(item) => <List.Item>{renderItem(item)}</List.Item>}
          locale={{
            emptyText: (
              <div className="empty-message-container">
                <strong>{t("escorts_not_found")}</strong>
              </div>
            ),
          }}
        />
        <Pagination
          style={{ marginTop: 16, textAlign: "center" }}
          current={parseInt(page, 10)}
          pageSize={parseInt(limit, 10)}
          total={pagination?.total || 0}
          onChange={onPageChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default ProvincePage;
