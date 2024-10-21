import { useEffect, useState } from "react";
import api from "../../components/config/api";
import { Service } from "../../components/modal/service";
import "./index.scss"
import ServiceCard from "../ServiceCard";
import { Button, Modal } from "antd";
import { Booking } from "../modal/booking";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function ServiceDetails() {
  const [service, setService] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [reservation, setReservation] = useState<Booking[]>();
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);




  const fetchService = async () =>{
    try{
        const response = await api.get("services");
        console.log(response.data)
           setService(response.data);
    }catch(err){
        console.log(err);
    }
}
 useEffect(() =>{
    fetchService();
 },[]);

 const fetchBooking = async () => {
  try {
    const response = await api.get("bookings");
    console.log("response", response.data);
    setReservation(response.data || []);
    
    // Check for an ongoing booking
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Assuming you have the user ID from the token
    console.log('userId:',userId)
    const activeBooking = response.data.find((booking: Booking) => booking.paymentStatus === "OnGoing" 
      // && booking.customerId === userId
    );

    if (activeBooking) {
      setActiveBookingId(activeBooking.id); 
    }
  } catch (err) {
    console.log(err);
  }
};

    useEffect(()=>{
        fetchBooking();
    },[]);

    


//   const handleSubmit = async () => {
//     if (!activeBookingId) {
//       toast.error("Bạn cần có một booking đang hoạt động để sử dụng thêm dịch vụ.");
//       return;
//     }
//     const bookingUpdateData = {
//       bookingServices: selectedServices.map((service) => ({
//         serviceId: service.id,
//         quantity: service.quantity,
//       })),
//     };
//       try {
        
//       const response = await api.put(`bookings/${activeBookingId}`, bookingUpdateData);
//       const updateBooking = response.data.data
//       console.log(updateBooking.id)
//       console.log(updateBooking.data.data);
//       toast.success("Thêm dịch vụ thành công.");
//       setSelectedServices([]);
//       // navigate(`/confirmBooking/${createdBooking?.id}`)
//   } catch (err) {
//     console.error(err.response.data);
//     toast.error("Lỗi khi thêm dịch vụ vào booking.");
//       console.log(err);
//   }
 
// };

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const handleServiceSelection = (serviceId: any, quantity: any) => {
  setSelectedServices((prevServices) => {
    const existingService = prevServices.find((service) => service.id === serviceId);
    if (existingService) {
      return prevServices.map((service) =>
        service.id === serviceId ? { ...service, quantity: quantity } : service
      );
    } else {
      return [...prevServices, { id: serviceId, quantity: quantity }];
    }
  });
};
  return (
    <>
    <div className="CardService">
      <div className="cardService">
      {service?.map((serviceItem: Service) => (<ServiceCard key={serviceItem.id} service={serviceItem} onSelect={handleServiceSelection} />))}
      </div>
    </div>
    <Button onClick={handleSubmit} style={{marginLeft:"660px", marginBottom:"30px", padding:"20px 40px" , fontSize:'16px'}} type="primary" danger> Sử dụng thêm </Button>
    </>
  )
}

export default ServiceDetails
