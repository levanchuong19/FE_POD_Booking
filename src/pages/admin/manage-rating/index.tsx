import { useEffect, useState } from "react";
import { RATING } from "../../../components/modal/rating";
import api from "../../../components/config/api";
import { Table } from "antd";

function ManageRating() {
  const [rating, setRating] = useState<RATING[]>();

  const columns = [
    {
      title: "POD ID",
      dataIndex: "podId",
      key: "podId",
    },
    {
      title: "Rating Value",
      dataIndex: "ratingValue",
      key: "ratingValue",
      render: (value) => value || "N/A", // Show "N/A" if rating is 0
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
  ];

  const fetchRating = async () => {
    try {
      const response = await api.get("ratings");
      console.log(response.data);
      setRating(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRating();
  }, []);
  return (
    <div>
      <Table dataSource={rating} columns={columns} />
    </div>
  );
}

export default ManageRating;
