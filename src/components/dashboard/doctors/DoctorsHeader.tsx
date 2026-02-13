import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../../ui/SearchInput";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";

const DoctorsHeader = () => {
  const canCreateDoctor = useHasPermission(PERMISSIONS.ADD_DOCTOR);
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreateDoctor && (
        <Button className="h-auto px-0 py-0">
          <Link
            to="/dashboard/doctors/create"
            className="flex h-full w-full items-center justify-center gap-2 px-4 py-3"
          >
            إضافة طبيب جديد
            <FiPlus size={20} />
          </Link>
        </Button>
      )}
      <SearchInput placeholder="ابحث عن طبيب" />
    </div>
  );
};

export default DoctorsHeader;
