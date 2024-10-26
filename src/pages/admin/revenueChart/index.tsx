import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const RevenueChart: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("dashboard/revenue-stats");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.bestSellingPods.map((pod: any) => pod.podName),
    datasets: [
      {
        label: "Doanh thu",
        data: data.bestSellingPods.map((pod: any) => pod.revenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Thống kê doanh thu</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default RevenueChart;
