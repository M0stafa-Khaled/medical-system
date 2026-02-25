import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { ITransactionsReportFilter } from "@/features/dashboard/reports/types";
import { useGetTransactionsReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useTransactionsReportColumns } from "./TransactionsReportColumns";

export const TransactionReportTable = () => {
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

  const columns = useTransactionsReportColumns();
  return (
    <DataTable
      isLoading={isLoading}
      data={transactions?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={7} rows={6} showButtons={false} />}
      meta={transactions?.data.meta}
    />
  );
};
