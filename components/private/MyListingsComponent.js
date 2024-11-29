import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListingsRequest } from "../../actions";
import { Table, Spin, Button, Space } from "antd";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import { getImagesPath } from "@/utils/listingsUtils";
import {
  PauseOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";

const MyListingsComponent = ({ status }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userListings, isLoading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchUserListingsRequest(status));
  }, [dispatch, status]);

  const handlePause = (id) => {
    console.log(`Pausing listing with ID: ${id}`);
    // Call the API or dispatch an action to pause the listing
  };

  const handleReactivate = (id) => {
    console.log(`Reactivating listing with ID: ${id}`);
    // Call the API or dispatch an action to reactivate the listing
  };

  const handleRenew = (id) => {
    console.log(`Renewing listing with ID: ${id}`);
    // Call the API or dispatch an action to renew the listing
  };

  const handleDelete = (id) => {
    console.log(`Deleting listing with ID: ${id}`);
    // Call the API or open a confirmation modal to delete the listing
  };

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
    {
      title: t("Actions"),
      key: "actions",
      render: (text, record) => {
        const { id, status } = record;

        return (
          <Space>
            {(status === "published" || status === "paused") && (
              <Button
                icon={<EditOutlined />}
                onClick={() => console.log(`Editing listing with ID: ${id}`)}
                type="default"
              >
                {t("listingActions.Edit")}
              </Button>
            )}
            {status === "published" && (
              <Button
                icon={<PauseOutlined />}
                onClick={() => handlePause(id)}
                type="default"
              >
                {t("listingActions.Pause")}
              </Button>
            )}
            {status === "paused" && (
              <Button
                icon={<PlayCircleOutlined />}
                onClick={() => handleReactivate(id)}
                type="default"
              >
                {t("listingActions.Reactivate")}
              </Button>
            )}
            {status === "expired" && (
              <Button
                icon={<ReloadOutlined />}
                onClick={() => handleRenew(id)}
                type="default"
              >
                {t("listingActions.Renew")}
              </Button>
            )}
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(id)}
              danger
            >
              {t("listingActions.Delete")}
            </Button>
          </Space>
        );
      },
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
