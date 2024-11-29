// components/private/ActiveAdsComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListingsRequest } from "../../actions";
import { Table, Spin } from "antd";
import { useTranslation } from "next-i18next";

const ActiveListingsComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userListings, isLoading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchUserListingsRequest("published"));
  }, [dispatch]);

  const columns = [
    { title: t("Title"), dataIndex: "title", key: "title" },
    {
      title: t("Price"),
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    { title: t("Created At"), dataIndex: "createdAt", key: "createdAt" },
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Table
      dataSource={userListings}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ActiveListingsComponent;
