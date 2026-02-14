import { useSearchParams } from "react-router";
import ExpensesReportFilters from "./ExpensesReportFilters";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Eraser } from "lucide-react";
import { ar } from "date-fns/locale";
import { IExpensesReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: IExpensesReportFilter;
}
const ExpensesReportHeader = ({ filters }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (newFilters: IExpensesReportFilter) => {
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
      employee: "",
    });
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
        </h4>

        <Button
          onClick={handleClearFilters}
          className="flex h-auto items-center gap-2 py-3"
        >
          <Eraser className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>
      <ExpensesReportFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default ExpensesReportHeader;
