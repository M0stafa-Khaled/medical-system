import PageLoader from "@/components/shared/PageLoader";
import RootLayout from "@/shared/components/layouts/RootLayout";
import { Suspense } from "react";
import { createRoutesFromElements, Route } from "react-router";
import { ProtectedRoute } from "../auth";
import DashboardLayout from "./layout";
import { Clinics } from "./clinics";
import { PERMISSIONS } from "@/enums/permissions";
import {
  CreateEmployee,
  EmployeeDetails,
  Employees,
  UpdateEmployee,
} from "./employees";
import Dashboard from "./pages/Dashboard";

export const dashboardRoutes = createRoutesFromElements(
  <Route
    element={<RootLayout />}
    id="dashboard-root"
    // errorElement={<Error />}
  >
    <Route
      path="/dashboard"
      element={
        <Suspense fallback={<PageLoader />}>
          <ProtectedRoute requiredRole={["admin", "employee"]}>
            <DashboardLayout />
          </ProtectedRoute>
        </Suspense>
      }
      id="dashboard-layout"
    >
      {/* Home */}
      <Route
        index
        element={
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        }
        id="dashboard-home"
      />
      {/* Clinics */}
      <Route
        path="clinics"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
              <Clinics />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-clinics"
      />

      {/* Employees */}
      <Route
        path="employees"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES}>
              <Employees />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-employees"
      />
      <Route
        path="employees/:employeeId"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EMPLOYEE}>
              <EmployeeDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-employee-details"
      />
      <Route
        path="employees/create"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.ADD_EMPLOYEE}>
              <CreateEmployee />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-create-employee"
      />
      <Route
        path="employees/:employeeId/update"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_EMPLOYEE}>
              <UpdateEmployee />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-update-employee"
      />
    </Route>
  </Route>
);
