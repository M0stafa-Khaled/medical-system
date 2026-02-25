import { useSearchParams } from "react-router";
import { PatientsReportFilters } from "./PatientsReportFilters";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Eraser } from "lucide-react";
import { ar } from "date-fns/locale";

export const PatientsReportHeader = () => {
  const [, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h4 className="text-lg font-semibold">
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
      <PatientsReportFilters />
    </div>
  );
};
