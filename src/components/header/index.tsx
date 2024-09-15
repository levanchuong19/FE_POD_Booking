import { BellOutlined, UserOutlined } from "@ant-design/icons"
import "./index.scss"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate();
  return (
    <div className="header">
        <div className="header__left">
            <a href="/"><img width={100} src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/logo.png" alt="" /></a>
            <ul>
            <a href="/"><li>Trang chủ</li></a>
            <a href="/reservation"><li>Đặt chỗ</li></a>
            <a href="/device"><li>Thiết bị</li></a>
            <a href="/menu"><li>Thực đơn</li></a>
            </ul>
        </div>
        <div className="header__reight">
        <BellOutlined style={{fontSize:35}} />
        <UserOutlined onClick={() => navigate("/login")} className="user" style={{fontSize: 35}}/>
        </div>
    </div>
  )
}

export default Header

