import { DataTable } from "@/shared/components/data-table";
import { useDailySummaryTransactionColumns } from "./DailySummaryTransactionColumns";
import { ITransaction } from "@/features/dashboard/transactions/types";

interface TransactionsTableProps {
  transactions: ITransaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const columns = useDailySummaryTransactionColumns();

  return (
    <DataTable
      columns={columns}
      data={transactions}
      emptyMessage="لا يوجد معاملات"
    />
  );
};
