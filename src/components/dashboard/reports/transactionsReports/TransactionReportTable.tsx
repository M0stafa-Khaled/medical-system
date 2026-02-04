import DataTable from "@/components/ui/DataTable";
import TransactionsTableHeader from "./TransactionsTableHeader";
import TransactionsReportHeader from "./TransactionsReportHeader";
import TransactionsReportList from "./TransactionsReportList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetTransactionsReport } from "@/lib/react-query/dashboard/reports";
import { ITransactionsReportFilter } from "@/interfaces/dashboard/reports";

const TransactionReportTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: ITransactionsReportFilter = useMemo(
    () => ({
      action: searchParams.get("action") || "",
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      employee: searchParams.get("employee") || "",
      end_at: searchParams.get("end_at") || "",
      start_at: searchParams.get("start_at") || "",
      payment_method: searchParams.get("payment_method") || "",
      status: searchParams.get("status") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const doctor = useDebounce(filters.doctor, 500);
  const action = useDebounce(filters.action, 500);
  const patient = useDebounce(filters.patient, 500);
  const employee = useDebounce(filters.employee, 500);

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetTransactionsReport({
    token,
    page,
    filter: {
      ...(filters.doctor && { doctor }),
      ...(filters.action && { action }),

      ...(filters.treasury &&
        filters.treasury !== "all" && { treasury: filters.treasury }),
      ...(filters.status &&
        filters.status !== "all" && { status: filters.status }),
      ...(filters.patient && { patient }),
      ...(filters.employee && { employee }),
      ...(filters.payment_method &&
        filters.payment_method !== "all" && {
          payment_method: filters.payment_method,
        }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (transactions?.message && !transactions.status)
      toast.error(transactions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transactions?.message, isError, transactions?.status]);
  return (
    <DataTable
      isLoading={isLoading}
      header={<TransactionsReportHeader filters={filters} />}
      tableHeader={<TransactionsTableHeader />}
      list={
        <TransactionsReportList
          transactions={transactions?.data?.items || []}
        />
      }
      skeleton={<TableSkeleton columns={8} rows={6} actionButtons={3} />}
      pagination={
        transactions?.data && {
          meta: transactions.data?.meta,
        }
      }
    />
  );
};

export default TransactionReportTable;
