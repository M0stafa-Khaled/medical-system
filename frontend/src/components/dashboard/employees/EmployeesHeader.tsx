import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../SearchInput";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmployeesHeader = () => {
  const canCreateEmployee = useHasPermission(PERMISSIONS.ADD_EMPLOYEE);
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canCreateEmployee && (
        <Button className=" h-auto py-0 px-0">
          <Link
            to="/dashboard/employees/create"
            className="flex justify-center items-center gap-2 w-full h-full py-3 px-4"
          >
            إضافة موظف جديد
            <FiPlus size={20} />
          </Link>
        </Button>
      )}
      <SearchInput placeholder="ابحث عن موظف" />
    </div>
  );
};

export default EmployeesHeader;
