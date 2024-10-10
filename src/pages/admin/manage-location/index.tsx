import {
  Form,
  GetProp,
  Image,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import DashboardTemplate from "../../../components/dashboard_template";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

function ManageLocation() {
  const title = "locatios";
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "PhoneNumber", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Image", dataIndex: "imageUrl", key: "imageUrl" },
  ];
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const formItems = (
    <>
      {/* Name */}
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input />
      </Form.Item>

      {/* Address */}
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter address" }]}
      >
        <Input />
      </Form.Item>

      {/* Phonenumber */}
      <Form.Item
        name="phoneNumber"
        label="PhoneNumber"
        rules={[{ required: true, message: "Please enter phoneNumber" }]}
      >
        <Input />
      </Form.Item>

      {/* ImgeUrl */}
      <Form.Item
        name="imageUrl"
        label="Image"
        rules={[{ required: true, message: "Please enter imageUrl" }]}
      >
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

      {/* Description */}
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate
        title={title}
        columns={columns}
        formItems={formItems}
        apiURI="locations"
      />
    </div>
  );
}

export default ManageLocation;