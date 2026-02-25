import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { DataTable } from "@/shared/components/data-table";
import { useTransactionsColumns } from "../TransactionsColumns";
import { ITransaction } from "../../types";

interface IProps {
  transactions: ITransaction[];
  isLoading: boolean;
}

export const LastVisitsTable = ({ transactions, isLoading }: IProps) => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  const columns = useTransactionsColumns();

  return (
    <DataTable
      isLoading={isLoading}
      data={transactions}
      columns={columns}
      skeleton={
        <TableSkeleton
          columns={canRefundTransaction || canViewTransaction ? 6 : 5}
          rows={6}
          actionButtons={3}
        />
      }
    />
  );
};
