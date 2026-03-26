import { type ColumnDef } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { ITransaction } from "@/features/dashboard/transactions/types";

export const useDailySummaryRefundColumns = (): ColumnDef<ITransaction>[] => {
  return [
    {
      key: "code" as keyof ITransaction,
      header: "الكود",
    },
    {
      key: "doctor" as keyof ITransaction,
      header: "الطبيب",
      className: "font-medium",
      cell: (row) => row.doctor?.item?.name,
    },
    {
      key: "patient" as keyof ITransaction,
      header: "المريض",
      cell: (row) => row.patient?.name,
    },
    {
      key: "balance" as keyof ITransaction,
      header: "المبلغ",
      className: "font-semibold text-orange-600",
      cell: (row) => numberToPrice(parseFloat(row.balance.refund_amount)),
    },
    {
      key: "refund_info" as keyof ITransaction,
      header: "السبب",
    },
    {
      key: "balance" as keyof ITransaction,
      header: "طريقة الدفع",
      cell: (row) => {
        const paymentMethod = row.balance.payment_method;
        if (paymentMethod === "cash") {
          return (
            <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
              <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
              نقدي
            </Badge>
          );
        } else if (paymentMethod === "visa") {
          return (
            <Badge className="rounded-full bg-blue-600/30 text-blue-800 shadow-none hover:bg-blue-600/10 dark:bg-blue-600/20 dark:text-blue-500">
              <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-blue-800 dark:bg-blue-500" />
              فيزا
            </Badge>
          );
        } else {
          return (
            <Badge className="rounded-full bg-purple-600/30 text-purple-800 shadow-none hover:bg-purple-600/10 dark:bg-purple-600/20 dark:text-purple-500">
              <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-purple-800 dark:bg-purple-500" />
              تحويل
            </Badge>
          );
        }
      },
    },
  ];
};
