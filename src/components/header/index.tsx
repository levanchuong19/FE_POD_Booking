import "./index.scss";
import { jwtDecode } from "jwt-decode";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../config/api";
import { useState } from "react";

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove the token from local storage
    setIsModalVisible(false); // Close the modal
    // navigate("/login"); // Redirect to login page
  };
  const navigate = useNavigate();
  const [UserData, setUserData] = useState(null);
  const handleUserIconClick = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        const userId = decodedToken.userId;
        console.log("id:", userId);
        const response = await api.get(`accounts/${userId}`);
        navigate(`/userProfile/${userId}`);
        setUserData(response.data);

        // const userData = response.data;
        // console.log("User Data:", userData);
        // navigate("/profile");
      } catch (error) {
        console.error("Failed to fetch user data or decode token:", error);
      }
    } else {
      navigate("/login");
    }
  };

  // const handleModalClose = () => {
  //   setIsModalVisible(false);
  // };
  return (
    <div className="header">
      <div className="header__center">
        <div className="header__left">
          <a href="/">
            <img
              width={100}
              src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/logo.png"
              alt=""
            />
          </a>
          <ul>
            <a href="/">
              <li>Trang chủ</li>
            </a>
            <a href="/reservation">
              <li>Đặt chỗ</li>
            </a>
            <a href="/device">
              <li>Thiết bị</li>
            </a>
            {/* <a href="/menu"><li>Thực đơn</li></a> */}
          </ul>
        </div>
        <div className="header__reight">
          <BellOutlined style={{ fontSize: 35 }} />
          <UserOutlined
            onClick={handleUserIconClick}
            className="user"
            style={{ fontSize: 35 }}
          />
        </div>
        {isModalVisible && (
          <Modal
            title="User Profile"
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
          >
            {UserData ? (
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={UserData}
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
      </div>
    </div>
  );
}

export default Header;
