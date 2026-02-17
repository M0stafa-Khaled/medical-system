import { PERMISSIONS } from "@/enums/permissions";
import { ProtectedRoute } from "@/features/auth";
import Expenses from "./pages/Expenses";
import ExpenseDetails from "./pages/ExpenseDetails";

export const expensesRoutes = [
  {
    path: "expenses",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.EXPENSES}>
        <Expenses />
      </ProtectedRoute>
    ),
  },
  {
    path: "expenses/:expenseId",
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_EXPENSE}>
        <ExpenseDetails />
      </ProtectedRoute>
    ),
  },
];
