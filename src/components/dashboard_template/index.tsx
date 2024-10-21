import { Button, Form, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../config/api";
import moment from "moment";

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any) => any;
}

interface DashboardTemplateProps {
  title: string;
  columns: Column[];
  apiURI: string;
  formItems: React.ReactElement;
}

function DashboardTemplate({
  columns,
  formItems,
  apiURI,
  title,
}: DashboardTemplateProps) {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  //GET
  const fetchData = async () => {
    try {
      const response = await api.get(apiURI);
      setDatas(response.data);
      setFetching(false);
    } catch (error) {
      toast.error(`Error fetching ${title}`);
    }
  };

  //CREATE OR UPDATE
  const handleSubmit = async (values) => {
    const dateFormatted = moment(values.dateOfBirthday.$d).format("DD-MM-YYYY");
    values.dateOfBirthday = dateFormatted;
    try {
      setLoading(true);

      if (values.id) {
        console.log(values.id);

        await api.put(`${apiURI}/${values.id}`, values);
        toast.success("Update successfully");
      } else {
        await api.post(apiURI, values);
      }
      toast.success("Successfully!!!");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  //DELETE
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${apiURI}/${id}`);
      toast.success("Success deleted!!!");
      fetchData();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const tableColumn = [
    ...columns,
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <div style={{ gap: "" }}>
          <Button
            type="primary"
            onClick={() => {
              const recordValiDate = {
                ...record,
                dateOfBirthday: record.dateOfBirth
                  ? moment(record.dateOfBirth, "DD-MM-YYYY")
                  : null,
              };
              form.setFieldsValue(recordValiDate);
              setShowModal(true);
              // form.resetFields();
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          form.resetFields();
          setShowModal(true);
        }}
        type="primary"
      >
        Create new {title}
      </Button>
      <Table loading={fetching} dataSource={datas} columns={tableColumn} />
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" label="id" hidden></Form.Item>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default DashboardTemplate;
