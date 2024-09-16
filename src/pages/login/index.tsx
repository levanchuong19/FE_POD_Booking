import { Button, Col, Form, Image, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/api";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await api.post("podbooking", values);
      toast.success("Login success");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <div
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Row align={"middle"} gutter={30} style={{ padding: "10px" }}>
        <Col span={12}>
          <Image src="https://workflow.com.vn/wp-content/uploads/2023/01/single_pod.jpg" />
        </Col>
        <Col span={12}>
          <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
            <FormItem
              label="Phonenumber"
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: "Please enter phone number",
                },
              ]}
            >
              <Input placeholder="Phone number" />
            </FormItem>
            <FormItem
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </FormItem>

            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
