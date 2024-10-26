// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// const AreaChart: React.FC = () => {
//   const data = {
//     labels: ["Mar 1", "Mar 3", "Mar 5", "Mar 7", "Mar 9", "Mar 11", "Mar 13"],
//     datasets: [
//       {
//         label: "Area Chart Example",
//         data: [15000, 20000, 18000, 23000, 25000, 30000, 38000],
//         fill: true,
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//       },
//     ],
//   };

//   return <Line data={data} />;
// };

// export default AreaChart;
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface AreaChartProps {
  labels: string[];
  data: number[];
}

const AreaChart: React.FC<AreaChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Doanh thu theo POD",
        data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default AreaChart;
