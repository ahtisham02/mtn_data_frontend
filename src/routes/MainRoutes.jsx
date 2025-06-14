import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPages/LandingPage";

import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import ApiOverviewPage from "../pages/AdminPages/ApiOverviewPage";
import EndpointDetailPage from "../pages/AdminPages/EndpointDetailPage";
import AdminLayout from "./AdminLayout";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/ApiOverview" element={<ApiOverviewPage />} />
          <Route
            path="/endpoint/:endpointName"
            element={<EndpointDetailPage />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
