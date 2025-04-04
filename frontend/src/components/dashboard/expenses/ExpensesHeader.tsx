import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import CreateExpense from "./CreateExpenses";
import { useSearchParams } from "react-router-dom";
import { IExpensesFilter } from "@/interfaces/dashboard/expenses";
import ExpensesFilters from "./ExpensesFilters";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { ar } from "date-fns/locale";

interface IProps {
  filters: IExpensesFilter;
}
const ExpensesHeader = ({ filters }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const canCreateExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

  const setFilters = (newFilters: IExpensesFilter) => {
    const params = new URLSearchParams(searchParams);

    // update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setFilters({
      created_at: null,
      treasury: "",
      status: "",
      code: "",
      employee: "",
    });
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-4">
          {canCreateExpense && <CreateExpense />}
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex items-center gap-2 h-auto py-3"
        >
          <Eraser className="w-4 h-4" />
          مسح الفلاتر
        </Button>
      </div>
      <ExpensesFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default ExpensesHeader;
