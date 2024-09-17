import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import api from "../../components/config/api";
import { Location } from "../../components/modal/location";
import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import "./index.scss"
import { Button } from "antd";

function LocationDetails() {
    const naviagte = useNavigate();
    const [locations, setLocation] = useState<Location>();
    const {id} = useParams();
    const fetchLocation = async () =>{
        try {
            const response =  await api.get(`podbooking/${id}`);
             setLocation(response.data);
        } catch (err) {
            console.log(err);
        }
    }
     useEffect(() => {fetchLocation();},[]);
  return (
    <div className="locationDetails">
      <div className="locationDetails__left">
        <img style={{borderRadius:"15px"}} width={550} src={locations?.image} alt="" />
      </div>
      <div className="locationDetails__reight" >
        <strong>{locations?.name}</strong>
        <p className="lineItem"></p>
        <p><EnvironmentOutlined /> {locations?.address}</p>
        <p><ClockCircleOutlined /> Mở cửa : 07:00 - 22:00</p>
        <p><MailOutlined />  info@workflow.com.vn</p>
        <Button type="primary" danger onClick={()=> naviagte(``)}> Xem Thiết Bị</Button>
      </div>
    </div>
  )
}

export default LocationDetails