import React, { useEffect, useState } from "react";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  theme,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import { jwtDecode } from "jwt-decode";
import api from "../config/api";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label: <Link to={`/dashboard/${key}`}>{label}</Link>,
});

const allItems: MenuItem[] = [
  getItem("Dashboard", "statistical", <PieChartOutlined />),
  getItem("Manage Location", "locations", <PieChartOutlined />),
  getItem("Manage Pod", "pods", <PieChartOutlined />),
  getItem("Manage Service", "services", <PieChartOutlined />),
  getItem("Manage Device", "devices", <PieChartOutlined />),
  getItem("Manage Account", "accounts", <PieChartOutlined />),
  getItem("Manage Rating", "ratings", <PieChartOutlined />),
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await api.get(`accounts/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleToken = (token: string) => {
    const decodedToken = jwtDecode(token);
    const roles =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    const userId = decodedToken.userId;

    setUserRole(roles);
    if (userId) {
      fetchUserData(userId);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      handleToken(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleUserIconClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      handleToken(token);
      setIsModalVisible(true);
    } else {
      navigate("/login");
    }
  };

  const getFilteredMenuItems = (): MenuItem[] => {
    switch (userRole) {
      case "Admin":
        return allItems;
      case "Manager":
        return allItems.filter((item) => item?.key !== "statistical");
      case "Staff":
        return allItems.filter(
          (item) => item?.key === "pods" || item?.key === "accounts"
        );
      default:
        return [];
    }
  };

  const handleModalClose = () => setIsModalVisible(false);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsModalVisible(false);
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={getFilteredMenuItems()}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingRight: "80px",
          }}
        >
          <UserOutlined
            className="user"
            style={{ fontSize: 35 }}
            onClick={handleUserIconClick}
          />
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Team POD Booking
        </Footer>
        {isModalVisible && (
          <Modal
            title="User Profile"
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
          >
            {userData ? (
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={userData}
              >
                <Form.Item label="Username" name="username">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="First Name" name="firstName">
                  <Input />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                  <Button type="primary" danger onClick={handleLogout}>
                    Logout
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <p>Loading...</p>
            )}
          </Modal>
        )}
      </Layout>
    </Layout>
  );
};

export default Dashboard;
