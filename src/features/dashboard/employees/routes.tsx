import { ProtectedRoute } from "@/features/auth";
import Employees from "./pages/Employees";
import { PERMISSIONS } from "@/enums/permissions";
import EmployeeDetails from "./pages/EmployeeDetails";
import UpdateEmployee from "./pages/UpdateEmployee";
import CreateEmployee from "./pages/CreateEmployee";

export const employeesRoutes = [
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
    path: "employees/:employeeId/update",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_EMPLOYEE}>
        <UpdateEmployee />
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
];
