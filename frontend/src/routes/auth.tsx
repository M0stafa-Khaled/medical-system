import Error from "@/pages/Error";
import { lazy } from "react";

const AuthLayout = lazy(() => import("@/layout/AuthLayout"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

import { createRoutesFromElements, Route } from "react-router-dom";

const authRoutes = createRoutesFromElements(
  <>
    <Route
      path="/verify-account"
      element={<VerifyEmail />}
      id="verify-account"
      errorElement={<Error />}
    />

    <Route element={<AuthLayout />} id="auth-layout" errorElement={<Error />}>
      <Route path="/login" element={<Login />} id="login" />
      <Route path="/register" element={<Register />} id="register" />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
        id="forgot-password"
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
        id="reset-password"
      />
    </Route>
  </>
);

export default authRoutes;
