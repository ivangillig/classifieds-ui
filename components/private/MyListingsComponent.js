// components/private/ActiveAdsComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListingsRequest } from "../../actions";
import { Table, Spin } from "antd";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import { getImagesPath } from "@/utils/listingsUtils";

const MyListingsComponent = ({ status }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userListings, isLoading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchUserListingsRequest(status));
  }, [dispatch, status]);

  const columns = [
    {
      title: t("Image"),
      dataIndex: "photos",
      key: "photos",
      render: (photos) => {
        const imageSrc =
          photos && photos[0]
            ? getImagesPath() + photos[0]
            : "/static/images/image_not_available.webp";
        return (
          <img
            src={imageSrc}
            alt="Listing"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        );
      },
    },
    { title: t("Title"), dataIndex: "title", key: "title" },
    {
      title: t("Price"),
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: t("Created At"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
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

export default MyListingsComponent;
