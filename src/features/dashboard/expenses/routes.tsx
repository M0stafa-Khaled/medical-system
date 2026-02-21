import { PERMISSIONS } from "@/shared/enums/permissions";
import { ProtectedRoute } from "@/features/auth";
import { lazy, Suspense } from "react";
import PageLoader from "@/shared/components/PageLoader";

const Expenses = lazy(() => import("./pages/Expenses"));
const ExpenseDetails = lazy(() => import("./pages/ExpenseDetails"));

export const expensesRoutes = [
  {
    path: "expenses",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES}>
          <Expenses />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "expenses/:expenseId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EXPENSE}>
          <ExpenseDetails />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
