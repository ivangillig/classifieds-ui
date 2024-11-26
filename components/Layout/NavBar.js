// components/NavBar.js
import React, { useEffect, useState } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

const { Search } = Input;

const NavBar = () => {
  const { t } = useTranslation();
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [isMounted, setIsMounted] = useState(false);

  
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handlePostAdClick = () => {
    router.push("/createListing");
  };

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className={`navbar-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="main-container">
        <div className="navbar">
          {/* Logo and search bar */}
          <div className="navbar-start">
            <a href="/" className="navbar-logo">
              {appName}
            </a>
            <Space>
              <Search
                className="navbar-search"
                placeholder={t("search_placeholder")}
                enterButton={
                  <Button icon={<SearchOutlined />} type={"primary"} />
                }
              />
            </Space>
          </div>

          {/* Buttons and user menu */}
          <div className="navbar-end">
            {!user && (
              <Button type="default" onClick={handleLoginClick}>
                {t("login")}
              </Button>
            )}
            <Button
              type="primary"
              onClick={handlePostAdClick}
              className="button-publish"
            >
              {t("post_ad")}
            </Button>
            {user && <UserMenu user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
