
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../components/config/api';
import { Booking } from '../../components/modal/booking';
import ReservationCard from '../../components/reservationCard';
import "./index.scss"

export default function Reservation({
  numberOfSlides = 1,
  autoplay = false,
}) {

  const [reservation, setReservation] = useState<Booking[]>();
  const [selectedStatus, setSelectedStatus] = useState<string>('On Going');
  const [activeSlide, setActiveSlide] = useState<string>('On Going');
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

  return (
    <div className='bookingPage'>
      <h3 style={{marginTop:"30px", marginBottom:"20px",cursor: "pointer"}}><UnorderedListOutlined />  My Booking</h3>
      <Swiper style={{border: "2px solid black",  padding:"10px", fontWeight:"600"}}
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // navigation={true}
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
          onClick={() => handleSlideClick('Completed')}
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
                <ReservationCard key={item.id} booking={item} />
              ))
            ) : (
              <p>No bookings available for this status.</p>
            )}
      </div>
     </div>
     </div>
    </div>
  );
}
