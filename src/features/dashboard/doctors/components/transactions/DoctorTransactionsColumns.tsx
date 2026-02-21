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
      cell: (row) => numberToPrice(row.balance.amount_paid),
    },
    {
      key: "row.treasury.name" as keyof ITransaction,
      header: "الخزنة",
    },
    {
      key: "actions",
      header: "الخدمة",
      cell: (row) => row.actions.map((action) => action.name).join(", "),
    },
    {
      key: "patient.name" as keyof ITransaction,
      header: "المريض",
      cell: (row) => truncateText(row.patient.name, 15),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (row) =>
        row.status ? (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            محصل
          </Badge>
        ) : (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            مسترد
          </Badge>
        ),
    },
    {
      key: "created_at",
      header: "تاريخ التحصيل",
      cell: (row) => formatDateTime(row?.created_at),
    },
  ];
};
