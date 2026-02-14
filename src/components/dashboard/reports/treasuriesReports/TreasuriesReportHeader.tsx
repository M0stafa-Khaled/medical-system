import { Button } from "@/shared/components/ui/button";
import TreasuriesReportFilters from "./TreasuriesReportFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useSearchParams } from "react-router";
import { ITreasuriesReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: ITreasuriesReportFilter;
}

const TreasuriesReportHeader = ({ filters }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (newFilters: ITreasuriesReportFilter) => {
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
      type: "",
      treasury: "",
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
          className="flex h-auto w-full items-center gap-2 py-3 md:w-fit"
        >
          <Eraser className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>
      <TreasuriesReportFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default TreasuriesReportHeader;
