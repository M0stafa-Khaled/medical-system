import { ProtectedRoute } from "@/app/ProtectedRoute";
import DashboardLayout from "./layout";
import Dashboard from "./pages/Dashboard";
import { clinicsRoutes } from "./clinics";
import { employeesRoutes } from "./employees";
import { doctorsRoutes } from "./doctors/routes";
import { expensesRoutes } from "./expenses";
import { expensesCategoriesRoutes } from "./expenses-categories";
import { patientsRoutes } from "./patients";
import { bookingRoutes } from "./bookings";
import { treasuriesRoutes } from "./treasuries";
import { dosagesRoutes } from "../dosages";
import { scansRoutes } from "../scans";
import { drugsRoutes } from "../drugs";
import { analysisRoutes } from "../analysis";
import { prescriptionsRoutes } from "./prescriptions";
import { transactionsRoutes } from "./transactions";
import { reportsRoutes } from "./reports/routes";
import { notificationsRoutes } from "../notifications/";
import { settingsRoutes } from "./settings/";
import { dailySummaryRoutes } from "./daily-summary";

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
      ...bookingRoutes,
      ...clinicsRoutes,
      ...doctorsRoutes,
      ...employeesRoutes,
      ...patientsRoutes,
      ...expensesRoutes,
      ...expensesCategoriesRoutes,
      ...treasuriesRoutes,
      ...dosagesRoutes,
      ...transactionsRoutes,
      ...prescriptionsRoutes,
      ...reportsRoutes,
      ...scansRoutes,
      ...drugsRoutes,
      ...analysisRoutes,
      ...settingsRoutes,
      ...dailySummaryRoutes,
      ...notificationsRoutes,
    ],
  },
];
