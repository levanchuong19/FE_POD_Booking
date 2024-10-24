import { useEffect, useState } from "react"
import formatVND from "../../utils/currency"
import formatDate from "../../utils/date"
import formatTime from "../../utils/time"
import { Booking } from "../modal/booking"
import { POD } from "../modal/pod"
import "./index.scss"
import api from "../config/api"
import { LayoutOutlined, UserOutlined } from "@ant-design/icons"

export type ReservationCardProps  ={
    booking : Booking;
    canAddRating: boolean; 
    onAddRating: (bookingId: string) => void; 
    onRebook: (podId: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ booking, canAddRating, onAddRating, onRebook  }) => {
  const [pods, setPod] = useState<POD>();
    const fetchPod = async () =>{
        try{
            const response = await api.get(`pods/${booking?.podId}`);
              setPod(response.data.data) 
        }catch(err){
            console.log(err);
        }
    }
     useEffect(() =>{
        fetchPod();
     },[]);

    
  return (
    <div>
        <div className="reservation">
            <div className="reservation__left">
            <img width={300} src={pods?.imageUrl} alt="" />
            </div>
            <div className="reservation__right">
            <h2>{booking.podName}</h2>
            <div style={{display:"flex",gap:"20px"}}>
            <p><UserOutlined /> {pods?.capacity}</p>
            <p><LayoutOutlined /> {pods?.area } m </p>
            </div>
            <p>Địa chỉ: {booking.locationAddress}</p>
            <p>{booking?.startTime ? formatDate(new Date(booking.startTime)) : 'No date available'}</p>
            <p>{booking?.startTime ? formatTime(new Date(booking.startTime)) : ''} - {booking?.endTime ? formatTime(new Date(booking.endTime)) : ''}</p>
            <p>{formatVND(booking.totalPrice)}</p>
            {booking.paymentStatus === 'Complete' &&
            (<p>{canAddRating && (<span style={{ cursor: 'pointer', color:"blue" }} onClick={() => onAddRating(booking.podId)}>Thêm đánh giá cho dịch vụ</span>)} |  <span style={{ cursor: 'pointer', color:"blue" }} onClick={() => onRebook(booking.podId)}>Tiếp tục sử dụng</span></p>)}
             
            </div>
        </div>

        
    </div>
  )
}

export default ReservationCard