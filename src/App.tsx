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
        { path: "/ConfirmRegister", element: <ConfirmCode /> },
        { path: "/locationDetails/:id", element: <LocationDetails /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
