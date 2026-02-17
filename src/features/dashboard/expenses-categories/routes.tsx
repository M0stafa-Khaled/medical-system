import { ProtectedRoute } from "@/features/auth";
import ExpensesCategories from "./pages/ExpensesCategories";
import { PERMISSIONS } from "@/enums/permissions";

export const expensesCategoriesRoutes = [
  {
    path: "expenses-categories",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSE_CATEGORIES}>
        <ExpensesCategories />
      </ProtectedRoute>
    ),
  },
];
