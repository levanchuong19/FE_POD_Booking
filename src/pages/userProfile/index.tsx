// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from "react";
// import { Button, Form, message } from "antd";
// import { useNavigate } from "react-router-dom";
// import api from "../../components/config/api";
// import { jwtDecode } from "jwt-decode";
// import { User } from "../../components/modal/user";
// import { toast } from "react-toastify";

// interface JwtPayload {
//   userId: any;
// }

// function UserProfile() {
//   const [form] = Form.useForm();
//   const [profile, setProfile] = useState<User>();
//   const [showProfile, setShowProfile] = useState<User>();

//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     const token = localStorage.getItem("accessToken");
//     console.log(token);
//     if (token) {
//       try {
//         const decodedToken: JwtPayload = jwtDecode(token);
//         const userId = decodedToken.userId;
//         console.log(userId);
//         const response = await api.get(`accounts/${userId}`);
//         console.log(response.data.data);
//         setProfile(response.data.data);
//         setShowProfile(response.data.data);
//         form.setFieldsValue(response.data);
//       } catch (error) {
//         console.error("Failed to fetch user data or decode token:", error);
//         message.error("Failed to load user data.");
//       }
//     } else {
//       navigate("/login");
//     }
//   };
//   useEffect(() => {
//     fetchUserData();
//   }, [form, navigate]);

//   const handleUpdateProfile = async (values: any) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         const decodedToken: JwtPayload = jwtDecode(token);
//         const userId = decodedToken.userId;
//         await api.put(`/accounts/${userId}`, values);
//         setProfile(values);
//         message.success("Profile updated successfully!");
//       } else {
//         message.error("No access token found.");
//       }
//     } catch (error) {
//       message.error("Failed to update profile.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     toast.success("Đăng xuất tài khoản thành công");
//     navigate("/");
//   };

//   return (
//     <div className="user-profile-container">
//       <h2>User Profile</h2>

//       <div>
//         <p>{showProfile?.firstName}</p>
//         <p>{showProfile?.lastName}</p>
//         <p>{showProfile?.gender}</p>

//         <p>{showProfile?.address}</p>
//         <p>{showProfile?.email}</p>
//         <p>{showProfile?.phone}</p>
//         <p>
//           <img src={showProfile?.image} alt="" />
//         </p>
//       </div>

//       {/* <Form
//         form={form}
//         layout="vertical"
//         initialValues={profile}
//         onFinish={handleUpdateProfile}
//         className="user-profile-form"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[{ required: true, message: "Please enter your username" }]}
//         >
//           <Input placeholder="Enter your username" />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please enter your email" },
//             { type: "email", message: "Please enter a valid email" },
//           ]}
//         >
//           <Input placeholder="Enter your email" />
//         </Form.Item>

//         <Form.Item
//           label="First Name"
//           name="firstName"
//           rules={[{ required: true, message: "Please enter your first name" }]}
//         >
//           <Input placeholder="Enter your first name" />
//         </Form.Item>

//         <Form.Item
//           label="Last Name"
//           name="lastName"
//           rules={[{ required: true, message: "Please enter your last name" }]}
//         >
//           <Input placeholder="Enter your last name" />
//         </Form.Item>

//         <Form.Item
//           label="Phone Number"
//           name="phoneNumber"
//           rules={[
//             { required: true, message: "Please enter your phone number" },
//           ]}
//         >
//           <Input placeholder="Enter your phone number" />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: true, message: "Please enter your address" }]}
//         >
//           <Input placeholder="Enter your address" />
//         </Form.Item>

//         <Button type="primary" htmlType="submit">
//           Update Profile
//         </Button>
//       </Form> */}

//       <Button type="default" onClick={handleLogout} className="logout-button">
//         Logout
//       </Button>
//     </div>
//   );
// }

// export default UserProfile;
import { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/api";
import { jwtDecode } from "jwt-decode";
import { User } from "../../components/modal/user";
import { toast } from "react-toastify";
import "./index.scss";

function UserProfile() {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState<User>();
  // const [showProfile, setShowProfile] = useState<User>();

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log(userId);
        const response = await api.get(`accounts/${userId}`);
        console.log(response.data.data);
        setProfile(response.data.data);
        // setShowProfile(response.data.data);
        form.setFieldsValue(response.data.data);
      } catch (error) {
        toast.error(error);
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [form, navigate]);

  const handleUpdateProfile = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        await api.put(`accounts/${userId}`, values);
        setProfile(values);
        message.success("Profile updated successfully!");
      } else {
        message.error("No access token found.");
      }
    } catch (error) {
      message.error("Failed to update profile.");
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      <div className="image">
        <div className="image_wrapper">
          <img
            src={profile?.image ? profile.image : "/path/to/default/image.jpg"}
            alt="User profile"
          />
        </div>
      </div>

      <div className="user-name">
        {profile?.firstName && profile?.lastName ? (
          <h3>{`${profile.firstName} ${profile.lastName}`}</h3>
        ) : (
          <h3>Username not available</h3>
        )}
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={profile}
        onFinish={handleUpdateProfile}
        className="user-profile-form"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}

export default UserProfile;
