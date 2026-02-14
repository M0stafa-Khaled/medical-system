import { PERMISSIONS } from "@/enums/permissions";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import BookingsFilters from "./BookingsFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import RefetchDataButton from "@/components/shared/RefetchDataButton";
import Query_Keys from "@/enums/queryKeys";
import { IBookingsFilter } from "@/interfaces/dashboard/bookings";

interface IProps {
  filters: IBookingsFilter;
  setFilters: (filters: IBookingsFilter) => void;
  isLoading: boolean;
}

const BookingsHeader = ({ filters, setFilters, isLoading }: IProps) => {
  const canCreateBooking = useHasPermission(PERMISSIONS.ADD_BOOKING);
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
      patient: "",
      created_at: null,
      booking_date: null,
      status: "",
      clinic: "",
    });
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
          {canCreateBooking && (
            <Button className="h-auto px-0 py-0">
              <Link
                to={"/dashboard/bookings/create"}
                className="flex h-full w-full items-center justify-center gap-2 px-4 py-3"
              >
                إضافة حجز جديد
                <FiPlus size={20} />
              </Link>
            </Button>
          )}
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <div className="flex gap-2">
          <RefetchDataButton
            isLoading={isLoading}
            queryKey={Query_Keys.GET_ALL_BOOKINGS}
          />
          <Button
            onClick={handleClearFilters}
            className="flex h-auto w-full items-center gap-2 py-3"
          >
            <Eraser className="h-4 w-4" />
            مسح الفلاتر
          </Button>
        </div>
      </div>
      <BookingsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default BookingsHeader;
