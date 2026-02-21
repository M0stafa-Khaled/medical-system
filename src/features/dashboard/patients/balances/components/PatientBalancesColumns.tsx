import { ColumnDef } from "@/shared/components/data-table";
import { IBalance } from "@/features/dashboard/transactions/types";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";

export const usePatientBalancesColumns = (): ColumnDef<IBalance>[] => {
  return [
    {
      key: "transaction_code",
      header: "رقم العملية",
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
      cell: (row) => (row.payment_method === "cash" ? "نقدا" : "بطاقة"),
    },
    {
      key: "created_at",
      header: "تاريخ العملية",
      cell: (row) => formatDateTime(row.created_at),
    },
  ];
};
