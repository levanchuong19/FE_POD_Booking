import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import api from "../../components/config/api";
import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import "./index.scss"
import { Button, Collapse, CollapseProps } from "antd";
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
        setShowFullDescription(!showFullDescription); 
    };
    const text = `Mở web Work Flow -> Đăng Nhập bằng tài khoản của bạn -> Chọn đặt chỗ -> Chọn On Going -> Cung cấp thông tin này cho nhân viên`;

  const text1 = `Mở web Work Flow  ->  Chọn đặt chỗ -> Chọn Up Coming -> Chọn Booking muốn thay đổi thời gian đặt phòng -> kéo xuống dưới cùng, chọn dời lịch -> Chọn khung thời gian mới và hệ thống sẽ gửi thông báo dời lịch thành công -> Bạn có thể xem lại thao tác ở mục thông báo`;
  const text2 = `Bạn có thể liên hệ trực tiếp các barista ở quầy bar hoặc Gọi +84 333 68 0099 - Email infor@workflowcafe.com`;
    const items: CollapseProps['items'] = [
      {
        key: '1',
        label: 'Làm sao để check-in ?',
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'Làm sao để thay đổi thời gian đặt phòng ?',
        children: <p>{text1}</p>,
      },
      {
        key: '3',
        label: 'Làm sao liên hệ nhân viên hỗ trợ ?',
        children: <p>{text2 }</p>,
      },
    ];
    
  return (
   <div className="LocationDetails" >
     <div className="locationDetails" >
      <div className="locationDetails__left">
        <img style={{borderRadius:"15px"}} width={600} src={locations?.imageUrl} alt="" />
      </div>
      
      <div className="locationDetails__reight" >
      {/* <img style={{borderRadius:"15px", marginLeft:"30px", marginTop:"20px",objectFit:"cover" }} width={1020} height={450}  src={locations?.imageUrl} alt="" /> */}
        <h2>{locations?.name}</h2>
       
        {/* <h4 style={{paddingLeft: "30px"}}>Giới thiệu</h4> */}
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
        <p>Câu hỏi thường gặp</p>
        <p><Collapse style={{border:"none",}} accordion items={items} /></p>
        <Button type="primary" danger onClick={()=> navigate("/device")}> Đặt phòng ngay</Button>
      </div>
    </div>
   </div>
  )
}

export default LocationDetails