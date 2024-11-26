// components/DefaultLayout.js
import React from "react";
import { Layout } from "antd";
import Head from "./Head";
import AppFooter from "./Footer";
import NavBar from "./NavBar";

const { Header, Content, Footer } = Layout;

const DefaultLayout = ({ children, title }) => {
  return (
    <div className="layout">
      <Head title={title} />

      {/* Header/NavBar */}
      <Header
        className="navbar-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          width: "100%",
          height: "20px",
          lineHeight: "30px",
          padding: "0",
        }}
      >
        <NavBar />
      </Header>

      {/* Main Content */}
      <Content style={{ flex: "1 0 auto", padding: "24px", marginTop: "50px" }}>
        <main className="main-container">{children}</main>
      </Content>

      {/* Footer */}
      <Footer style={{ flexShrink: 0 }}>
        <AppFooter />
      </Footer>
    </div>
  );
};

export default DefaultLayout;
