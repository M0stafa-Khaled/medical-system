import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetAllEmployees } from "@/lib/react-query/dashboard/employees";
import EmployeesHeader from "./EmployeesHeader";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/useDebounce";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { DataTable } from "@/components/shared/data-table";
import { useEmployeesColumns } from "./employeeColumns";

const EmployeesTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const search = useDebounce(searchParams.get("q"), 500)!;

  const {
    data: employees,
    isLoading,
    isError,
  } = useGetAllEmployees({ token, page, search });

  useEffect(() => {
    if (employees?.message && !employees.status) toast.error(employees.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [employees?.message, employees?.status, isError]);

  const canUpdateEmployee = useHasPermission(PERMISSIONS.UPDATE_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const canViewEmployee = useHasPermission(PERMISSIONS.VIEW_EMPLOYEE);
  const columns = useEmployeesColumns({ meta: employees?.data.meta });
  return (
    <>
      <EmployeesHeader />
      <DataTable
        columns={columns}
        data={employees?.data.items || []}
        isLoading={isLoading}
        skeleton={
          <TableSkeleton
            columns={
              canViewEmployee || canDeleteEmployee || canUpdateEmployee ? 5 : 4
            }
            rows={6}
            hasImage
            actionButtons={3}
          />
        }
        emptyMessage="لا يوجد موظفين"
        meta={employees?.data.meta}
      />
    </>
  );
};

export default EmployeesTable;
