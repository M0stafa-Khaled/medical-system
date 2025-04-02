import DataTable from "@/components/ui/DataTable";
import TransactionsTableHeader from "./TransactionsTableHeader";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsList from "./TransactionsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllTransactions } from "@/lib/react-query/dashboard/transactions/transactions";
import { ITransactionsFilter } from "@/interfaces/dashboard/transactions/transactions";

const TransactionTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();
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

  const setFilters = (newFilters: ITransactionsFilter) => {
    const params = new URLSearchParams(searchParams);

    // update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    setSearchParams(params);
  };

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
    if (transactions?.message) toast.error(transactions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transactions?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<TransactionsHeader filters={filters} setFilters={setFilters} />}
      tableHeader={<TransactionsTableHeader setSort={setSort} sort={sort} />}
      list={<TransactionsList transactions={transactions?.data?.items || []} />}
      skeleton={<TableSkeleton columns={8} rows={6} actionButtons={3} />}
      pagination={
        transactions?.data && {
          meta: transactions.data?.meta,
        }
      }
    />
  );
};

export default TransactionTable;
