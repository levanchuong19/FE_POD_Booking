import { useEffect, useState } from "react"
import api from "../../components/config/api"
import { Booking } from "../../components/modal/booking"
import { useParams } from "react-router-dom";
import "./index.scss"
import formatVND from "../../utils/currency";
import { Button } from "antd";
import { format } from 'date-fns'

function ConfirmBooking() {
            const [isBooking ,setIsbooking] = useState<Booking>();
            const {id} = useParams();
            const fetchBooking = async () => {
                  const response =  await api.get(`bookings/${id}`);
                  console.log('response',response.data.data)
                  setIsbooking(response.data.data);
                 }

                useEffect(()=>{
                     fetchBooking();
                },[]);
    

                const formatDate = (date:Date) => {
                    return format(date, "dd/MM/yyyy"); 
                };


             const formatTime = (date:Date) => {
                   return format(date, "HH:mm"); 
              };
              
            const formatBookingTime = () => {
            if (!isBooking?.startTime || !isBooking?.endTime) {
                 return "Không có thông tin thời gian";
                }
            const startDate = new Date(isBooking.startTime);
            const endDate = new Date(isBooking.endTime);
            const isMultipleDays = startDate.toDateString() !== endDate.toDateString();
                if (isMultipleDays) {
                    return `${formatDate(startDate)} ${formatTime(startDate)} - ${formatDate(endDate)} ${formatTime(endDate)}`;
                } else {
                    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
                }
                };

    const calculateDuration = (startTime: Date, endTime: Date) => {
        const durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
        const days = Math.floor(durationInMinutes / (24 * 60));
        const remainingMinutesAfterDays = durationInMinutes % (24 * 60);
        const hours = Math.floor(remainingMinutesAfterDays / 60);
        const minutes = remainingMinutesAfterDays % 60;
    
        let durationString = '';
        if (days > 0) {
            durationString += `${days} ngày `;
        }
        if (hours > 0 || days > 0) {
            durationString += `${hours} giờ `;
        }
        durationString += `${minutes} phút`;
    
        return durationString;
    };

    const calculateTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationInMinutes = (end - start) / (1000 * 60); 
      
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = Math.round(durationInMinutes % 60);
      
        return `${hours} giờ ${minutes} phút`;
      };
    const calculateTotalServicePrice = () => {
        if (isBooking?.bookingServices) {
            return isBooking.bookingServices.reduce((total, service) => total + service.totalPrice, 0);
        }
        return 0;
    };
    
    const adjustedTotalPrice = isBooking?.totalPrice ? isBooking.totalPrice - calculateTotalServicePrice() : 0;
    const calculateUsageHours = (startTime: Date, endTime: Date) => {
        const durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
        const hours = durationInMinutes / 60; 
        return hours > 0 ? hours : 1; 
    };
    const usageHours = isBooking?.startTime && isBooking?.endTime 
    ? calculateUsageHours(new Date(isBooking.startTime), new Date(isBooking.endTime)) : 1; 
     const pricePerHour = usageHours > 0 ? adjustedTotalPrice / usageHours : 0;
  return (
    <div className="confirmBooking">
    <div className="confirm">
        <div className="confirm-content">
            <div className="confirm__left">
                <img width={500} src="https://workflow.com.vn/wp-content/uploads/2024/07/pod-representative.jpg" alt="" />
            </div>
            <div className="confirm__right">
                <h2>Thời Gian:</h2>
                {/* <p>{isBooking?.startTime ? formatDate(new Date(isBooking.startTime)) : 'No date available'} - {isBooking?.endTime ? formatDate(new Date(isBooking.endTime)) : 'No date available'}</p> */}
                <p>{formatBookingTime()}</p>
                <span style={{height:'0.99px',backgroundColor: 'black'}} className="spanLine"></span>
                <h2>Chi tiết đơn hàng:</h2>
                <p>{isBooking?.startTime && isBooking?.endTime ? calculateDuration(new Date(isBooking.startTime), new Date(isBooking.endTime)) : 'Không có thông tin thời gian'}</p>
                <p>{formatVND(pricePerHour)} x {isBooking?.startTime && isBooking?.endTime ? calculateTime(new Date(isBooking.startTime), new Date(isBooking.endTime)) : ''}</p>
                {/* <p>({isBooking?.startTime ? formatTime(new Date(isBooking.startTime)) : ''} - {isBooking?.endTime ? formatTime(new Date(isBooking.endTime)) : ''})</p> */}
                <h4>Lựa chọn đi kèm:</h4>
                
                {isBooking?.bookingServices && isBooking.bookingServices.map((service, index) => (
        <div key={index} className="service-item">
            <p>Tên : {service.nameService}    </p>
            <div style={{display:'flex', gap:"122px"}}>
            <p>Số lượng: {service.quantity}</p>
            <p>{formatVND(service.totalPrice)}</p>
            </div>
        </div>
    ))}
           
                <div style={{ display: "flex", gap: "190px", fontSize:"20px" }}>
                    <h4>Tổng :</h4>
                    <h4>{formatVND(isBooking?.totalPrice)}</h4>
                </div>
                <span style={{height:'0.8px',backgroundColor: 'black'}} className="spanLine"></span>
                <h2>Thanh toán: </h2>
                <div style={{display:"flex", alignItems:"center", gap: "150px"}}>
                    <img width={80} src="https://didongmoi.com.vn/data/cms-image/momo-la-gi/momo-la-gi-6.jpg" alt="" />
                    <p>Ví Momo</p>
                </div>
            </div>
        </div>
        <div className="confirm-button">
            <Button style={{padding:"20px 50px", fontSize:"18px"}} type="primary" danger>Thanh toán</Button>
        </div>
    </div>
</div>
  )
}

export default ConfirmBooking