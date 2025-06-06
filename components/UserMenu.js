import React from "react";
import { Dropdown, Menu, Button, Space } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../actions/authActions";

const UserMenu = ({ user }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const menuItems = [
    {
      key: "my-listings",
      icon: <UnorderedListOutlined />,
      label: t("user.my_ads"),
      onClick: () => router.push("/user/private/my-listings"),
    },
    {
      key: "my-profile",
      icon: <UserOutlined />,
      label: t("user.my_profile"),
      onClick: () => router.push("/user/private/my-profile/generalInfo"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("user.logout"),
      onClick: () => dispatch(logoutRequest()),
    },
  ];

  return (
    <div className="user-menu">
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <Button type="text" className="user-menu-button">
          <Space>
            <span className="user-menu-text">{t("account")}</span>
            <UserOutlined className="user-menu-icon" />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
