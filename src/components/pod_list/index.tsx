import { useEffect, useState } from "react";
import { Location } from "../modal/location";
import api from "../config/api";
import Cards from "../Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "./index.scss";


import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { EnvironmentOutlined } from "@ant-design/icons";

export default function PodBooking({
  numberOfSlides = 3,
  autoplay = false,
}) {
  const [location, setLocation] = useState<Location[]>();
    const fetchLocation = async () =>{
        try{
            const response = await api.get("podbooking");
               console.log(response.data);
               setLocation(response.data);
        }catch(err){
            console.log(err);
        }
    }
     useEffect(() =>{
        fetchLocation();
     },[]);
  return (
    <div style={{backgroundColor:"#fff"}}>
    <div className="line1"></div>
    <h3><EnvironmentOutlined /> Địa điểm</h3>
      <Swiper
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={autoplay ? [Autoplay, Navigation] : [Pagination]}
        className={`carousel ${numberOfSlides > 1 ? "multi-item" : ""}`}
      >
       
       {location?.map((locationItem : Location) => (<SwiperSlide className="slide"><Cards key={locationItem.id} location={locationItem}/></SwiperSlide>))}
      </Swiper>
      <div className="line2"></div>
    </div>
  );
}
