import { PERMISSIONS } from "@/shared/enums/permissions";
import SearchInput from "../../../../shared/components/ui/SearchInput";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";

const EmployeesHeader = () => {
  const canCreateEmployee = useHasPermission(PERMISSIONS.ADD_EMPLOYEE);
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreateEmployee && (
        <Button asChild size={"lg"}>
          <Link to="/dashboard/employees/create" className="dark:btn-primary">
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
