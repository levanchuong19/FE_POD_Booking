// import React, { useEffect, useState } from "react";
// import CardComponent from "../dashboardCard";
// import AreaChart from "../areaChart";
// import BarChart from "../barChart";
// import { useNavigate } from "react-router-dom";
// import "./index.scss";
// import api from "../config/api";

// const DashboardChard: React.FC = () => {
//   const naviagte = useNavigate();
//   const [isdata, setIsData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await api.get("dashboard/revenue-stats");
//       setIsData(response.data);
//       console.log("data thong ke:", response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="card-container">
//         <CardComponent
//           title="Location"
//           color="#3f51b5"
//           onClick={() => naviagte("/dashboard/locations")}
//         />

//         <CardComponent
//           title="POD"
//           color="#ff9800"
//           onClick={() => naviagte("/dashboard/pods")}
//         />
//         <CardComponent
//           title="Service"
//           color="#4caf50"
//           onClick={() => naviagte("/dashboard/services")}
//         />

//         <CardComponent
//           title="Device"
//           color="#f44336"
//           onClick={() => naviagte("/dashboard/devices")}
//         />
//       </div>

//       <div className="chart-container">
//         <div className="chart">
//           <div className="chart-title">Area Chart Example</div>
//           <AreaChart />
//         </div>
//         <div className="chart">
//           <div className="chart-title">Bar Chart Example</div>
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardChard;
import React, { useEffect, useState } from "react";
import CardComponent from "../dashboardCard";
import AreaChart from "../areaChart";
import BarChart from "../barChart";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import api from "../config/api";
import { User } from "../modal/user";
import { Table } from "antd";

const DashboardChard: React.FC = () => {
  const navigate = useNavigate();
  const [isData, setIsData] = useState<any>(null);
  const [accounts, setAccounts] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await api.get("dashboard/revenue-stats");
      setIsData(response.data);
      console.log("Dữ liệu thống kê:", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isData) {
    return <div>Đang tải dữ liệu...</div>;
  }

  const totalLocations = isData.locationCount;
  const totalPods = isData.podCount;
  const totalServices = isData.deviceCount;
  const totalDevices = isData.deviceCount;

  const areaChartLabels = isData.bestSellingPods.map((pod) => pod.podName);
  const areaChartData = isData.bestSellingPods.map((pod) => pod.revenue);
  const barChartLabels = isData.bestSellingPods.map((pod) => pod.podName);
  const barChartData = isData.bestSellingPods.map((pod) => pod.totalBookings);
  const columns = [
    {
      title: "Account ID",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="card-container">
        <CardComponent
          title={`Location (${totalLocations})`}
          color="#3f51b5"
          onClick={() => navigate("/dashboard/locations")}
        />
        <CardComponent
          title={`POD (${totalPods})`}
          color="#ff9800"
          onClick={() => navigate("/dashboard/pods")}
        />
        <CardComponent
          title={`Service (${totalServices})`}
          color="#4caf50"
          onClick={() => navigate("/dashboard/services")}
        />
        <CardComponent
          title={`Device (${totalDevices})`}
          color="#f44336"
          onClick={() => navigate("/dashboard/devices")}
        />
      </div>

      <div className="chart-container">
        <div className="chart">
          <div className="chart-title">Biểu đồ Area</div>
          <AreaChart labels={areaChartLabels} data={areaChartData} />
        </div>
        <div className="chart">
          <div className="chart-title">Biểu đồ Bar</div>
          <BarChart labels={barChartLabels} data={barChartData} />
        </div>
      </div>
      <div className="table-container">
        <h2>Tất cả tài khoản</h2>
        <Table dataSource={accounts} columns={columns} rowKey="accountId" />
      </div>
    </div>
  );
};

export default DashboardChard;
