
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { UnorderedListOutlined } from '@ant-design/icons';

export default function Reservation({
  numberOfSlides = 1,
  autoplay = false,
}) {
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
       
       <SwiperSlide>On Going</SwiperSlide>
       <SwiperSlide>Up Coming</SwiperSlide>
       <SwiperSlide>Pending</SwiperSlide>
       <SwiperSlide>Completed</SwiperSlide>
       <SwiperSlide>Canceled</SwiperSlide>
      
      </Swiper>
      <div className="line2"></div>
    </div>
  );
}
