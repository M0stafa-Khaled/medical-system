import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { IExpensesReportFilter } from "../../types";
import { useGetExpensesReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useExpensesReportColumns } from "./ExpensesReportColumns";

export const ExpensesReportTable = () => {
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

  const columns = useExpensesReportColumns();

  return (
    <DataTable
      isLoading={isLoading}
      data={expenses?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={6} rows={6} showButtons={false} />}
      meta={expenses?.data?.meta}
    />
  );
};
