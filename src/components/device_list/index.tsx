import { useEffect, useState } from "react";
import { Location } from "../modal/location";
import api from "../config/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Device } from "../modal/device";
import { BarsOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Card3 from "../Card3";
import { Select } from "antd";
import "./index.scss"

export default function DeviceList({
  numberOfSlides = 4,
  autoplay = false,
}) {
  const [locations, setLocation] = useState<Location[]>();
    const fetchLocation = async () =>{
        try{
            const response = await api.get("locations");
               console.log(response.data);
               setLocation(response.data);
        }catch(err){
            console.log(err);
        }
    }
     useEffect(() =>{
        fetchLocation();
     },[]);
     const [device, setDevice] = useState<Device[]>();
    
     const fetchDevice = async () =>{
         try{
             const response = await api.get("devices");
                console.log(response.data);
                setDevice(response.data);
                setFilteredDevices(response.data);
                setSelectedSlide(null);
         }catch(err){
             console.log(err);
         }
     }
      useEffect(() =>{
         fetchDevice();
      },[]);
     
      const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
     const handleLocationClick = (id:string) => {
      const filtered = device?.filter((device) => device.id === id);
      setFilteredDevices(filtered || []);
      setSelectedSlide(id); 
    };
    const uniqueAddresses = Array.from(new Set(locations?.map((location) => location.name)));
    const uniqueFloor = Array.from(new Set(device?.map((device) => device.floor)));
    const [selectedSlide, setSelectedSlide] = useState(); 
    const handleAddressChange = (value: string) => {
      console.log(value)
      handleLocationClick(value);  
    };
    const onSearch = (value: string) => {
      setFilteredDevices(value);
      console.log('search:', value);
    };
  return (
    
    <div style={{backgroundColor:"#fff"}}>
     <h3 style={{marginBottom:"20px", marginTop:"20px"}} onClick={()=>fetchDevice()}> <BarsOutlined />     Các loại thiết bị</h3>
     
     <div className="slideDevice" >
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
        
       
       {device?.map((deviceItem : Device) => 
        (<SwiperSlide ><div onClick={() => handleLocationClick(deviceItem.id)}
        className={selectedSlide === deviceItem.id ? 'active-slide' : ''}
        >{deviceItem.roomType} </div></SwiperSlide>))}
       
       
       
      </Swiper>
      </div>
      <div className="select">
      <Select className="Select" options={uniqueAddresses.map((name) => ({
            value: name,
            label:(<><EnvironmentOutlined />   {name}</>),
          }))} onChange={(value)=>handleAddressChange(value)} onSearch={onSearch} placeholder="Chọn địa điểm"/>
       <Select className="Select2" options={uniqueFloor.map((floor) => ({
            value: floor,
            label:floor,
          }))} placeholder="Chọn tầng"/>
      

     </div>

      <div style={{display:"flex", flexWrap:"wrap", gap:"90px", width:"100%", justifyContent:"center", marginBottom:"50px" }}>
        {filteredDevices?.map((deviceItem : Device) => (<Card3 key={deviceItem.id} device={deviceItem}/>))}
        </div>
    </div>
  );
}
