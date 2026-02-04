import { PERMISSIONS } from "@/enums/permissions";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IPrescriptionsFilter } from "@/interfaces/dashboard/prescription";
import PrescriptionsFilters from "./PrescriptionsFilters";

interface IProps {
  filters: IPrescriptionsFilter;
  setFilters: (filters: IPrescriptionsFilter) => void;
}

const PrescriptionsHeader = ({ filters, setFilters }: IProps) => {
  const canCreatePrescription = useHasPermission(PERMISSIONS.ADD_PRESCRIPTION);
  const handleClearFilters = () => {
    setFilters({
      doctor: "",
      patient: "",
      clinic: "",
      date: "",
    });
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-4 ">
          {canCreatePrescription && (
            <Button className="h-auto py-0 px-0">
              <Link
                to={"/dashboard/prescriptions/create"}
                className="flex justify-center items-center gap-2 w-full h-full py-3 px-4"
              >
                إضافة روشتة جديدة
                <FiPlus size={20} />
              </Link>
            </Button>
          )}
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
      <PrescriptionsFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default PrescriptionsHeader;
