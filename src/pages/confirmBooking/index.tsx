import { useEffect, useState } from "react";
import api from "../../components/config/api";
import { Booking } from "../../components/modal/booking";
import { useParams } from "react-router-dom";
import "./index.scss";
import formatVND from "../../utils/currency";
import { Button, Checkbox, CheckboxProps } from "antd";
import { format } from "date-fns";
import { Payment } from "../../components/modal/payment";
import { POD } from "../../components/modal/pod";
import { RewardPoints } from "../../components/modal/rewardpoints";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import moment from "moment";

dayjs.extend(utc);
dayjs.extend(timezone);

function ConfirmBooking() {
  const [isBooking, setIsbooking] = useState<Booking | null>(null);
  const [isPayment, setIsPayment] = useState<Payment | null>(null);
  const [isRewardpoints, setIsRewardpoints] = useState<RewardPoints[]>([]);
  const [oldPrice, setOldPrice] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const [pods, setPod] = useState<POD>();
  const token = localStorage.getItem("accessToken");

  const fetchPod = async () => {
    try {
      const response = await api.get(`pods/${isBooking?.podId}`);
      console.log(response.data.data);
      setPod(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPod();
  }, [isBooking?.podId]);

  const calculateDiscount = (points: number) => {
    if (points < 400) return 0;
    const discountPercentage = Math.floor(points / 400) * 10;
    return discountPercentage > 100 ? 100 : discountPercentage;
  };

  const calculateTotalWithDiscount = (totalPrice: number, points: number) => {
    const discountPercentage = calculateDiscount(points);
    const discountAmount = (totalPrice * discountPercentage) / 100;
    return totalPrice - discountAmount;
  };

  const fetchRewardPoint = async () => {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    console.log("id:", userId);
    try {
      const response = await api.get(`rewardpoints/total/${userId}`);
      console.log("isRewardpoints", response.data.data.value);
      setIsRewardpoints(response.data.data.value);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRewardPoint();
  }, []);

  const fetchBooking = async () => {
    const response = await api.get(`bookings/${id}`);
    console.log("BookingData", response.data.data);
    setIsbooking(response.data.data);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchPayment = async (bookingCode: string) => {
    try {
      console.log("Gửi mã booking:", bookingCode);
      const payload = { bookingCode };
      console.log("Payment request payload:", payload);
      const response = await api.post(
        `payments/create?bookingCode=${bookingCode}`
      );
      console.log("bookingResult:", response.data);
      const paymentUrl = response.data;
      console.log("paymentUrl: ", paymentUrl);
      setIsPayment(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data);
      }
      throw error;
    }
  };

  useEffect(() => {
    if (isBooking?.code) {
      fetchPayment(isBooking.code);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [isBooking?.code]);

  const handlePayment = async () => {
    if (!isBooking?.code) {
      console.error("No booking code available.");
      return;
    }

    try {
      const paymentUrl = isPayment?.result;
      console.log("VNPay Payment URL:", paymentUrl);

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("No payment URL received.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy");
  };

  const formatTime = (date: Date) => {
    return format(date, "HH:mm");
  };

  const formatBookingTime = () => {
    if (!isBooking?.startTime || !isBooking?.endTime) {
      return "Không có thông tin thời gian";
    }
    const startDate = new Date(isBooking.startTime);
    const endDate = new Date(isBooking.endTime);
    const isMultipleDays = startDate.toDateString() !== endDate.toDateString();
    if (isMultipleDays) {
      return `${formatDate(startDate)} ${formatTime(startDate)} - ${formatDate(
        endDate
      )} ${formatTime(endDate)}`;
    } else {
      return `${formatDate(startDate)}
                    ${formatTime(startDate)} - ${formatTime(endDate)}`;
    }
  };

  const calculateDuration = (startTime: Date, endTime: Date) => {
    const durationInMinutes =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const days = Math.floor(durationInMinutes / (24 * 60));
    const remainingMinutesAfterDays = durationInMinutes % (24 * 60);
    const hours = Math.floor(remainingMinutesAfterDays / 60);
    const minutes = remainingMinutesAfterDays % 60;

    let durationString = "";
    if (days > 0) {
      durationString += `${days} ngày `;
    }
    if (hours > 0 || days > 0) {
      durationString += `${hours} giờ `;
    }
    durationString += `${minutes} phút`;

    return durationString;
  };

  const calculateTime = (
    startTime: string | number | Date,
    endTime: string | number | Date
  ) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMinutes = (end - start) / (1000 * 60);

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.round(durationInMinutes % 60);

    return `${hours} giờ ${minutes} phút`;
  };
  const calculateTotalServicePrice = () => {
    if (isBooking?.bookingServices) {
      return isBooking.bookingServices.reduce(
        (total, service) => total + service.totalPrice,
        0
      );
    }
    return 0;
  };

  const adjustedTotalPrice = isBooking?.totalPrice
    ? isBooking.totalPrice - calculateTotalServicePrice()
    : 0;
  const calculateUsageHours = (startTime: Date, endTime: Date) => {
    const durationInMinutes =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const hours = durationInMinutes / 60;
    return hours > 0 ? hours : 1;
  };
  const usageHours =
    isBooking?.startTime && isBooking?.endTime
      ? calculateUsageHours(
          new Date(isBooking.startTime),
          new Date(isBooking.endTime)
        )
      : 1;
  const pricePerHour = usageHours > 0 ? adjustedTotalPrice / usageHours : 0;

  const onChange: CheckboxProps["onChange"] = async (e) => {
    if (e.target.checked) {
      if (isRewardpoints >= 400) {
        try {
          const oldBooking = { ...isBooking };
          const price = oldBooking.totalPrice;
          console.log("old price", price);
          setOldPrice(price);
          console.log("old booking", oldBooking);
          const start = isBooking?.startTime
            ? moment(isBooking.startTime)
            : null;
          const end = isBooking?.endTime ? moment(isBooking.endTime) : null;
          const updatedBooking = {
            startTime: start?.format("YYYY-MM-DDTHH:mm:ss"),
            endTime: end?.format("YYYY-MM-DDTHH:mm:ss"),
            useRewardPoints: true,
            bookingServices: isBooking?.bookingServices?.map((service) => ({
              serviceId: service.serviceId,
              quantity: service.quantity,
            })),
          };
          console.log("data update:", updatedBooking);
          const response = await api.put(`bookings/${id}`, updatedBooking);
          console.log("Booking updated with reward points", response.data);
          setIsbooking(response.data);
          setIsChecked(true);
          fetchBooking();
        } catch (error) {
          console.error("Lỗi khi cập nhật booking:", error);
          setIsChecked(false);
        }
      } else {
        console.log("Không đủ điểm thưởng để sử dụng.");
        toast.error("Bạn không đủ điểm thưởng để sử dụng.");
        setIsChecked(false);
      }
    } else {
      console.log("Không sử dụng điểm thưởng");
      setIsChecked(false);
    }
  };

  const resetBooking = () => {
    setIsChecked(false);
    setIsbooking(null);
  };

  return (
    <div className="confirmBooking">
      <div className="confirm">
        <div className="confirm-content">
          <div className="confirm__left">
            <img width={500} src={pods?.imageUrl} alt="" />
          </div>
          <div className="confirm__right">
            <span
              style={{ height: "0.99px", backgroundColor: "black" }}
              className="spanLine"
            ></span>
            <h2>Chi tiết đơn hàng:</h2>
            <p>{formatBookingTime()}</p>
            <p>
              {isBooking?.startTime && isBooking?.endTime
                ? calculateDuration(
                    new Date(isBooking.startTime),
                    new Date(isBooking.endTime)
                  )
                : "Không có thông tin thời gian"}
            </p>
            <p>
              {formatVND(isBooking?.pricePerHour)} x{" "}
              {isBooking?.startTime && isBooking?.endTime
                ? calculateTime(
                    new Date(isBooking.startTime),
                    new Date(isBooking.endTime)
                  )
                : ""}
            </p>
            {/* <p>({isBooking?.startTime ? formatTime(new Date(isBooking.startTime)) : ''} - {isBooking?.endTime ? formatTime(new Date(isBooking.endTime)) : ''})</p> */}
            <h4>Lựa chọn đi kèm:</h4>

            {isBooking?.bookingServices &&
              isBooking.bookingServices.map((service, index) => (
                <div key={index} className="service-item">
                  <p>Tên : {service.nameService} </p>
                  <div style={{ display: "flex", gap: "122px" }}>
                    <p>Số lượng: {service.quantity}</p>
                    <p>{formatVND(service.totalPrice)}</p>
                  </div>
                </div>
              ))}
            <div>
              <p>
                Tổng giá trị:{" "}
                <strong>
                  {oldPrice
                    ? formatVND(oldPrice)
                    : formatVND(isBooking?.totalPrice)}
                </strong>
              </p>
              {isChecked && (
                <p>Giảm giá: {calculateDiscount(isRewardpoints)}%</p>
              )}
            </div>
            <div style={{ display: "flex", gap: "190px", fontSize: "20px" }}>
              {/* <h4>Tổng :</h4>
              <h4>{formatVND(isBooking?.totalPrice)}</h4> */}
              <h4>Tổng cộng:</h4>
              <h4>{formatVND(isBooking?.totalPrice)}</h4>
            </div>
            <span
              style={{ height: "0.8px", backgroundColor: "black" }}
              className="spanLine"
            ></span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Thanh toán: </h2>
              <Checkbox onChange={onChange} checked={isChecked}>
                Sử dụng điểm thưởng
              </Checkbox>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "150px" }}
            >
              <img
                width={120}
                height={100}
                src="https://vnpay.vn/s1/statics.vnpay.vn/2021/6/05g0ytd7dxcs1624443633411.png"
                alt=""
              />
              <p>Ví VNPAY</p>
            </div>
          </div>
        </div>
        <div className="confirm-button">
          <Button
            onClick={handlePayment}
            style={{ padding: "20px 50px", fontSize: "18px" }}
            type="primary"
            danger
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;
