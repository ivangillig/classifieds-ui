import React from "react";
import { Menu } from "antd";
import { useTranslation } from "next-i18next";

const PanelMenuComponent = () => {
  const { t } = useTranslation();

  const items = [
    {
      key: "ads",
      label: t("user.my_ads"),
      children: [
        { key: "active", label: t("private.activeAds") },
        { key: "underReview", label: t("private.underReviewAds") },
        { key: "paused", label: t("private.pausedAds") },
        { key: "expired", label: t("private.expiredAds") },
      ],
    },
    {
      key: "profile",
      label: t("user.my_profile"),
      children: [
        { key: "generalInfo", label: t("private.generalInfo") },
        { key: "security", label: t("private.security") },
        { key: "notifications", label: t("private.notifications") },
      ],
    },
  ];

  return <Menu mode="inline" items={items} style={{ width: "300px" }} />;
};

export default PanelMenuComponent;
