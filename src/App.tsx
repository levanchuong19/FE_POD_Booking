import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ]);
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  )
}

export default App