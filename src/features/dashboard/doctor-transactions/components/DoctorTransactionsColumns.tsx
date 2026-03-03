import { ColumnDef } from "@/shared/components/data-table";
import { ITransaction } from "@/features/dashboard/transactions/types";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import truncateText from "@/shared/utils/truncateText";

export const useDoctorTransactionsColumns = (): ColumnDef<ITransaction>[] => {
  return [
    {
      key: "code",
      header: "رقم العملية",
    },
    {
      key: "balance.amount_paid" as keyof ITransaction,
      header: "المبلغ",
      cell: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {numberToPrice(row.balance.amount_paid)}
        </span>
      ),
    },
    {
      key: "treasury.name" as keyof ITransaction,
      header: "الخزنة",
      cell: (row) => (
        <span className="text-muted-foreground">{row.treasury.name}</span>
      ),
    },
    {
      key: "actions",
      header: "الخدمة",
      cell: (row) => (
        <span className="text-sm">
          {row.actions.map((action) => action.name).join(", ")}
        </span>
      ),
    },
    {
      key: "patient.name" as keyof ITransaction,
      header: "المريض",
      cell: (row) => (
        <span className="font-medium">
          {truncateText(row.patient.name, 15)}
        </span>
      ),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/20 text-emerald-700 shadow-none hover:bg-emerald-600/30 dark:bg-emerald-600/20 dark:text-emerald-400">
            <div className="ml-2 h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            محصل
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/20 text-red-600 shadow-none hover:bg-red-600/30 dark:bg-red-600/20 dark:text-red-400">
            <div className="ml-2 h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
            مسترد
          </Badge>
        ),
    },
    {
      key: "created_at",
      header: "تاريخ التحصيل",
      cell: (row) => (
        <span className="text-muted-foreground text-sm">
          {formatDateTime(row?.created_at)}
        </span>
      ),
    },
  ];
};
