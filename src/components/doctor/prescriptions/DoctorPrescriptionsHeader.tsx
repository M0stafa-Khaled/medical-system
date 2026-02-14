import { Button } from "@/shared/components/ui/button";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { IPrescriptionsFilter } from "@/interfaces/dashboard/prescription";
import DoctorPrescriptionsFilters from "./DoctorPrescriptionsFilters";

interface IProps {
  filters: IPrescriptionsFilter;
  setFilters: (filters: IPrescriptionsFilter) => void;
}

const DoctorPrescriptionsHeader = ({ filters, setFilters }: IProps) => {
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
      patient: "",
      clinic: "",
      date: "",
    });
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
          <Button className="h-auto px-0 py-0">
            <Link
              to={"/doctor/prescriptions/create"}
              className="flex h-full w-full items-center justify-center gap-2 px-4 py-3"
            >
              إضافة روشتة جديدة
              <FiPlus size={20} />
            </Link>
          </Button>
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex h-auto items-center gap-2 py-3"
        >
          <Eraser className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>
      <DoctorPrescriptionsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default DoctorPrescriptionsHeader;
