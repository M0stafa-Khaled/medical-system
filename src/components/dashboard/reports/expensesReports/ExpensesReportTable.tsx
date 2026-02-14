import DataTable from "@/shared/components/ui/DataTable";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import ExpensesReportTableHeader from "./ExpensesReportTableHeader";
import ExpensesReportList from "./ExpensesReportList";
import ExpensesReportHeader from "./ExpensesReportHeader";
import { useGetExpensesReport } from "@/shared/lib/react-query/dashboard/reports";
import { IExpensesReportFilter } from "@/interfaces/dashboard/reports";

const ExpensesReportTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IExpensesReportFilter = useMemo(
    () => ({
      status: searchParams.get("status") || "",
      created_at: searchParams.get("created_at") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const employee = useDebounce(filters.employee, 500);
  const treasury = useDebounce(filters.treasury, 500);

  const {
    data: expenses,
    isLoading,
    isError,
  } = useGetExpensesReport({
    token,
    page,
    filter: {
      ...(filters.status && { status: filters.status }),
      ...(filters.employee && { employee }),
      ...(filters.treasury && { treasury }),
      ...(filters.created_at && { created_at: filters.created_at }),
    },
  });

  useEffect(() => {
    if (expenses?.message && !expenses.status) toast.error(expenses.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [expenses?.message, expenses?.status, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<ExpensesReportHeader filters={filters} />}
      tableHeader={<ExpensesReportTableHeader />}
      list={<ExpensesReportList expenses={expenses?.data?.items || []} />}
      skeleton={<TableSkeleton columns={7} rows={6} actionButtons={3} />}
      pagination={
        expenses?.data && {
          meta: expenses.data?.meta,
        }
      }
    />
  );
};

export default ExpensesReportTable;
