import { useEffect, useState } from "react";
import { Location } from "../modal/location";
import api from "../config/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Card1 from "../Card1";

export default function ListDevice({
  numberOfSlides = 4,
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

   
      <Swiper
        slidesPerView={numberOfSlides}
        // spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={autoplay ? [Autoplay, Navigation] : [Pagination]}
        className={`carousel ${numberOfSlides > 1 ? "multi-item" : ""}`}
        
      >
       
       {location?.map((locationItem : Location) => (<SwiperSlide className="slide"><Card1 key={locationItem.id} location={locationItem}/></SwiperSlide>))}
      </Swiper>
   
    </div>
  );
}
