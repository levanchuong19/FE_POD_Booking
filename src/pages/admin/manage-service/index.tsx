import { Form, Input, InputNumber } from "antd";
import DashboardTemplate, {
  Column,
} from "../../../components/dashboard_template";

function ManageService() {
  const columns: Column[] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "UnitPrice", dataIndex: "unitPrice", key: "unitPrice" },
  ];

  const formItems = (
    <>
      <Form.Item name="id">
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please enter Name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item
        name="unitPrice"
        label="UnitPrice"
        rules={[
          {
            required: true,
            message: "Please enter UnitPrice",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate
        title="title"
        columns={columns}
        formItems={formItems}
        apiURI="services"
      />
    </div>
  );
}

export default ManageService;
