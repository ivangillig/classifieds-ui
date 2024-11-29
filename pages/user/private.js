// pages/user/private.js
import React, { useState } from "react";
import { Layout } from "antd";
import PanelMenuComponent from "@/components/private/PanelMenuComponent";
import MyListingsComponent from "@/components/private/MyListingsComponent";
import { useTranslation } from "next-i18next";

const { Sider, Content } = Layout;

const PrivatePage = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);

  const renderContent = () => {
    switch (selectedItem) {
      case "published":
        return <MyListingsComponent status='published' />;
      case "underReview":
        return <MyListingsComponent status='underReview' />;
      case "paused":
        return <MyListingsComponent status='paused' />;
      case "expired":
        return <MyListingsComponent status='expired' />;
      case "generalInfo":
        return <div>{t("private.generalInfoContent")}</div>;
      case "security":
        return <div>{t("private.securityContent")}</div>;
      case "notifications":
        return <div>{t("private.notificationsContent")}</div>;
      default:
        return <div>{t("selectAnOption")}</div>;
    }
  };

  return (
    <Layout className="private-layout">
      <Sider width={240} className="private-sider">
        <PanelMenuComponent onSelect={setSelectedItem} />
      </Sider>
      <Content className="private-content">{renderContent()}</Content>
    </Layout>
  );
};

export default PrivatePage;
