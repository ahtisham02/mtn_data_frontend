import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import LandingPage from "../pages/LandingPages/LandingPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import OtpPage from "../pages/AuthPages/OtpPage";
import ForgotPasswordPage from "../pages/AuthPages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage";
import VerifyPage from "../pages/AuthPages/VerifyPage";
import VerifyEmailPage from "../pages/AuthPages/VerifyEmailPage";
import ApiOverviewPage from "../pages/AdminPages/ApiOverviewPage";
import ProfilePage from "../pages/AdminPages/ProfilePage";
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
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>

        <Route
          element={
            <RouteMiddleware isAuthRequired={true}>
              <AdminLayout />
            </RouteMiddleware>
          }
        >
          <Route path="/dashboard" element={<ApiOverviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
