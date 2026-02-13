import { AuthLayout } from "@/features/auth";
import { ForgotPassword, Login, Register, ResetPassword, VerifyAccount } from "@/pages";


import Error from "@/pages/Error";

import { createRoutesFromElements, Route } from "react-router";

const authRoutes = createRoutesFromElements(
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

export default authRoutes;
