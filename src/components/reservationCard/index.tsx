import formatVND from "../../utils/currency"
import formatDate from "../../utils/date"
import formatTime from "../../utils/time"
import { Booking } from "../modal/booking"
import "./index.scss"
export type ReservationCardProps  ={
    booking : Booking
}

function ReservationCard({booking}: ReservationCardProps) {
  return (
    <div>
        <div className="reservation">
            <div className="reservation__left">
            <img width={300} src="https://workflow.com.vn/wp-content/uploads/2024/07/ThaoDien.png" alt="" />
            </div>
            <div className="reservation__right">
            <p>{booking.podName}</p>
            <p>{booking.locationAddress}</p>
            <p>{booking?.startTime ? formatDate(new Date(booking.startTime)) : 'No date available'}</p>
            <p>{booking?.startTime ? formatTime(new Date(booking.startTime)) : ''} - {booking?.endTime ? formatTime(new Date(booking.endTime)) : ''}</p>
            <p>{formatVND(booking.totalPrice)}</p>
            </div>
        </div>

        
    </div>
  )
}

export default ReservationCard