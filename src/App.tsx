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
<<<<<<< HEAD
import Booking from "./pages/booking";
=======
import ForgotPassword from "./components/Forgot_Password";
import ResetPassword from "./components/reset_Password";
import Dashboard from "./components/dashboard";
import ManageLocation from "./pages/admin/manage-location";
import ManagePod from "./pages/admin/manage-pod";
import ManageService from "./pages/admin/manage-service";
>>>>>>> fearture/nam

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/reservation", element: <Reservation numberOfSlides={4}/> },
        { path: "/menu", element: <Menu /> },
        { path: "/device", element: <Device /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/Forgot_Password", element: <ForgotPassword /> },
        { path: "/reset_Password/:id", element: <ResetPassword /> },
        { path: "/ConfirmRegister", element: <ConfirmCode /> },
        { path: "/locationDetails/:id", element: <LocationDetails /> },
        { path: "/booking/:id", element: <Booking/> },
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
