import RefetchDataButton from "@/shared/components/RefetchDataButton";
import { Button } from "@/shared/components/ui/button";
import Query_Keys from "@/shared/enums/queryKeys";
import { format } from "date-fns";
import { Eraser } from "lucide-react";
import PatientBookingsFilters from "./PatientBookingsFilters";
import { ar } from "date-fns/locale";
import { IPatientBookingsFilter } from "@/interfaces/patient/patientBookings";
import { Link } from "react-router";
import { FiPlus } from "react-icons/fi";

interface IProps {
  filters: IPatientBookingsFilter;
  setFilters: (filters: IPatientBookingsFilter) => void;
  isLoading: boolean;
}
const PatientBookingsHeader = ({ filters, isLoading, setFilters }: IProps) => {
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
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
          <Button className="h-auto px-0 py-0">
            <Link
              to={"/bookings/create"}
              className="flex h-full w-full items-center justify-center gap-2 px-4 py-3"
            >
              إضافة حجز جديد
              <FiPlus size={20} />
            </Link>
          </Button>
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <div className="flex gap-2">
          <RefetchDataButton
            isLoading={isLoading}
            queryKey={Query_Keys.GET_ALL_PATIENT_BOOKINGS}
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
      <PatientBookingsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default PatientBookingsHeader;
