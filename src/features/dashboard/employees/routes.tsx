import { ProtectedRoute } from "@/features/auth";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const Employees = lazy(() => import("./pages/Employees"));
const EmployeeDetails = lazy(() => import("./pages/EmployeeDetails"));
const CreateEmployee = lazy(() => import("./pages/CreateEmployee"));
const UpdateEmployee = lazy(() => import("./pages/UpdateEmployee"));

export const employeesRoutes = [
  {
    path: "employees",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES}>
          <Employees />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "employees/:employeeId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EMPLOYEE}>
          <EmployeeDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "employees/:employeeId/update",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_EMPLOYEE}>
          <UpdateEmployee />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "employees/create",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.ADD_EMPLOYEE}>
          <CreateEmployee />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
