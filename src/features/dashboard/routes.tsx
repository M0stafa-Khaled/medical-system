import { ProtectedRoute } from "../auth";
import DashboardLayout from "./layout";
import Dashboard from "./pages/Dashboard";
import { clinicsRoutes } from "./clinics";
import { employeesRoutes } from "./employees";
import { doctorsRoutes } from "./doctors/routes";
import { expensesRoutes } from "./expenses";
import { expensesCategoriesRoutes } from "./expenses-categories";

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
      ...clinicsRoutes,
      ...employeesRoutes,
      ...doctorsRoutes,
      ...expensesRoutes,
      ...expensesCategoriesRoutes,
    ],
  },
];
