import { useEffect, useState } from "react";
import { Device } from "../modal/device";
import api from "../config/api";
import Card2 from "../Card2";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss"
import ListDevice from "../list_device";


 
 function DeviceList() {
    const [device, setDevice] = useState<Device[]>();
    
    const fetchDevice = async () =>{
        try{
            const response = await api.get("podbooking");
               console.log(response.data);
               setDevice(response.data);
        }catch(err){
            console.log(err);
        }
    }
     useEffect(() =>{
        fetchDevice();
     },[]);
  return (
    < >
        <h3 style={{marginBottom:"30px"}}> <BarsOutlined />     Các loại thiết bị</h3>
        <div style={{border:" 2px solid black", width:"83%", marginLeft:"125px", marginBottom:"20px"}}>
        <ListDevice/>
        </div>
       <div style={{display:"flex", flexWrap:"wrap", gap:"90px", width:"100%", justifyContent:"center", marginBottom:"50px" }}>
        {device?.map((deviceItem : Device) => (<Card2 key={deviceItem.deviceID} device={deviceItem}/>))}</div>
    </>
  )
}

export default DeviceList