import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> 
    <BrowserRouter>
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-[9999]" 
      />
    </BrowserRouter>
  // </React.StrictMode> 
);