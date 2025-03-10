import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import ExpensesTableHeader from "./ExpensesTableHeader";
import ExpensesList from "./ExpensesList";
import ExpensesTableActions from "./ExpensesTableActions";
import { useGetAllExpenses } from "@/lib/react-query/dashboard/expenses/expenses";

const ExpensesTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const {
    data: expenses,
    isLoading,
    isError,
  } = useGetAllExpenses({ token, page, search });

  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [isError]);

  return (
    <DataTable
      isLoading={isLoading}
      actions={
        <ExpensesTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<ExpensesTableHeader />}
      list={
        <ExpensesList
          meta={expenses?.data && expenses.data.meta}
          expenses={expenses?.data.items || []}
        />
      }
      skeleton={<TableSkeleton columns={8} rows={6} actionButtons={3} />}
      pagination={
        expenses?.data && {
          meta: expenses.data.meta,
        }
      }
    />
  );
};

export default ExpensesTable;
