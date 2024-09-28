import { Card } from "antd";
import { Location } from "../modal/location";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.scss"

type CardProps = {
    location : Location
}

function Cards({location}:CardProps) {
    const { Meta } = Card;
    const navigate = useNavigate();
  return (
    <div className="Card" >
    <Card className="card"
    hoverable
    style={{ width: 335, height:320,   }}
    cover={<a onClick={()=> navigate(`/locationDetails/${location.id}`)}><img alt="example" src={location?.imageUrl} /></a>}
  >
    
    <Meta/>
    <div className="description">
      <strong>{location?.name}</strong>
    <p><EnvironmentOutlined /> {location?.address}</p></div>
  </Card>
    </div>
  )
}

export default Cards;

