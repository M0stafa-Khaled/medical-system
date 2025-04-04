import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import ExpensesTableHeader from "./ExpensesTableHeader";
import ExpensesList from "./ExpensesList";
import ExpensesHeader from "./ExpensesHeader";
import { useGetAllExpenses } from "@/lib/react-query/dashboard/expenses/expenses";
import { IExpensesFilter } from "@/interfaces/dashboard/expenses";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const ExpensesTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sort, setSort] = useState(false);

  const filters: IExpensesFilter = useMemo(
    () => ({
      status: searchParams.get("status") || "",
      code: searchParams.get("code") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
      created_at: searchParams.get("created_at") || "",
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
    token,
    page,
    sort: sort ? "created_at" : "-created_at",
    filter: {
      ...(filters.status && { status: filters.status }),
      ...(filters.code && { code }),
      ...(filters.employee && { employee }),
      ...(filters.treasury && { treasury }),
      ...(filters.created_at && { created_at: filters.created_at }),
    },
  });

  useEffect(() => {
    if (expenses?.message) toast.error(expenses.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [expenses?.message, isError]);

  const canDeleteExpense = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );
  const canCancelExpense = useHasPermission(PERMISSIONS.CANCEL_EXPENSE);
  const canViewExpense = useHasPermission(PERMISSIONS.VIEW_EXPENSE_CATEGORY);

  return (
    <DataTable
      isLoading={isLoading}
      header={<ExpensesHeader filters={filters} />}
      tableHeader={<ExpensesTableHeader setSort={setSort} sort={sort} />}
      list={<ExpensesList expenses={expenses?.data?.items || []} />}
      skeleton={
        <TableSkeleton
          columns={
            canCancelExpense || canDeleteExpense || canViewExpense ? 7 : 6
          }
          rows={6}
          actionButtons={3}
        />
      }
      pagination={
        expenses?.data && {
          meta: expenses.data?.meta,
        }
      }
    />
  );
};

export default ExpensesTable;
