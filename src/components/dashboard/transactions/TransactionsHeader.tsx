import { Button } from "@/components/ui/button";
import TransactionsFilters from "./TransactionsFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ITransactionsFilter } from "@/interfaces/dashboard/transactions/transactions";
import CreatePatientPayment from "./CreatePatientPayment";
import { useSearchParams } from "react-router";

interface IProps {
  filters: ITransactionsFilter;
}

const TransactionsHeader = ({ filters }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (newFilters: ITransactionsFilter) => {
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
      created_at: null,
      action: "",
      treasury: "",
      status: "",
      code: "",
      employee: "",
    });
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
          <CreatePatientPayment />
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex h-auto items-center gap-2 py-3"
        >
          <Eraser className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>
      <TransactionsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default TransactionsHeader;
