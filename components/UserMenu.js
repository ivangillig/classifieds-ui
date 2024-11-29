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

  const menuItems = (
    <Menu>
      <Menu.Item
        key="myListings"
        icon={<UnorderedListOutlined />}
        onClick={() => router.push("/user/private/myListings")}
      >
        {t("user.my_ads")}
      </Menu.Item>
      <Menu.Item
        key="myProfile"
        icon={<UserOutlined />}
        onClick={() => router.push("/user/private/MyProfile")}
      >
        {t("user.my_profile")}
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => dispatch(logoutRequest())}
      >
        {t("user.logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-menu">
      <Dropdown
        overlay={menuItems}
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
