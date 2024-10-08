import { useEffect, useState } from "react";
import { Location } from "../modal/location";
import api from "../config/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Device } from "../modal/device";
import { BarsOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Select } from "antd";
import "./index.scss"
import { POD } from "../modal/pod";
import PodCard from "../PodCard";


export default function DeviceList({
  numberOfSlides = 3,
  autoplay = false,
}) {
  const [locations, setLocation] = useState<Location[]>();
  const [device, setDevice] = useState<Device[]>();
  const [pod, setPod] = useState<POD[]>();
  const [filteredPods, setFilteredPods] = useState<POD[]>([]);
  const [selectedSlide, setSelectedSlide] = useState(); 
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
    const fetchLocation = async () =>{
        try{
            const response = await api.get("locations");
               setLocation(response.data);
        }catch(err){
            console.log(err);
        }
    }
     useEffect(() =>{
        fetchLocation();
     },[]);
     
     const fetchDevice = async () =>{
         try{
             const response = await api.get("devices");
                setDevice(response.data);
                setFilteredPods(response.data);
                setSelectedSlide(null);
         }catch(err){
             console.log(err);
         }
     }
      useEffect(() =>{
         fetchDevice();
      },[]);
     
      const fetchPod = async () =>{
        try{
            const response = await api.get("pods");
               setPod(response.data);
               setFilteredPods(response.data);
        }catch(err){
            console.log(err);
        }
    }
     useEffect(() =>{
        fetchPod();
     },[]);
      
     const handleLocationClick = (deviceId:string) => {
      const filtered = pod?.filter((pod) => pod.deviceId === deviceId);
      setFilteredPods(filtered || []);
      setSelectedDeviceId(deviceId);
      setSelectedSlide(deviceId); 
    };
    const uniqueAddresses = Array.from(new Set(locations?.map((location) => location.name)));
    const uniqueFloor = Array.from(new Set(device?.map((device) => device.floor)));
    
    const handleAddressChange = (locationID) => {
      setSelectedLocationId(locationID);
      const filtered = pod?.filter((pod) => pod.locationId === locationID && pod.deviceId === selectedDeviceId );
      setFilteredPods(filtered || []);
      setSelectedSlide(locationID); 
      
    };
    const handleFloorChange = (floor) => {
      setSelectedFloor(floor);
      const filtered = pod?.filter((pod) => pod.floor === floor && pod.deviceId === selectedDeviceId  && pod.locationId === selectedLocationId);
      setFilteredPods(filtered || []);
      setSelectedSlide(floor); 
      
    };
    
  return (
    
    <div style={{backgroundColor:"#fff"}}>
     <h3 style={{marginBottom:"20px", marginTop:"20px"}} onClick={()=>fetchPod()}> <BarsOutlined />     Các loại thiết bị</h3>
     
     <div className="slideDevice" >
      <Swiper
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
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
            value: locations?.find(loc => loc.name === name)?.id || '',
            label:(<><EnvironmentOutlined />   {name}</>),
          }))} onChange={(value)=>handleAddressChange(value)}placeholder="Chọn địa điểm"/>
       <Select className="Select2" options={uniqueFloor.map((floor) => ({
            value: floor,
            label:floor,
          }))}onChange={(value)=>handleFloorChange(value)} placeholder="Chọn tầng"/>
      

     </div>

      <div style={{display:"flex", flexWrap:"wrap", gap:"90px", width:"100%", justifyContent:"center", marginBottom:"50px" }}>
        {filteredPods?.map((podItem : POD) => (<PodCard key={podItem.id} pod={podItem}/>))}
        </div>
       
    </div>
  );
}
