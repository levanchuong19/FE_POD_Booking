import { Form, Input } from "antd";
import DashboardTemplate from "../../../components/dashboard_template";

function ManageDevice() {
  const title = "devices";
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Image", dataIndex: "imageUrl", key: "imageUrl" },
  ];

  const formItems = (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter address" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="imageUrl"
        label="Image"
        rules={[{ required: true, message: "Please enter imageUrl" }]}
      >
        <Input />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate
        title={title}
        columns={columns}
        formItems={formItems}
        apiURI="devices"
      />
    </div>
  );
}

export default ManageDevice;
