import { type ColumnDef } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { IExpense } from "@/features/dashboard/expenses/types";

export const useDailySummaryExpenseColumns = (): ColumnDef<IExpense>[] => {
  return [
    {
      key: "code" as keyof IExpense,
      header: "الكود",
    },
    {
      key: "name" as keyof IExpense,
      header: "الاسم",
      className: "font-medium",
    },
    {
      key: "category" as keyof IExpense,
      header: "التصنيف",
      cell: (row) => <Badge variant="outline">{row.category.name}</Badge>,
    },
    {
      key: "treasury" as keyof IExpense,
      header: "الخزنة",
      cell: (row) => row.treasury?.name,
    },
    {
      key: "employee" as keyof IExpense,
      header: "الموظف",
      cell: (row) => row.employee?.name,
    },
    {
      key: "price" as keyof IExpense,
      header: "المبلغ",
      className: "font-semibold! text-red-600",
      cell: (row) => numberToPrice(parseFloat(row.price)),
    },
  ];
};
