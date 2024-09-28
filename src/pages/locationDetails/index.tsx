import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import api from "../../components/config/api";
import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import "./index.scss"
import { Button } from "antd";
import { Location } from "../../components/modal/location";

function LocationDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
     const [location, setLocation] = useState<Location>();
     const fetchLocation = async () =>{
         try{
             const response = await api.get(`locations/${id}`);
             console.log(response.data)
               setLocation(response.data)
         }catch(err){
             console.log(err);
         }
     }
      useEffect(() =>{
         fetchLocation();
      },[]);
  return (
    <div className="locationDetails" key={location?.id}>
      <div className="locationDetails__left">
        <img style={{borderRadius:"15px"}} width={550} src={location?.imageUrl} alt="" />
        {location?.imageUrl}
      </div>
      <div className="locationDetails__reight" >
        <strong>{location?.name}</strong>
        <p className="lineItem"></p>
        <p ><EnvironmentOutlined /> {location?.address}</p>
        <p><ClockCircleOutlined /> Mở cửa : 07:00 - 22:00</p>
        <p><MailOutlined />  info@workflow.com.vn</p>
        <Button type="primary" danger onClick={()=> navigate(`device/${id}`)}> Xem Thiết Bị</Button>
      </div>
    </div>
  )
}

export default LocationDetails