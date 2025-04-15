import RefetchDateButton from "@/components/RefetchDateButton";
import { Button } from "@/components/ui/button";
import Query_Keys from "@/enums/queryKeys";
import { format } from "date-fns";
import { Eraser } from "lucide-react";
import PatientBookingsFilters from "./PatientBookingsFilters";
import { ar } from "date-fns/locale";
import { IPatientBookingsFilter } from "@/interfaces/patient/patientBookings";
import CreatePatientBooking from "./CreatePatientBooking";

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
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-4 ">
          <CreatePatientBooking />
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <div className="flex gap-2">
          <RefetchDateButton
            isLoading={isLoading}
            queryKey={Query_Keys.GET_ALL_PATIENT_BOOKINGS}
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
      <PatientBookingsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default PatientBookingsHeader;
