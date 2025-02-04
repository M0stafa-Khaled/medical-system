import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardLayout, RootLayout } from "@/layout";
import { Login, Register } from "@/pages/auth";
import { Clinics } from "@/pages/dashboard/Clinics";
import NotFound from "@/pages/NotFound";
import UnAuthorized from "@/pages/UnAuthorized";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    {/* Public */}
    <Route path="/" element={<RootLayout />}>
      <Route index element={<>الصفحة الرئيسية</>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    {/* Dashboard */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute requiredRole="admin">
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Clinics />} />
      <Route path="admin" element={<Clinics />} />
    </Route>

    {/* Errors */}
    <Route path="*" element={<NotFound />} />
    <Route path="/unauthorized" element={<UnAuthorized />} />
  </>
);

const router = createBrowserRouter(routes, {
  basename: "/",
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
