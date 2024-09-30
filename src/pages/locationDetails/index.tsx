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
     const [locations, setLocation] = useState<Location>();
     const [showFullDescription, setShowFullDescription] = useState(false);
     const fetchLocation = async () =>{
         try{
             const response = await api.get(`locations/${id}`);
             console.log(response.data)
           setLocation(response.data.data)
         }catch(err){
             console.log(err);
         }
     }
      useEffect(() =>{
         fetchLocation();
      },[]);
      const toggleDescription = () => {
        setShowFullDescription(!showFullDescription); // Đổi trạng thái giữa xem ngắn và xem đầy đủ
    };
  return (
    <div className="locationDetails" >
      {/* <div className="locationDetails__left">
        <img style={{borderRadius:"15px"}} width={500} src={locations?.imageUrl} alt="" />
      </div> */}
      
      <div className="locationDetails__reight" >
      <img style={{borderRadius:"15px", marginLeft:"30px", marginTop:"20px",objectFit:"cover" }} width={1020} height={450}  src={locations?.imageUrl} alt="" />
        <strong>{locations?.name}</strong>
        <p className="lineItem"></p>
        <p>
                    {showFullDescription
                        ? locations?.description // Hiển thị đầy đủ
                        : locations?.description.substring(0, 221)} {/* Hiển thị 100 ký tự đầu nếu không xem đầy đủ */}
                    {locations?.description && locations?.description.length > 221 && (
                        <span
                            onClick={toggleDescription}
                            style={{ color: 'rgb(194, 191, 191)', cursor: 'pointer' }}
                        >
                            {showFullDescription ? " Thu gọn" : "... Xem thêm"}
                        </span>
                    )}
                </p>
        <p ><EnvironmentOutlined /> {locations?.address }</p>
        <p><ClockCircleOutlined /> Mở cửa : 07:00 - 22:00 </p>
        <p><MailOutlined />  info@workflow.com.vn</p>
        
        <Button type="primary" danger onClick={()=> navigate(`device/${id}`)}> Xem Thiết Bị</Button>
      </div>
    </div>
  )
}

export default LocationDetails