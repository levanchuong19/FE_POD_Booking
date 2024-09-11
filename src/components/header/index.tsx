import { UserOutlined } from "@ant-design/icons"
import "./index.scss"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate();
  return (
    <div className="header">
        <div className="header__left">
            <a href="/"><img width={100} src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/logo.png" alt="" /></a>
            <a href="/">Trang chủ</a>
            <a href="/reservation">Đặt chỗ</a>
            <a href="/device">Thiết bị</a>
            <a href="/menu">Thực đơn</a>
        </div>
        <div className="header__reight">
        <UserOutlined onClick={() => navigate("/login")} className="user" style={{fontSize: 35}}/>
        </div>
    </div>
  )
}

export default Header

