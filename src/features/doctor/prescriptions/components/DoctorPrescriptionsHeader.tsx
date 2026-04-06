import { Button } from "@/shared/components/ui/button";
import { Filter } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router";
import DoctorPrescriptionsFilters from "./DoctorPrescriptionsFilters";

export const DoctorPrescriptionsHeader = () => {
  const [, setSearchParams] = useSearchParams();
  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
          <Button className="dark:btn-primary" size={"lg"} asChild>
            <Link to={"/doctor/prescriptions/create"}>
              إضافة روشتة جديدة
              <FiPlus size={20} />
            </Link>
          </Button>
          <div className="text-lg font-semibold">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex h-auto items-center gap-2 py-3"
        >
          <Filter className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>
      <DoctorPrescriptionsFilters />
    </div>
  );
};
