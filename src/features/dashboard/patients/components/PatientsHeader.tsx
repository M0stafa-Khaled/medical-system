import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../../../../shared/components/ui/SearchInput";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";

export const PatientsHeader = () => {
  const canCreatePatient = useHasPermission(PERMISSIONS.ADD_PATIENT);
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreatePatient && (
        <Button size={"lg"} className="dark:btn-primary" asChild>
          <Link to="/dashboard/patients/create">
            إضافة مريض جديد
            <FiPlus size={20} />
          </Link>
        </Button>
      )}
      <SearchInput placeholder="ابحث بالاسم او رقم الهاتف" />
    </div>
  );
};
