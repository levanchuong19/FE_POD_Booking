import { Button, Card } from "antd"
import { Device } from "../modal/device"
import { useNavigate } from "react-router-dom"
import { LayoutOutlined, UserOutlined } from "@ant-design/icons";
import formatVND from "../../utils/currency";
import "./index.scss"


interface Card2Props{
    device : Device
}
function Card3({device}: Card2Props) {
    const Navigate = useNavigate();
    const { Meta } = Card;
  return (
    <div>
        <Card className="card3"
    hoverable
    style={{ width: 350,  }}
    cover={<a onClick={()=> Navigate(`device/${device?.id}`)}><img alt="example" src={device?.imageUrl} /></a> }
    
  >
    <Meta/>
    <p className="price">{formatVND(device?.price)}/giờ</p>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
  <div className="desc">
   <strong>{device?.roomType}</strong>
   <div style={{display:"flex",gap:"20px"}}>
   <p><UserOutlined /> {device?.memberSize}</p>
   <p><LayoutOutlined /> {device?.size} m </p>
   </div>

   </div>
   <Button type="primary" danger onClick={()=> Navigate(`booking/${device.id}`)}>Đặt chỗ</Button>
  </div>
  </Card>
     
    </div>
  )
}

export default Card3