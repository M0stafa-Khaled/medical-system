import { Button } from "@/components/ui/button";
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
      <BookingsReportFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default BookingsReportHeader;
