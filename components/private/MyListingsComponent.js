import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserListingsRequest,
  toggleListingStatusRequest,
  deleteListingRequest,
  renewListingRequest,
} from "../../actions";
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
import { useRouter } from "next/router";

const MyListingsComponent = ({ status }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    userListings,
    isLoading,
    listingUpdated,
    listingDeleted,
    successMessage,
  } = useSelector((state) => state.listing);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isIsRenewListingModalVisible, setIsRenewListingModalVisible] =
    useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (listingUpdated || listingDeleted) {
      notification.success({
        message: t("Success"),
        description: t(successMessage),
      });
      dispatch(fetchUserListingsRequest(status));
    }
  }, [listingUpdated, listingDeleted, dispatch]);

  const handleToggleStatus = (id) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsDeleteModalVisible(true);
  };

  const handleRenew = (id) => {
    setSelectedId(id);
    setIsRenewListingModalVisible(true);
  };

  const confirmToggleStatus = () => {
    dispatch(toggleListingStatusRequest(selectedId));
    setIsModalVisible(false);
  };

  const confirmDelete = () => {
    dispatch(deleteListingRequest(selectedId));
    setIsDeleteModalVisible(false);
  };

  const confirmRenewListing = () => {
    dispatch(renewListingRequest(selectedId));
    setIsRenewListingModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchUserListingsRequest(status));
  }, [dispatch, status]);

  const getColumns = () => {
    const baseColumns = [
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
                  onClick={() => router.push(`/createListing?listingId=${_id}`)}
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

    if (["published", "paused", "underReview"].includes(status)) {
      baseColumns.splice(4, 0, {
        title: t("Days Remaining"),
        dataIndex: "validUntil",
        key: "validUntil",
        render: (validUntil) => {
          const daysRemaining = dayjs(validUntil).diff(dayjs(), "day");
          return daysRemaining >= 0
            ? `${daysRemaining} ${t("days remaining")}`
            : t("listing.expired");
        },
      });
    }

    return baseColumns;
  };

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
        columns={getColumns()}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: isLoading ? null : t("No listings found with this status"),
        }}
      />
      <ConfirmActionModal
        visible={isModalVisible}
        onConfirm={confirmToggleStatus}
        onCancel={() => setIsModalVisible(false)}
        message={
          status === "published"
            ? t("listing_pause_message")
            : t("listing_reactivate_message")
        }
      />
      <ConfirmActionModal
        visible={isIsRenewListingModalVisible}
        onConfirm={confirmRenewListing}
        onCancel={() => setIsRenewListingModalVisible(false)}
        message={t("listing_renew_message")}
      />
      <ConfirmActionModal
        visible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        message={t("listing_delete_message")}
      />
    </>
  );
};

export default MyListingsComponent;
