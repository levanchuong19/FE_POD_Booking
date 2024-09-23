
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/features/store.ts";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
  <ToastContainer />
</React.StrictMode>,
);
