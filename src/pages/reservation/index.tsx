
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../components/config/api';
import { Booking } from '../../components/modal/booking';
import ReservationCard from '../../components/reservationCard';
import "./index.scss"
import { Button, Modal } from 'antd';
import Ratings from '../../components/rating';
import { useNavigate } from 'react-router-dom';

export default function Reservation({
  numberOfSlides = 1,
  autoplay = false,
}) {

  const [reservation, setReservation] = useState<Booking[]>();
  const [selectedStatus, setSelectedStatus] = useState<string>('On Going');
  const [activeSlide, setActiveSlide] = useState<string>('On Going');
  const [showRatings, setShowRatings] = useState(false); 
  const [currentPodId, setCurrentPodId] = useState([]); 

  const navigate = useNavigate();
    const fetchBooking = async () => {
        const response =  await api.get("bookings");
        console.log('response',response.data)
        setReservation(response.data || []);
    }

    useEffect(()=>{
        fetchBooking();
    },[]);
    
    const filteredBookings = reservation?.filter((item: Booking) => item.paymentStatus === selectedStatus) || [];
    const handleSlideClick = (status: string) => {
      setSelectedStatus(status);
      setActiveSlide(status);
      
    };

    const handleAddRating = (podId: string) => {
      console.log(`Adding rating for pod ID: ${podId}`);
      setCurrentPodId(podId); 
      setShowRatings(true); 

    };

    const handleRebookPod = (podId: string) => {
      navigate(`/booking/${podId}`)
    };

  return (
    <div className='bookingPage'>
      <h3 style={{marginTop:"30px", marginBottom:"20px",cursor: "pointer"}}><UnorderedListOutlined />  My Booking</h3>
      <Swiper style={{border: "2px solid black",  padding:"10px", fontWeight:"600"}}
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={autoplay ? [Autoplay, Navigation] : [Pagination]}
        className={`carousel ${numberOfSlides > 1 ? "multi-item" : ""}`}
        
      >
       
      <SwiperSlide
          onClick={() => handleSlideClick('On Going')}
          className={activeSlide === 'On Going' ? '-slide' : ''}
        >
          On Going
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleSlideClick('Up Coming')}
          className={activeSlide === 'Up Coming' ? '-slide' : ''}
        >
          Up Coming
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleSlideClick('Pending')}
          className={activeSlide === 'Pending' ? '-slide' : ''}
        >
          Pending
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleSlideClick('Complete')}
          className={activeSlide === 'Completed' ? '-slide' : ''}
        >
          Completed
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleSlideClick('Canceled')}
          className={activeSlide === 'Canceled' ? '-slide' : ''}
        >
          Canceled
        </SwiperSlide>
      
      </Swiper>
      <div className="line2"></div>

     <div className="Reservation">
     <div className="reservation">
     <div className="reservationCard">
     {filteredBookings.length > 0 ? (
              filteredBookings?.map((item: Booking) => (
                <ReservationCard key={item.id} booking={item} canAddRating={activeSlide === 'Complete'} 
                onAddRating={handleAddRating} onRebook={handleRebookPod}
                />
              ))
            ) : (
              <p>No bookings available for this status.</p>
            )}
           
      </div>
     </div>
     </div>
            <Modal 
            open={showRatings}  onCancel={() => setShowRatings(false)}  width={600}
             footer={[
               <Button key="cancel" onClick={() => setShowRatings(false)}>
                            Cancel
               </Button>,
              ]}
            >
             {currentPodId && <Ratings podId={currentPodId} />}
           </Modal>
    </div>
  );
}
