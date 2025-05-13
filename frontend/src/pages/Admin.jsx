import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme, Typography, Space } from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import AddProduct from "../components/AddProduct";
import AddCustomerAdmin from "../components/AdminUserDetails";
import AddOrderAdmin from "../components/AllOrderAdmin";
import AllProductAdmin from "../components/AllProductAdmin";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("default");
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "add-product":
        return <AddProduct />;
      case "all-orders":
        return <AddOrderAdmin />;
      case "add-customer":
        return <AddCustomerAdmin />;
      default:
        return <AllProductAdmin />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminid");
    localStorage.removeItem("jwtToken");
    navigate("/admin-login");
  };

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            style={{
              background: colorBgContainer,
              boxShadow: "2px 0 8px 0 rgba(29,35,41,0.05)",
            }}
        >
          <div className="demo-logo-vertical" style={{ padding: "16px" }}>
            <Title level={3} style={{ textAlign: "center", margin: 0 }}>
              Admin Dashboard
            </Title>
          </div>
          <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectedComponent]}
              onSelect={({ key }) => setSelectedComponent(key)}
              items={[
                {
                  key: "default",
                  icon: <HomeOutlined />,
                  label: "Admin Home",
                },
                {
                  key: "add-product",
                  icon: <PlusOutlined />,
                  label: "Add New Product",
                },
                {
                  key: "all-orders",
                  icon: <UnorderedListOutlined />,
                  label: "View All Orders",
                },
                {
                  key: "add-customer",
                  icon: <UserOutlined />,
                  label: "View All Customers",
                },
              ]}
          />
        </Sider>
        <Layout>
          <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: "24px",
              }}
          >
            <Space>
              <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  danger
              >
                Logout
              </Button>
            </Space>
          </Header>
          <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
          >
            {renderSelectedComponent()}
          </Content>
        </Layout>
      </Layout>
  );
};

export default Admin;