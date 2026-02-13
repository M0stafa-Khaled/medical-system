import { useSearchParams } from "react-router";
import PatientsReportFilters from "./PatientsReportFilters";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { ar } from "date-fns/locale";
import { IPatientsReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: IPatientsReportFilter;
}
const PatientsReportHeader = ({ filters }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (newFilters: IPatientsReportFilter) => {
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
      end_at: null,
      start_at: null,
      q: "",
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
      <PatientsReportFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default PatientsReportHeader;
