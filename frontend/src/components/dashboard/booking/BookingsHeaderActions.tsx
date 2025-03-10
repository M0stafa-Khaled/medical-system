import { PERMISSIONS } from "@/enums/permissions";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import BookingsFilters from "./BookingsFilters";

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

const BookingsFilter = ({ filters, setFilters }: IProps) => {
  const canCreateBooking = useHasPermission(PERMISSIONS.ADD_BOOKING);

  return (
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        {canCreateBooking && (
          <Button
            size={"sm"}
            variant={"outline"}
            className=" h-auto py-0 px-0 bg-primary md:bg-transparent md:text-primary text-primary-foreground hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black !rounded-lg font-semibold"
          >
            <Link
              to="/dashboard/bookings/create"
              className="flex justify-center items-center gap-2 w-full h-full py-4 px-4"
            >
              إضافة حجز جديد
              <FiPlus size={20} />
            </Link>
          </Button>
        )}
      </div>
      <BookingsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default BookingsFilter;
