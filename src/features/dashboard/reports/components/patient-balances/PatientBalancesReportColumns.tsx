import { ColumnDef } from "@/shared/components/data-table";
import { IBalance } from "@/features/dashboard/transactions/types";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { Badge } from "@/shared/components/ui/badge";

export const usePatientBalancesReportColumns = (): ColumnDef<IBalance>[] => {
  return [
    {
      key: "transaction_code",
      header: "رقم العملية",
    },
    {
      key: "type",
      header: "نوع العملية",
      cell: (row) => (
        <Badge
          className={
            row.type === "payment"
              ? "rounded-full bg-blue-600/20 text-blue-700 shadow-none hover:bg-blue-600/10 dark:bg-blue-600/20 dark:text-blue-400"
              : "rounded-full bg-purple-600/20 text-purple-700 shadow-none hover:bg-purple-600/10 dark:bg-purple-600/20 dark:text-purple-400"
          }
        >
          <div
            className={`ml-2 h-1.5 w-1.5 rounded-full ${row.type === "payment" ? "bg-blue-700 dark:bg-blue-400" : "bg-purple-700 dark:bg-purple-400"}`}
          />
          {row.type === "payment" ? "دفعة" : "كشف"}
        </Badge>
      ),
    },
    {
      key: "amount_paid",
      header: "المدفوع",
      cell: (row) => numberToPrice(row.amount_paid),
    },
    {
      key: "total_amount_due",
      header: "المستحق",
      cell: (row) => numberToPrice(row.total_amount_due),
    },
    {
      key: "balance",
      header: "الرصيد",
      cell: (row) => numberToPrice(row.balance),
    },
    {
      key: "refund_amount",
      header: "المرتجع",
      cell: (row) => numberToPrice(row.refund_amount),
    },
    {
      key: "payment_method",
      header: "طريقة الدفع",
      cell: (row) => (
        <Badge
          className={
            row.payment_method === "cash"
              ? "rounded-full bg-emerald-600/20 text-emerald-700 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-400"
              : "rounded-full bg-amber-600/20 text-amber-700 shadow-none hover:bg-amber-600/10 dark:bg-amber-600/20 dark:text-amber-400"
          }
        >
          <div
            className={`ml-2 h-1.5 w-1.5 rounded-full ${row.payment_method === "cash" ? "bg-emerald-700 dark:bg-emerald-400" : "bg-amber-700 dark:bg-amber-400"}`}
          />
          {row.payment_method === "cash" ? "نقدًا" : "بطاقة"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "تاريخ العملية",
      cell: (row) => formatDateTime(row.created_at),
    },
  ];
};
