import { Button, Card } from "antd"
import { Device } from "../modal/device"
import { useNavigate } from "react-router-dom"
import { MinusSquareOutlined } from "@ant-design/icons";
import "./index.scss"


interface Card2Props{
    device : Device
}
function Card2({device}: Card2Props) {
    const Navigate = useNavigate();
    const { Meta } = Card;
  return (
    <div>
        <Card className="card2"
    hoverable
    style={{ width: 350,  }}
    cover={<a onClick={()=> Navigate(`device/${device.deviceID}`)}><img alt="example" src={device?.imageDevice} /></a>}
  >
    <Meta/>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
  <div className="desc">
   <strong>{device?.nameDevice}</strong>
   <p><MinusSquareOutlined /> {device?.deviceQuantity}  device</p>
   </div>
   <Button type="primary" danger>Đặt chỗ</Button>
  </div>
  </Card>
     
    </div>
  )
}

export default Card2