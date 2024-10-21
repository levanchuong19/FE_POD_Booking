import { Form, Input, InputNumber } from "antd";
import DashboardTemplate from "../../../components/dashboard_template";

function ManageDevice() {
  const title = "services";
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "UnitPrice", dataIndex: "unitPrice", key: "unitPrice" },
  ];

  const formItems = (
    <>
      {/* Name */}
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the name" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      {/* Description */}
      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      {/* Unit Price */}
      <Form.Item
        name="unitPrice"
        label="Unit Price"
        rules={[{ required: true, message: "Please enter the unit price" }]}
      >
        <InputNumber
          placeholder="Enter unit price"
          min={0}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate
      fileList ={fileList}
        title={title}
        columns={columns}
        formItems={formItems}
        apiURI="services"
      />
    </div>
  );
}

export default ManageDevice;
