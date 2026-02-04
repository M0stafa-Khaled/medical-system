import { useSearchParams } from "react-router-dom";
import ExpensesReportFilters from "./ExpensesReportFilters";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
        </h4>

        <Button
          onClick={handleClearFilters}
          className="flex items-center gap-2 h-auto py-3"
        >
          <Eraser className="w-4 h-4" />
          مسح الفلاتر
        </Button>
      </div>
      <ExpensesReportFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default ExpensesReportHeader;
