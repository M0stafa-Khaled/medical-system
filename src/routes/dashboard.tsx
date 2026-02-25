import { createRoutesFromElements, Route } from "react-router";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import DashboardLayout from "@/features/dashboard/layout";
// import Error from "@/pages/Error";

const RootLayout = lazy(() => import("@/shared/components/layouts/RootLayout"));

// Transactions
const Transactions = lazy(
  () => import("@/features/dashboard/transactions/pages/Transactions")
);
const TransactionDetails = lazy(
  () => import("@/features/dashboard/transactions/pages/TransactionDetails")
);
const LastVisits = lazy(
  () => import("@/features/dashboard/transactions/pages/LastVisits")
);

// Company
const Settings = lazy(() => import("@/pages/dashboard/settings"));

// Reports
const BookingsReports = lazy(
  () => import("@/features/dashboard/reports/pages/BookingsReports")
);
const ExpensesReports = lazy(
  () => import("@/features/dashboard/reports/pages/ExpensesReports")
);
const TransactionsReports = lazy(
  () => import("@/features/dashboard/reports/pages/TransactionsReports")
);
const PrescriptionsReports = lazy(
  () => import("@/pages/dashboard/reports/prescriptionsReports")
);
const PatientsReports = lazy(
  () => import("@/features/dashboard/reports/pages/PatientsReports")
);
const PatientBalancesReports = lazy(
  () => import("@/pages/dashboard/reports/patientBalancesReports")
);
const TransfersReports = lazy(
  () => import("@/features/dashboard/reports/pages/TransfersReports")
);
const TreasuriesReports = lazy(
  () => import("@/features/dashboard/reports/pages/TreasuriesReports")
);

const dashboardRoutes = createRoutesFromElements(
  <Route
    element={<RootLayout />}
    id="dashboard-root"
    // errorElement={<Error />}
  >
    {/* Dashboard */}
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
      {/* Company */}
      <Route
        path="settings"
        element={
          <Suspense fallback={<PageLoader />}>
            <Settings />
          </Suspense>
        }
        id="settings"
      />

      {/* Transactions */}
      <Route
        path="transactions"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TRANSACTIONS}>
              <Transactions />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transactions"
      />
      <Route
        path="transactions/:transactionId"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TRANSACTION}>
              <TransactionDetails />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transaction-details"
      />
      <Route
        path="last-visits/:patientId/transactions/:doctorId"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.LAST_PATIENT_TRANSACTIONS}
            >
              <LastVisits />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-last-visits"
      />

      {/* Reports */}
      <Route
        path="reports/bookings"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS_REPORTS}>
              <BookingsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-bookings-reports"
      />
      <Route
        path="reports/expenses"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES_REPORTS}>
              <ExpensesReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-expenses-reports"
      />
      <Route
        path="reports/patients"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS_REPORTS}>
              <PatientsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-patients-reports"
      />
      <Route
        path="reports/patient-balances"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.PATIENT_BALANCES_REPORTS}
            >
              <PatientBalancesReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-patient-balances-reports"
      />
      <Route
        path="reports/prescriptions"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.PRESCRIPTIONS_REPORTS}
            >
              <PrescriptionsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-prescriptions-reports"
      />
      <Route
        path="reports/transactions"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              requiredPermission={PERMISSIONS.TRANSACTIONS_REPORTS}
            >
              <TransactionsReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transactions-reports"
      />
      <Route
        path="reports/transfers"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TRANSFERS_REPORTS}>
              <TransfersReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-transfers-reports"
      />
      <Route
        path="reports/treasuries"
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES_REPORTS}>
              <TreasuriesReports />
            </ProtectedRoute>
          </Suspense>
        }
        id="dashboard-treasuries-reports"
      />
    </Route>
  </Route>
);

export default dashboardRoutes;
