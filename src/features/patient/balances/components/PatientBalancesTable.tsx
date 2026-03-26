import { DataTable, ColumnDef } from "@/shared/components/data-table";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { Badge } from "@/shared/components/ui/badge";
import formatDateTime from "@/shared/utils/formatDate";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { IPatientBalanceItem } from "../types";

const columns: ColumnDef<IPatientBalanceItem>[] = [
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
    header: "المسترد",
    cell: (row) => numberToPrice(row.refund_amount),
  },
  {
    key: "payment_method",
    header: "طريقة الدفع",
    cell: (row) => (
      <Badge variant="secondary">
        {row.payment_method === "cash" ? "نقدي" : "بطاقة"}
      </Badge>
    ),
  },
  {
    key: "created_at",
    header: "التاريخ",
    cell: (row) => formatDateTime(row.created_at),
  },
];

export const PatientBalancesTable = ({
  items,
  isLoading,
}: {
  items: IPatientBalanceItem[];
  isLoading: boolean;
}) => (
  <DataTable
    columns={columns}
    data={items}
    isLoading={isLoading}
    emptyMessage="لا توجد عمليات مدفوعات حتى الآن."
    skeleton={
      <TableSkeleton
        columns={7}
        rows={6}
        actionButtons={0}
        showButtons={false}
      />
    }
  />
);
