import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/layout";
import Home from "./pages/home";
import Reservation from "./pages/reservation";
import Menu from "./pages/menu";
import Device from "./pages/device";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {path:"/",
          element:<Home/>
        },
        {path:"/reservation",
          element:<Reservation/>
        },
        {path:"/menu",
          element:<Menu/>
        },
        {path:"/device",
          element:<Device/>
        },
      ]
    },
  ]);
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
  )
}

export default App