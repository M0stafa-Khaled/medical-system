import { Button } from "@/components/ui/button";
import TransactionsFilters from "./TransactionsReportFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";
import { ITransactionsReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: ITransactionsReportFilter;
}

const TransactionsReportHeader = ({ filters }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (newFilters: ITransactionsReportFilter) => {
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
      doctor: "",
      patient: "",
      action: "",
      treasury: "",
      status: "",
      employee: "",
      end_at: null,
      start_at: null,
      payment_method: "",
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
          className="w-full md:w-fit flex items-center gap-2 h-auto py-3"
        >
          <Eraser className="w-4 h-4" />
          مسح الفلاتر
        </Button>
      </div>
      <TransactionsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default TransactionsReportHeader;
