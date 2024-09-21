
import { Card } from "antd";
import { Location } from "../modal/location";
import "./index.scss"


interface CardProps {
    location : Location
}

function Card1({location}:CardProps) {
  const { Meta } = Card;
  // const navigate = useNavigate();
  return (
    <div className="card1" >
     <Card 
    hoverable
    style={{ width: 255, border:"none", fontSize:"18px" ,    }}
    // cover={<a onClick={()=> navigate(`location/${location.id}`)}><img alt="example" src={location?.image} /></a>}
  >
    <Meta/>
    <div className="description">
      <strong>{location?.name}</strong>
   </div>
  </Card>
    </div>
  )
}

export default Card1;