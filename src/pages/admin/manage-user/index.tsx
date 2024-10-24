import { DatePicker, Form, Input, Select } from "antd";
import DashboardTemplate, {
  Column,
} from "../../../components/dashboard_template";

import dayjs from "dayjs";

function ManageDevice() {
  const title = "accounts";
  const columns: Column[] = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "FirstName", dataIndex: "firstName", key: "firstName" },
    { title: "LastName", dataIndex: "lastName", key: "lastName" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "DateOfBirthday",
      dataIndex: "dateOfBirthday",
      key: "dateOfBirthday",
      render: (dateOfBirth) => {
        return dayjs(dateOfBirth).format("DD/MM/YYYY");
      },
    },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "PhoneNumber", dataIndex: "phoneNumber", key: "phoneNumber" },
  ];

  const formItems = (
    <>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input placeholder="Enter your first name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input placeholder="Enter your last name" />
      </Form.Item>

      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={0}>Male</Select.Option>
          <Select.Option value={1}>Female</Select.Option>
          <Select.Option value={2}>Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirthday"
        rules={[
          { required: true, message: "Please select your date of birth!" },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input placeholder="Enter your address" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email!",
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="PhoneNumber"
        name="phoneNumber"
        rules={[{ required: true, message: "Please enter your phone number!" }]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      <Form.Item name="image" label="Image">
        <Upload
          action="http://localhost:5088/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate
        title={title}
        columns={columns}
        formItems={formItems}
        apiURI="accounts"
      />
    </div>
  );
}

export default ManageDevice;
