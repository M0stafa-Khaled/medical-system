import Error from "@/pages/Error";
import { createRoutesFromElements, Route } from "react-router";
import { lazy } from "react";

import AuthLayout from "./layout";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount"));

export const authRoutes = createRoutesFromElements(
  <>
    <Route
      path="/verify-account"
      element={<VerifyAccount />}
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
