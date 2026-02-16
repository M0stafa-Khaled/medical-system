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
import { doctorsRoutes } from "./doctors/routes";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole={["admin", "employee"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "clinics",
        element: (
          <ProtectedRoute requiredPermission={PERMISSIONS.CLINICS}>
            <Clinics />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES}>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/:employeeId",
        element: (
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EMPLOYEE}>
            <EmployeeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/create",
        element: (
          <ProtectedRoute requiredPermission={PERMISSIONS.ADD_EMPLOYEE}>
            <CreateEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/:employeeId/update",
        element: (
          <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_EMPLOYEE}>
            <UpdateEmployee />
          </ProtectedRoute>
        ),
      },
      ...doctorsRoutes,
    ],
  },
];
