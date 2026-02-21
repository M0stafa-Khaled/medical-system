import { PERMISSIONS } from "@/shared/enums/permissions";
import { ProtectedRoute } from "@/features/auth";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Transactions = lazy(() => import("./pages/Transactions"));
const TransactionDetails = lazy(() => import("./pages/TransactionDetails"));
const LastVisits = lazy(() => import("./pages/LastVisits"));

export const transactionsRoutes = [
  {
    path: "transactions",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.TRANSACTIONS}>
          <Transactions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "transactions/:transactionId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TRANSACTION}>
          <TransactionDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "last-visits/:patientId/transactions/:doctorId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute
          requiredPermission={PERMISSIONS.LAST_PATIENT_TRANSACTIONS}
        >
          <LastVisits />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
