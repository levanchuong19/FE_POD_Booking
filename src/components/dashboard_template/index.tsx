/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../config/api";
import dayjs from "dayjs";
import uploadFile from "../../utils/upload";
import { jwtDecode } from "jwt-decode";
import { Booking } from "../modal/booking";
import { POD } from "../modal/pod";

export interface Column {
  title: string;
  dataIndex: string;
  key: string;

  render?: (text: any, record: any, index: number) => any;
}

interface JwtPayload {
  userId: any;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

interface DashboardTemplateProps {
  title: string;
  columns: Column[];
  apiURI: string;
  formItems: React.ReactElement;
  fileList: any;
  data: any[];
  isCustom?: boolean;
}

function DashboardTemplate({
  columns,
  formItems,
  apiURI,
  title,
  fileList,
  isCustom = false,
  data,
}: DashboardTemplateProps) {
  const [datas, setDatas] = useState(data || []);
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await api.get("bookings"); // Gọi API lấy bookings
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings!");
    }
  };

  // Gọi hàm fetchBookings khi component được render
  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (data) {
      setDatas(data);
    }
  }, [data]);
  //GET
  const fetchData = async () => {
    try {
      const response = await api.get(apiURI);
      console.log(response.data);
      setDatas(response.data);
      setFetching(false);
    } catch (error) {
      toast.error(`Error fetching ${title}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //CREATE OR UPDATE
  const handleSubmit = async (values: {
    image: string;
    role: number | string;
    gender: number | string;
    imageUrl: string;
    dateOfBirth: dayjs.Dayjs | string;
    id: any;
  }) => {
    if (fileList && fileList.length > 0) {
      try {
        console.log(fileList[0].originFileObj);
        const img = await uploadFile(fileList[0].originFileObj);
        console.log(img);
        values.image = img;
        values.imageUrl = img;
      } catch (error) {
        toast.error("Image upload failed!");
        return;
      }
    }

    if (values.dateOfBirth) {
      const dateFormatted = dayjs(values.dateOfBirth).toISOString();
      values.dateOfBirth = dateFormatted;
    }

    try {
      console.log("Submitting form...", values);
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const decodedToken: JwtPayload = jwtDecode(token || "");
      const userRole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      console.log("role", userRole);
      if (userRole === "Staff" || userRole === "Manager") {
        const originalRecord = datas.find((item) => item.id === values.id);
        if (originalRecord) {
          values.role = originalRecord.role;
        }
      }
      if (values.role === "Customer") {
        values.role = 3;
      }
      if (values.role === "Manager") {
        values.role = 1;
      }
      if (values.role === "Staff") {
        values.role = 2;
      }
      if (values.gender === "Male") {
        values.gender = 1;
      }
      if (values.gender === "Female") {
        values.role = 2;
      }
      if (values.role === "Unknown") {
        values.role = 0;
      }
      console.log(values);
      if (values.id) {
        if (!isCustom) {
          console.log("Updating item with ID:", values.id);
          await api.put(`${apiURI}/${values.id}`, values);
          toast.success("Update successfully");
        } else {
          // doi api di
          await api.put(`${apiURI}/${values.id}/restore`, values);
          toast.success("Update successfully");
        }
      } else {
        console.log("Creating new item");
        await api.post(apiURI, values);
        toast.success("Successfully created!");
      }

      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  //DELETE
  // const handleDelete = async (id: string) => {
  //   try {
  //     await api.delete(`${apiURI}/${id}`);
  //     toast.success("Success deleted!!!");
  //     fetchData();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("delete error");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleDelete = async (
  //   id: string,
  //   type: "pods" | "accounts" | "services" | "locations" | "ratings"
  // ) => {
  //   try {
  //     const restrictedStatuses = ["Pending", "OnGoing", "UpComing"];

  //     // Hàm kiểm tra bookings liên quan
  //     const hasRelatedBookings = (type: string, id: string) => {
  //       return bookings.some((booking: Booking) =>
  //         type === "pods"
  //           ? booking.podId === id &&
  //             restrictedStatuses.includes(booking.paymentStatus)
  //           : booking.accountId === id &&
  //             restrictedStatuses.includes(booking.paymentStatus)
  //       );
  //     };

  //     // Kiểm tra nếu type là "pods" hoặc "accounts"
  //     if (type === "pods" || type === "accounts") {
  //       if (hasRelatedBookings(type, id)) {
  //         toast.error("Đang tồn tại booking. Vui lòng thử lại sau!");
  //         return;
  //       }
  //     }

  //     // Nếu type không phải "pods" hoặc "accounts", hoặc không liên quan bookings => xóa
  //     await api.delete(`${apiURI}/${id}`);
  //     toast.success("Successfully deleted!");
  //     fetchData(); // Làm mới dữ liệu
  //   } catch (error) {
  //     console.error("Error during deletion:", error);
  //     toast.error("An error occurred during deletion.");
  //   }
  // };

  const handleDelete = async (
    id: string,
    type: "pods" | "accounts" | "services" | "locations" | "ratings"
  ) => {
    try {
      const restrictedStatuses = ["Pending", "OnGoing", "UpComing"];

      // Hàm kiểm tra bookings liên quan
      const hasRelatedBookings = (type: string, id: string) => {
        return bookings.some((booking: Booking) =>
          type === "pods"
            ? booking.podId === id &&
              ["Pending", "OnGoing", "UpComing"].includes(booking.paymentStatus)
            : type === "accounts"
            ? booking.accountId === id &&
              ["Pending", "OnGoing", "UpComing"].includes(booking.paymentStatus)
            : false
        );
      };

      // Kiểm tra nếu type là "pods" hoặc "accounts"
      if (type === "pods" || type === "accounts") {
        if (hasRelatedBookings(type, id)) {
          toast.error("Đang tồn tại booking. Vui lòng thử lại sau!");
          return;
        }
      }

      // Nếu type không phải "pods" hoặc "accounts", hoặc không liên quan bookings => xóa
      await api.delete(`${apiURI}/${id}`);
      toast.success("Successfully deleted!");
      fetchData(); // Làm mới dữ liệu
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("An error occurred during deletion.");
    }
  };

  const tableColumn = [
    ...columns,
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (
        id: string,
        record: {
          podId: string;
          dateOfBirth: dayjs.Dayjs | string;
          id: string;
          role: string;
        }
      ) => (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Button
              type="primary"
              onClick={() => {
                const recordValiDate = {
                  ...record,
                  dateOfBirth: record.dateOfBirth
                    ? dayjs(record.dateOfBirth, "YYYY-MM-DD ")
                    : null,
                  role: record.role,
                };
                console.log("record", recordValiDate);
                form.setFieldsValue(recordValiDate);
                setShowModal(true);
              }}
            >
              Update
            </Button>
            <Popconfirm
              title="Delete"
              description="Do you want to delete?"
              onConfirm={() => {
                // Tìm kiếm booking có podId hoặc accountId khớp với id
                const booking = bookings.find(
                  (booking) => booking.podId === id || booking.accountId === id
                );

                if (booking) {
                  // Kiểm tra loại bản ghi (pod hay account)
                  if (booking.accountId === id) {
                    // Nếu là accountId, kiểm tra nếu account này đang bị liên kết với bất kỳ booking nào
                    const isAccountLinked = bookings.some(
                      (b) => b.accountId === id && b.podId !== undefined
                    );
                    if (isAccountLinked) {
                      // Nếu account vẫn còn liên kết với pod, không thể xóa account
                      console.log(
                        "Account is still linked with a booking. Cannot delete."
                      );
                      toast.error(
                        "Tài khoản đang tồn tại booking. Vui lòng thử lại sau!."
                      );
                    } else {
                      // Nếu account không còn liên kết với booking nào, có thể xóa
                      console.log("Deleting account with ID:", id);
                      handleDelete(id, "accounts");
                    }
                  } else if (booking.podId === id) {
                    // Nếu là podId, xóa pod
                    console.log("Deleting pod with ID:", id);
                    handleDelete(id, "pods");
                  }
                } else {
                  // Nếu không tìm thấy booking khớp, xóa trực tiếp
                  console.log(
                    "No matching record found, proceeding with direct delete."
                  );
                  handleDelete(id, "direct");
                }
              }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </>
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
