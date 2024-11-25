import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, UnorderedListOutlined, LogoutOutlined } from "@ant-design/icons";
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
        key="profile"
        icon={<UserOutlined />}
        onClick={() => router.push("/user/private")}
      >
        {t("user.my_profile")}
      </Menu.Item>
      <Menu.Item
        key="ads"
        icon={<UnorderedListOutlined />}
        onClick={() => router.push("/my-ads")}
      >
        {t("user.my_ads")}
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
      <Dropdown overlay={menuItems} trigger={["click"]} placement="bottomRight">
        <Avatar
          src={user.profilePhoto}
          alt={t("user.avatar")}
          style={{ cursor: "pointer" }}
        />
      </Dropdown>
    </div>
  );
};

export default UserMenu;
