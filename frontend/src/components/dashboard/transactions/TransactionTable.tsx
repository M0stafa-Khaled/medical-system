import DataTable from "@/components/ui/DataTable";
import TransactionsTableHeader from "./TransactionsTableHeader";
import TransactionsActions from "./TransactionsActions";
import TransactionsList from "./TransactionsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllTransactions } from "@/lib/react-query/dashboard/transactions";
import { ITransactionsFilter } from "@/interfaces/dashboard/transactions";

const TransactionTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sort, setSort] = useState(false);

  const [filters, setFilters] = useState<ITransactionsFilter>({
    doctor: "",
    action: "",
    treasury: "",
    status: "",
    created_at: "",
    patient: "",
    code: "",
    employee: "",
  });

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
      actions={
        <TransactionsActions filters={filters} setFilters={setFilters} />
      }
      header={<TransactionsTableHeader setSort={setSort} sort={sort} />}
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
