import { Button } from "@/shared/components/ui/button";
import { TransactionsFilters } from "./TransactionsFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CreatePatientPayment } from "./CreatePatientPayment";
import { useSearchParams } from "react-router";

export const TransactionsHeader = () => {
  const [, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
          <CreatePatientPayment />
          <div className="text-lg font-semibold">
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
      <TransactionsFilters />
    </div>
  );
};
