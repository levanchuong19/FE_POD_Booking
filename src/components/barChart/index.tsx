// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const BarChart: React.FC = () => {
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         label: "Bar Chart Example",
//         data: [5000, 10000, 8000, 12000, 14000, 15000],
//         backgroundColor: "rgba(75,192,192,1)",
//       },
//     ],
//   };

//   return <Bar data={data} />;
// };

// export default BarChart;
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Số lượng đặt POD",
        data,
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
