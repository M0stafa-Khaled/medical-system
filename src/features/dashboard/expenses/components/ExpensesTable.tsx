import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { DataTable } from "@/components/shared/data-table";
import { useExpensesColumns } from "./ExpensesColumns";
import { IExpensesFilter } from "../types";
import { useGetAllExpenses } from "../queriesAndMutations";

export const ExpensesTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IExpensesFilter = useMemo(
    () => ({
      status: searchParams.get("status") || "",
      code: searchParams.get("code") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
      created_at: searchParams.get("created_at") || "",
      sort: searchParams.get("sort") || "",
    }),
    [searchParams]
  );

  const code = useDebounce(filters.code, 500);
  const employee = useDebounce(filters.employee, 500);
  const treasury = useDebounce(filters.treasury, 500);

  const {
    data: expenses,
    isLoading,
    isError,
  } = useGetAllExpenses({
    page,
    sort: filters.sort ? "created_at" : "-created_at",
    filter: {
      ...(filters.status && { status: filters.status }),
      ...(filters.code && { code }),
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

  const canDeleteExpense = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );
  const canCancelExpense = useHasPermission(PERMISSIONS.CANCEL_EXPENSE);
  const canViewExpense = useHasPermission(PERMISSIONS.VIEW_EXPENSE_CATEGORY);

  const columns = useExpensesColumns();
  return (
    <DataTable
      data={expenses?.data.items || []}
      columns={columns}
      isLoading={isLoading}
      skeleton={
        <TableSkeleton
          columns={
            canCancelExpense || canDeleteExpense || canViewExpense ? 7 : 6
          }
          rows={6}
          actionButtons={3}
        />
      }
      meta={expenses?.data?.meta}
    />
  );
};
