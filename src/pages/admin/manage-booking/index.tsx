import { useEffect, useState } from "react";
import { Booking } from "../../../components/modal/booking";
import api from "../../../components/config/api";
import { Table } from "antd";

function ManageBooking() {
  const [booking, setBooking] = useState<Booking[]>();
  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Account ID",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Pod ID",
      dataIndex: "podId",
      key: "podId",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (text) => {
        switch (text) {
          case 0:
            return "Credit Card";
          case 1:
            return "Paypal";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: "Booking Services",
      dataIndex: "bookingServices",
      key: "bookingServices",
      render: (services) =>
        services.map((service) => (
          <div key={service.serviceId}>
            <p>Service ID: {service.serviceId}</p>
            <p>Quantity: {service.quantity}</p>
          </div>
        )),
    },
  ];

  const fetchBooking = async () => {
    try {
      const response = await api.get("bookings");
      console.log(response.data);
      setBooking(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);
  return (
    <div>
      <Table dataSource={booking} columns={columns} />
    </div>
  );
}

export default ManageBooking;
