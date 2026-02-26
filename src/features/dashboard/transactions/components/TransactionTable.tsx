import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { ITransactionsFilter } from "../types";
import { useGetAllTransactions } from "../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useTransactionsColumns } from "./TransactionsColumns";

export const TransactionTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: ITransactionsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      action: searchParams.get("action") || "",
      patient: searchParams.get("patient") || "",
      code: searchParams.get("code") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
      created_at: searchParams.get("created_at") || "",
      status: searchParams.get("status") || "",
    }),
    [searchParams]
  );

  const doctor = useDebounce(filters.doctor, 500);
  const action = useDebounce(filters.action, 500);
  const patient = useDebounce(filters.patient, 500);
  const code = useDebounce(filters.code, 500);
  const employee = useDebounce(filters.employee, 500);

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetAllTransactions({
    page,
    filter: {
      ...(filters.doctor && { doctor }),
      ...(filters.action && { action }),

      ...(filters.treasury &&
        filters.treasury !== "all" && { treasury: filters.treasury }),

      ...(filters.status &&
        filters.status !== "all" && { status: filters.status }),
      ...(filters.created_at && { created_at: filters.created_at }),
      ...(filters.patient && { patient }),
      ...(filters.code && { code }),
      ...(filters.employee && { employee }),
    },
  });

  useEffect(() => {
    if (transactions?.message && !transactions.status)
      toast.error(transactions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transactions?.message, isError, transactions?.status]);

  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  const columns = useTransactionsColumns();
  return (
    <DataTable
      isLoading={isLoading}
      data={transactions?.data.items || []}
      columns={columns}
      emptyMessage="لا يوجد معاملات"
      skeleton={
        <TableSkeleton
          columns={canRefundTransaction || canViewTransaction ? 8 : 7}
          rows={6}
          actionButtons={3}
        />
      }
      meta={transactions?.data.meta}
    />
  );
};

export default TransactionTable;
