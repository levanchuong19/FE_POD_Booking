import Carousel from "../../components/carousel"
import ListDevice from "../../components/list_device"

import PodBooking from "../../components/pod_list"


function Home() {
  return (
    <div>
        <Carousel/>
        <PodBooking numberOfSlides={3}/>
        {/* <DeviceList/> */}
        <ListDevice/>
    </div>
  )
}

export default Home