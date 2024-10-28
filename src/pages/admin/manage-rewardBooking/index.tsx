import { useEffect, useState } from "react";
import { RewardPoint } from "../../../components/modal/rewardPoint";
import api from "../../../components/config/api";
import { Table } from "antd";

function ManageRewardPoint() {
  const [point, setPoint] = useState<RewardPoint[]>();
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
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "TransactionDate",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CreationDate",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];
  const fetchRewardPoint = async () => {
    try {
      const response = await api.get("rewardpoints");
      console.log(response.data);
      setPoint(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRewardPoint();
  }, []);
  return (
    <div>
      <Table dataSource={point} columns={columns} />
    </div>
  );
}

export default ManageRewardPoint;
