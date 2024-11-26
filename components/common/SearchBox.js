// components/common/SearchBox.js
import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";

const { Search } = Input;

const SearchBox = () => {
  const { t } = useTranslation();

  return (
    <Search
      className="navbar-search"
      placeholder={t("search_placeholder")}
      enterButton={<Button icon={<SearchOutlined />} type={"primary"} />}
    />
  );
};

export default SearchBox;
