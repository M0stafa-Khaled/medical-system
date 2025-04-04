import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import EmployeesList from "./EmployeesList";
import EmployeesTableHeader from "./EmployeesTableHeader";
import { useGetAllEmployees } from "@/lib/react-query/dashboard/employees";
import EmployeesHeader from "./EmployeesHeader";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";

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
    if (employees?.message) toast.error(employees.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [employees?.message, isError]);

  const canUpdateEmployee = useHasPermission(PERMISSIONS.UPDATE_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const canViewEmployee = useHasPermission(PERMISSIONS.VIEW_EMPLOYEE);

  return (
    <DataTable
      isLoading={isLoading}
      header={<EmployeesHeader />}
      tableHeader={<EmployeesTableHeader />}
      list={
        <EmployeesList
          meta={employees?.data && employees.data?.meta}
          employees={employees?.data?.items || []}
        />
      }
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
      pagination={
        employees?.data && {
          meta: employees.data?.meta,
        }
      }
    />
  );
};

export default EmployeesTable;
