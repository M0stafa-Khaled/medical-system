import { ColumnDef } from "@/shared/components/data-table";
import { ITreasuryReport } from "../../types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";

export const useTreasuriesReportColumns = (): ColumnDef<ITreasuryReport>[] => {
  return [
    {
      key: "type",
      header: "العملية",
      cell: (row) =>
        row.type === "transactions"
          ? "ايرادات"
          : row.type === "expenses"
            ? "مصروفات"
            : "تحويلات خزائن",
    },
    {
      key: "details.code" as keyof ITreasuryReport,
      header: "رقم العملية",
    },
    {
      key: "details.amount" as keyof ITreasuryReport,
      header: "المبلغ",
      cell: (row) => numberToPrice(row.details.amount),
    },
    {
      key: "details.status" as keyof ITreasuryReport,
      header: "الحالة",
      cell: (row) =>
        row.details.status === 1 ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            معتمد
          </Badge>
        ) : row.details.status == 0 ? (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            ملغي
          </Badge>
        ) : (
          <Badge className="rounded-full bg-blue-600/30 text-blue-500 shadow-none hover:bg-blue-600/10 dark:bg-blue-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
            غير متوفر
          </Badge>
        ),
    },
    {
      key: "details.employee" as keyof ITreasuryReport,
      header: "الموظف",
    },
    {
      key: "created_at",
      header: "تاريخ العملية",
      cell: (row) => formatDateTime(row.created_at),
    },
  ];
};
