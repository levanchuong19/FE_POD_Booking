import { UserOutlined } from "@ant-design/icons"
import "./index.scss"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate();
  return (
    <div className="header">
        <div className="header__left">
            <img width={100} src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/logo.png" alt="" />
            <a href="/">Trang chủ</a>
            <a href="/">Đặt chỗ</a>
            <a href="/">Thiết bị</a>
            <a href="/">Thực đơn</a>
        </div>
        <div className="header__reight">
        <UserOutlined onClick={() => navigate("/login")} className="user" style={{fontSize: 35}}/>
        </div>
    </div>
  )
}

export default Header

