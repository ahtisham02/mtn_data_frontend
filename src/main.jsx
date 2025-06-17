import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IntercomProvider } from "react-use-intercom";
import "react-toastify/dist/ReactToastify.css";

const intercomAppId = import.meta.env.VITE_INTERCOM_APP_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <IntercomProvider appId={intercomAppId}>
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
  </IntercomProvider>
  // </React.StrictMode>
);
