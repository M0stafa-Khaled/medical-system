import { Button } from "@/shared/components/ui/button";
import BookingsReportFilters from "./BookingsReportFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { IBookingsReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: IBookingsReportFilter;
  setFilters: (filters: IBookingsReportFilter) => void;
}

const BookingsReportHeader = ({ filters, setFilters }: IProps) => {
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
      patient: "",
      booking_date: null,
      status: "",
      clinic: "",
      start_at: null,
      end_at: null,
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
      <BookingsReportFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default BookingsReportHeader;
