import { useEffect, useState } from "react";
import { Device } from "../modal/device";
import api from "../config/api";
import Card2 from "../Card2";
import { BarsOutlined } from "@ant-design/icons";


 
function DeviceList() {
    const [device, setLocation] = useState<Device[]>();
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
    <div style={{display:"flex",
        flexWrap:"wrap"
    }}>
        <h3> <BarsOutlined />     Các loại thiết bị</h3>
       {device?.map((deviceItem : Device) => (<Card2 key={deviceItem.deviceID} device={deviceItem}/>))}
    </div>
  )
}

export default DeviceList