import { ProtectedRoute } from "@/app/ProtectedRoute";
import PageLoader from "@/shared/components/PageLoader";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { lazy, Suspense } from "react";

const ExpensesCategories = lazy(() => import("./pages/ExpensesCategories"));
export const expensesCategoriesRoutes = [
  {
    path: "expenses-categories",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSE_CATEGORIES}>
          <ExpensesCategories />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];
