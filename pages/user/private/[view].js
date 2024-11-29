// pages/user/private.js
import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import PanelMenuComponent from "@/components/private/PanelMenuComponent";
import MyListingsComponent from "@/components/private/MyListingsComponent";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const { Sider, Content } = Layout;

const PrivatePage = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();
  const { view } = router.query;

  // Set selected item based on route
  useEffect(() => {
    if (view) {
      setSelectedItem(view);
    }
  }, [view]);

  // const renderContent = () => {
  //   switch (selectedItem) {
  //     case "published":
  //       return <MyListingsComponent status="published" />;
  //     case "underReview":
  //       return <MyListingsComponent status="underReview" />;
  //     case "paused":
  //       return <MyListingsComponent status="paused" />;
  //     case "expired":
  //       return <MyListingsComponent status="expired" />;
  //     case "generalInfo":
  //       return <div>{t("private.generalInfoContent")}</div>;
  //     case "security":
  //       return <div>{t("private.securityContent")}</div>;
  //     case "notifications":
  //       return <div>{t("private.notificationsContent")}</div>;
  //     default:
  //       return <div>{t("selectAnOption")}</div>;
  //   }
  // };

  const renderContent = () => {
    switch (selectedItem) {
      case "myListings":
        return <MyListingsComponent status="published" />;
      case "myProfile":
        return <div>{t("private.generalInfoContent")}</div>;
      default:
        return <div>{t("selectAnOption")}</div>;
    }
  };

  return (
    <Layout className="private-layout">
      <Sider width={240} className="private-sider">
        <PanelMenuComponent
          onSelect={(item) => {
            setSelectedItem(item);
            router.push(`/user/private/${item}`); // Update URL dynamically
          }}
        />
      </Sider>
      <Content className="private-content">{renderContent()}</Content>
    </Layout>
  );
};

export default PrivatePage;
