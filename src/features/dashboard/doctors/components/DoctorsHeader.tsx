import { PERMISSIONS } from "@/shared/enums/permissions";
import SearchInput from "../../../../shared/components/ui/SearchInput";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";

export const DoctorsHeader = () => {
  const canCreateDoctor = useHasPermission(PERMISSIONS.ADD_DOCTOR);
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreateDoctor && (
        <Button size={"lg"} className="dark:btn-primary" asChild>
          <Link to="/dashboard/doctors/create">
            إضافة طبيب جديد
            <FiPlus size={20} />
          </Link>
        </Button>
      )}
      <SearchInput placeholder="ابحث عن طبيب" />
    </div>
  );
};
