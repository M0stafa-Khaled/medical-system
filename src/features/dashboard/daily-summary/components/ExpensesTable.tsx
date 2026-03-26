import { DataTable } from "@/shared/components/data-table";
import { useDailySummaryExpenseColumns } from "./DailySummaryExpenseColumns";
import { IExpense } from "@/features/dashboard/expenses/types";

interface ExpensesTableProps {
  expenses: IExpense[];
}

export const ExpensesTable = ({ expenses }: ExpensesTableProps) => {
  const columns = useDailySummaryExpenseColumns();

  return (
    <DataTable
      columns={columns}
      data={expenses}
      emptyMessage="لا يوجد مصروفات"
    />
  );
};
