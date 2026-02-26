import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetAllEmployees } from "../queriesAndMutations";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { DataTable } from "@/shared/components/data-table";
import { useEmployeesColumns } from "./EmployeesColumns";

export const EmployeesTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const search = useDebounce(searchParams.get("q"), 500)!;

  const {
    data: employees,
    isLoading,
    isError,
  } = useGetAllEmployees({ page, search });

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
  );
};
