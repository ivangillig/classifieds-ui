import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import PanelMenuComponent from "@/components/private/PanelMenuComponent";
import MyListingsComponent from "@/components/private/MyListingsComponent";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const { Sider, Content } = Layout;

const PrivatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;

  const [selectedCategory, setSelectedCategory] = useState("my-listings");
  const [selectedSubCategory, setSelectedSubCategory] = useState("published");

  // Initialize state from URL
  useEffect(() => {
    if (slug) {
      setSelectedCategory(slug[0] || "my-listings");
      setSelectedSubCategory(slug[1] || "published");
    }
  }, [slug]);

  const handleMenuSelect = (category, subCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);

    // Update URL without reloading the page
    router.replace(`/user/private/${category}/${subCategory}`, undefined, {
      shallow: true,
    });
  };

  const renderContent = () => {
    if (selectedCategory === "my-listings") {
      return <MyListingsComponent status={selectedSubCategory} />;
    }

    if (selectedCategory === "my-profile") {
      switch (selectedSubCategory) {
        case "generalInfo":
          return <div>{t("private.generalInfoContent")}</div>;
        case "security":
          return <div>{t("private.securityContent")}</div>;
        case "notifications":
          return <div>{t("private.notificationsContent")}</div>;
        default:
          return <div>{t("selectAnOption")}</div>;
      }
    }

    return <div>{t("selectAnOption")}</div>;
  };

  return (
    <Layout className="private-layout">
      <Sider width={240} className="private-sider">
        <PanelMenuComponent
          onSelect={handleMenuSelect}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
        />
      </Sider>
      <Content className="private-content">{renderContent()}</Content>
    </Layout>
  );
};

export default PrivatePage;
