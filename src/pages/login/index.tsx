import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/api";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import AuthenLayout from "../../components/auth-layout";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, Ggprovider } from "../../components/config/firebase";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginGoogle = () => {
    signInWithPopup(auth, Ggprovider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("authentication/login", values);
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      toast.success("Login success!");

      navigate("/");
      if (role === "ADMIN") {
        navigate("/dashboard");
      }
      // lưu trữ thông tin của user
      // dispatch action
      dispatch(login(response.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "165px",
      }}
    >
      <AuthenLayout>
        <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
          <FormItem
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter Email",
              },
            ]}
          >
            <Input placeholder="Email" />
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

          <Button
            onClick={handleLoginGoogle}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
              border: "1px solid #4285F4",
              color: "#4285F4",
              backgroundColor: "#fff",
              padding: "10px 0",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
              width={25}
              alt=""
            />
            <span>Login with Google</span>
          </Button>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ fontSize: "16px", color: "#888" }}>
              Do you have an account yet?
            </span>
            <Button
              type="default"
              style={{
                width: "100%",
                marginTop: "10px",
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
              onClick={handleRegisterRedirect}
            >
              Register
            </Button>
          </div>
        </Form>
      </AuthenLayout>
    </div>
  );
}

export default Login;
