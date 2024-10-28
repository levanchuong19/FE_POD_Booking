import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../components/config/api";
import { jwtDecode } from "jwt-decode";
import { User } from "../../components/modal/user";
import "./profile.scss";

function Profile() {
  const [profile, setProfile] = useState<User>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await api.get(`accounts/${userId}`);
        setProfile(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch user data.");
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  function handleUpdateClick() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      navigate(`/userProfile/${userId}`);
    }
  }
  return (
    <div>
      <div className="show-profile-container">
        <h1>User Profile Details</h1>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          profile && (
            <div className="profile-card">
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>First Name:</strong> {profile.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {profile.lastName}
              </p>
              <p>
                <strong>User Name:</strong>
                {profile.firstName + profile.lastName}
              </p>
              <p>
                <strong>Phone Number:</strong> {profile.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>

              <Button type="primary" onClick={handleUpdateClick}>
                Update Profile
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Profile;
