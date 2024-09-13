import Carousel from "../../components/carousel"
import DeviceList from "../../components/device_list"
import PodBooking from "../../components/pod_list"


function Home() {
  return (
    <div>
        <Carousel/>
        <PodBooking/>
        <DeviceList/>
    </div>
  )
}

export default Home