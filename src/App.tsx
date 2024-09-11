import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
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