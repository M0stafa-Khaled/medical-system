import { AuthLayout } from "@/layout";
import { Login, Register, VerifyEmail } from "@/pages/auth";
import { createRoutesFromElements, Route } from "react-router-dom";

const authRoutes = createRoutesFromElements(
  <>
    <Route path="/verify-email" element={<VerifyEmail />} id="verify-email" />
    <Route element={<AuthLayout />} id="auth-layout">
      <Route path="/login" element={<Login />} id="login" />
      <Route path="/register" element={<Register />} id="register" />
    </Route>
  </>
);

export default authRoutes;
