import { BellOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../config/api";
import { useState } from "react";

function Header() {
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
          <a href="/menu">
            <li>Thực đơn</li>
          </a>
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
    </div>
  );
}

export default Header;
