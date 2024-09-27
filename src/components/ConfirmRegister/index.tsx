import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/api";
import AuthenLayout from "../../components/auth-layout";

function ConfirmCode() {
  const navigate = useNavigate();

  const handleConfirmCode = async (values) => {
    try {
      const response = await api.get("authentication/email/verify", values); // API xác thực OTP
      toast.success("Xác thực thành công!");

      navigate("/login"); // Điều hướng đến trang login
    } catch (error) {
      console.log(error);
      toast.error("Xác thực thất bại, vui lòng thử lại.");
    }
  };

  return (
    <AuthenLayout>
      <Form labelCol={{ span: 24 }} onFinish={handleConfirmCode}>
        <Form.Item
          label="Mã xác nhận"
          name="code"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã xác nhận!",
            },
          ]}
        >
          <Input placeholder="Nhập mã xác nhận từ email" />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Confirm
        </Button>
      </Form>
    </AuthenLayout>
  );
}

export default ConfirmCode;
