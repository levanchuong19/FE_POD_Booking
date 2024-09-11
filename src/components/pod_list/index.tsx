import { useEffect, useState } from "react";
import { Location } from "../modal/location";
import api from "../config/api";
import Cards from "../Card";

function PodBooking() {
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
    <div style={{display: "flex", flexWrap: "wrap", gap:"100px", alignItems:"center", justifyContent:"center", width:"80%"}}>
      {location?.map((locationItem : Location) => (<Cards key={locationItem.id} location={locationItem}/>))}
    </div>
  )
}

export default PodBooking