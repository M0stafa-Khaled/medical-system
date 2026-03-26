import { type ColumnDef } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { ITransaction } from "@/features/dashboard/transactions/types";

export const useDailySummaryTransactionColumns =
  (): ColumnDef<ITransaction>[] => {
    return [
      {
        key: "code" as keyof ITransaction,
        header: "الكود",
      },
      {
        key: "doctor.item.name" as keyof ITransaction,
        header: "الطبيب",
        cell: (row) => row.doctor?.item?.name,
      },
      {
        key: "patient.name" as keyof ITransaction,
        header: "المريض",
        cell: (row) => row.patient?.name,
      },
      {
        key: "actions" as keyof ITransaction,
        header: "الخدمات",
        cell: (row) => (
          <div className="flex flex-wrap gap-1">
            {row.actions.map((action) => (
              <Badge key={action.id} variant="outline" className="text-xs">
                {action.name}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        key: "balance.amount_paid" as keyof ITransaction,
        header: "المبلغ",
        className: "text-green-600! font-semibold",
        cell: (row) => numberToPrice(parseFloat(row.balance.amount_paid)),
      },
      {
        key: "balance.payment_method" as keyof ITransaction,
        header: "الدفع",
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
