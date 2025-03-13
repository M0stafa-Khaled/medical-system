import { PERMISSIONS } from "@/enums/permissions";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import BookingsFilters from "./BookingsFilters";
import CreateBookingModalButton from "./CreateBookingModalButton";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface IProps {
  filters: {
    doctor: string;
    patient: string;
    created_at: string | null;
    booking_date: string | null;
    status: string;
    clinic_name: string;
  };
  setFilters: (filters: any) => void;
}

const BookingsHeaderActions = ({ filters, setFilters }: IProps) => {
  const canCreateBooking = useHasPermission(PERMISSIONS.ADD_BOOKING);
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
      patient: "",
      created_at: null,
      booking_date: null,
      status: "",
      clinic_name: "",
    });
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-4 ">
          {canCreateBooking && <CreateBookingModalButton />}
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex items-center gap-2 h-auto py-3"
        >
          <Eraser className="w-4 h-4" />
          مسح الفلاتر
        </Button>
      </div>
      <BookingsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default BookingsHeaderActions;
