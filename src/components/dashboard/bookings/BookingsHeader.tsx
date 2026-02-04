import { PERMISSIONS } from "@/enums/permissions";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import BookingsFilters from "./BookingsFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
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
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-4 ">
          {canCreateBooking && (
            <Button className="h-auto py-0 px-0">
              <Link
                to={"/dashboard/bookings/create"}
                className="flex justify-center items-center gap-2 w-full h-full py-3 px-4"
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
            className="w-full flex items-center gap-2 h-auto py-3"
          >
            <Eraser className="w-4 h-4" />
            مسح الفلاتر
          </Button>
        </div>
      </div>
      <BookingsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default BookingsHeader;
