import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListingsRequest, toggleListingStatusRequest } from "../../actions";
import { Table, Spin, Button, Space, notification } from "antd";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import { getImagesPath } from "@/utils/listingsUtils";
import {
  PauseOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";

const MyListingsComponent = ({ status }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userListings, isLoading, listingUpdated, successMessage } = useSelector(
    (state) => state.listing
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (listingUpdated) {
      notification.success({
        message: t("Success"),
        description: t(successMessage),
      });
      dispatch(fetchUserListingsRequest(status));
    }
  }, [listingUpdated, dispatch]);

  const handleToggleStatus = (id) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const confirmToggleStatus = () => {
    dispatch(toggleListingStatusRequest(selectedId));
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchUserListingsRequest(status));
  }, [dispatch, status]);

  const handleRenew = (id) => console.log(`Renewing listing with ID: ${id}`);
  const handleDelete = (id) => console.log(`Deleting listing with ID: ${id}`);

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
        const { _id, status } = record;

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
                onClick={() => handleToggleStatus(_id)}
                type="default"
              >
                {t("listingActions.Pause")}
              </Button>
            )}
            {status === "paused" && (
              <Button
                icon={<PlayCircleOutlined />}
                onClick={() => handleToggleStatus(_id)}
                type="default"
              >
                {t("listingActions.Reactivate")}
              </Button>
            )}
            {status === "expired" && (
              <Button
                icon={<ReloadOutlined />}
                onClick={() => handleRenew(_id)}
                type="default"
              >
                {t("listingActions.Renew")}
              </Button>
            )}
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(_id)}
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
    <>
      <Table
        dataSource={userListings}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: isLoading ? null : t("No listings found with this status"),
        }}
      />
      <ConfirmActionModal
        visible={isModalVisible}
        onConfirm={confirmToggleStatus}
        onCancel={() => setIsModalVisible(false)}
        message={status === 'published' ? t("listing_pause_message") : t("listing_reactivate_message")}
      />
    </>
  );
};

export default MyListingsComponent;
