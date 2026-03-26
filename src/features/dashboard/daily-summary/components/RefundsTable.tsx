import { DataTable } from "@/shared/components/data-table";
import { useDailySummaryRefundColumns } from "./DailySummaryRefundColumns";
import { ITransaction } from "@/features/dashboard/transactions/types";

interface RefundsTableProps {
  refunds: ITransaction[];
}

export const RefundsTable = ({ refunds }: RefundsTableProps) => {
  const columns = useDailySummaryRefundColumns();

  return (
    <DataTable
      columns={columns}
      data={refunds}
      emptyMessage="لا يوجد مستردات"
    />
  );
};
