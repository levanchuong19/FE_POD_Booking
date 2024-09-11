import { Card } from "antd";
import { Location } from "../modal/location";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.scss"

interface CardProps {
    location : Location
}

function Cards({location}:CardProps) {
    const { Meta } = Card;
    const navigate = useNavigate();
  return (
    <div >
    <Card className="card"
    hoverable
    style={{ width: 401, height:350 }}
    cover={<a onClick={()=> navigate(`location/${location.id}`)}><img alt="example" src={location?.image} width={400} /></a>}
  >
    <Meta/>
    <p>{location?.name}</p>
    <p><EnvironmentOutlined />{location?.address}</p>
  </Card>
    </div>
  )
}

export default Cards