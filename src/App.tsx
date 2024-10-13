import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout";
import Home from "./pages/home";
import Reservation from "./pages/reservation";
import Menu from "./pages/menu";
import Device from "./pages/device";
import Login from "./pages/login";
import LocationDetails from "./pages/locationDetails";
import Register from "./pages/register";
import ConfirmCode from "./components/ConfirmRegister";
import Bookings from "./pages/booking";
import ForgotPassword from "./components/Forgot_Password";
import ResetPassword from "./components/reset_Password";
import Dashboard from "./components/dashboard";
import ManageLocation from "./pages/admin/manage-location";
import ManagePod from "./pages/admin/manage-pod";
import ManageService from "./pages/admin/manage-service";
import Profile from "./pages/profile/inde";
import ManageDevice from "./pages/admin/manage-device";
import ManageUser from "./pages/admin/manage-user";
import UserProfile from "./pages/userProfile";
import ConfirmBooking from "./pages/confirmBooking";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/reservation", element: <Reservation numberOfSlides={4} /> },
        { path: "/menu", element: <Menu /> },
        { path: "/device", element: <Device /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/Forgot_Password", element: <ForgotPassword /> },
        { path: "/reset_Password", element: <ResetPassword /> },
        { path: "/reset_Password", element: <ResetPassword /> },
        { path: "/ConfirmRegister", element: <ConfirmCode /> },
        { path: "/userProfile/:id", element: <UserProfile /> },
        { path: "/locationDetails/:id", element: <LocationDetails /> },
        { path: "/booking/:id", element: <Bookings /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/confirmBooking/:id", element: <ConfirmBooking/> },
      ],
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "locations",
          element: <ManageLocation />,
        },
        {
          path: "pods",
          element: <ManagePod />,
        },
        {
          path: "services",
          element: <ManageService />,
        },
        {
          path: "devices",
          element: <ManageDevice />,
        },
        {
          path: "accounts",
          element: <ManageUser />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
