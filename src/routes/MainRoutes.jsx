import React from "react";
import { Routes, Route, Outlet } from "react-router-dom"; 

import LandingPage from "../pages/LandingPages/LandingPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import ApiOverviewPage from "../pages/AdminPages/ApiOverviewPage";
import EndpointDetailPage from "../pages/AdminPages/EndpointDetailPage";
import AdminLayout from "./AdminLayout";
import RouteMiddleware from "../routes/RouteMIddleware";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          element={
            <RouteMiddleware isGuestOnly={true}>
              <Outlet />
            </RouteMiddleware>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route
          element={
            <RouteMiddleware isAuthRequired={true}>
              <AdminLayout />
            </RouteMiddleware>
          }
        >
          <Route path="/dashboard" element={<ApiOverviewPage />} />
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