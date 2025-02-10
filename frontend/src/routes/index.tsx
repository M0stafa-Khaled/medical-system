import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardLayout, RootLayout } from "@/layout";
import { Login, Register } from "@/pages/auth";
import NotFound from "@/pages/NotFound";
import UnAuthorized from "@/pages/UnAuthorized";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AddDoctor, Clinics, Doctors, UpdateDoctor } from "@/pages/dashboard";

const routes = createRoutesFromElements(
  <>
    {/* Public */}
    <Route element={<RootLayout />}>
      <Route path="/" element={<>الصفحة الرئيسية</>} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Dashboard */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute requiredRole={["admin"]}>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route
        index
        element={<h1 className="text-primary">الصفحة الرئيسية</h1>}
      />
      <Route path="clinics" element={<Clinics />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="doctors/add" element={<AddDoctor />} />
      <Route path="doctors/update/:id" element={<UpdateDoctor />} />
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
