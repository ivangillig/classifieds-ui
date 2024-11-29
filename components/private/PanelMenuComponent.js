import React from "react";
import { Menu } from "antd";
import { useTranslation } from "next-i18next";
import {
  AppstoreOutlined,
  AuditOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LockOutlined,
  BellOutlined,
} from "@ant-design/icons";

const PanelMenuComponent = ({ onSelect }) => {
  const { t } = useTranslation();

  const items = [
    {
      key: "ads",
      label: t("user.my_ads"),
      icon: <AppstoreOutlined />,
      children: [
        { key: "activeListings", label: t("private.activeAds"), icon: <AppstoreOutlined /> },
        { key: "underReview", label: t("private.underReviewAds"), icon: <AuditOutlined /> },
        { key: "paused", label: t("private.pausedAds"), icon: <PauseCircleOutlined /> },
        { key: "expired", label: t("private.expiredAds"), icon: <ClockCircleOutlined /> },
      ],
    },
    {
      key: "profile",
      label: t("user.my_profile"),
      icon: <InfoCircleOutlined />,
      children: [
        { key: "generalInfo", label: t("private.generalInfo"), icon: <InfoCircleOutlined /> },
        { key: "security", label: t("private.security"), icon: <LockOutlined /> },
        { key: "notifications", label: t("private.notifications"), icon: <BellOutlined /> },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      items={items}
      style={{ width: "100%", maxWidth: "300px" }}
      onClick={({ key }) => onSelect(key)}
    />
  );
};

export default PanelMenuComponent;
