import DataTable from "@/shared/components/ui/DataTable";
import TransactionsTableHeader from "./TransactionsTableHeader";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsList from "./TransactionsList";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { useGetAllTransactions } from "@/shared/lib/react-query/dashboard/transactions/transactions";
import { ITransactionsFilter } from "@/interfaces/dashboard/transactions/transactions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const TransactionTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sort, setSort] = useState(false);

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
    token,
    page,
    sort: sort ? "created_at" : "-created_at",
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

  return (
    <DataTable
      isLoading={isLoading}
      header={<TransactionsHeader filters={filters} />}
      tableHeader={<TransactionsTableHeader setSort={setSort} />}
      list={<TransactionsList transactions={transactions?.data?.items || []} />}
      skeleton={
        <TableSkeleton
          columns={canRefundTransaction || canViewTransaction ? 8 : 7}
          rows={6}
          actionButtons={3}
        />
      }
      pagination={
        transactions?.data && {
          meta: transactions.data?.meta,
        }
      }
    />
  );
};

export default TransactionTable;
