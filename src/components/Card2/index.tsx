import { Card } from "antd"
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
    style={{ width: 300,   }}
    cover={<a onClick={()=> Navigate(`device/${device.deviceID}`)}><img alt="example" src={device?.imageDevice} /></a>}
  >
    <Meta/>
    <strong>{device?.nameDevice}</strong>
    <div >
      
    <p><MinusSquareOutlined /> {device?.deviceQuantity}  device</p></div>
  </Card>
     
    </div>
  )
}

export default Card2