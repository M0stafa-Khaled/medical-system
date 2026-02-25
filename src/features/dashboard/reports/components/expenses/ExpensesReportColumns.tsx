import { ColumnDef } from "@/shared/components/data-table";
import { Link } from "react-router";
import truncateText from "@/shared/utils/truncateText";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";
import { IExpense } from "@/features/dashboard/expenses/types";

export const useExpensesReportColumns = (): ColumnDef<IExpense>[] => {
  return [
    {
      key: "code",
      header: "رقم العملية",
    },
    {
      key: "category.name" as keyof IExpense,
      header: "القسم",
    },
    {
      key: "price",
      header: "المبلغ",
    },
    {
      key: "treasury.name" as keyof IExpense,
      header: "الخزنة",
    },
    {
      key: "employee.name" as keyof IExpense,
      header: "الموظف",
      cell: (row) => (
        <Link
          to={`/dashboard/employees/${row?.employee.id}`}
          className="transition-all duration-200 dark:hover:text-blue-500"
        >
          {truncateText(row?.employee?.name, 15)}
        </Link>
      ),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            معتمد
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            ملغي
          </Badge>
        ),
    },
    {
      key: "created_at",
      header: "التاريخ",
      cell: (row) => formatDateTime(row?.created_at),
    },
  ];
};
