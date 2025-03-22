import { Button } from "@/components/ui/button";
import TransactionsFilters from "./TransactionsFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ITransactionsFilter } from "@/interfaces/dashboard/transactions";

interface IProps {
  filters: ITransactionsFilter;
  setFilters: (filters: ITransactionsFilter) => void;
}

const TransactionsActions = ({ filters, setFilters }: IProps) => {
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
      patient: "",
      created_at: null,
      action: "",
      treasury: "",
      status: "",
      code: "",
      employee: "",
    });
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="text-lg font-semibold text-black dark:text-white">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex items-center gap-2 h-auto py-3"
        >
          <Eraser className="w-4 h-4" />
          مسح الفلاتر
        </Button>
      </div>
      <TransactionsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default TransactionsActions;
