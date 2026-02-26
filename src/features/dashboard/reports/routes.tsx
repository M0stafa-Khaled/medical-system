import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const BookingsReports = lazy(() => import("./pages/BookingsReports"));
const ExpensesReports = lazy(() => import("./pages/ExpensesReports"));
const TransactionsReports = lazy(() => import("./pages/TransactionsReports"));
const TransfersReports = lazy(() => import("./pages/TransfersReports"));
const PatientsReports = lazy(() => import("./pages/PatientsReports"));
const TreasuriesReports = lazy(() => import("./pages/TreasuriesReports"));
const PrescriptionsReports = lazy(() => import("./pages/PrescriptionsReports"));
const PatientBalancesReports = lazy(
  () => import("./pages/PatientBalancesReports")
);

export const reportsRoutes = [
  {
    path: "reports/bookings",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.BOOKINGS_REPORTS}>
          <BookingsReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/expenses",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES_REPORTS}>
          <ExpensesReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/transactions",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.TRANSACTIONS_REPORTS}>
          <TransactionsReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/transfers",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.TRANSFERS_REPORTS}>
          <TransfersReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/patients",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.PATIENTS_REPORTS}>
          <PatientsReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/treasuries",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.TREASURIES_REPORTS}>
          <TreasuriesReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/prescriptions",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.PRESCRIPTIONS_REPORTS}>
          <PrescriptionsReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "reports/patient-balances",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute
          requiredPermission={PERMISSIONS.PATIENT_BALANCES_REPORTS}
        >
          <PatientBalancesReports />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
