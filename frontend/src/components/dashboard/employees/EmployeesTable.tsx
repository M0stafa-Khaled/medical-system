import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import EmployeesList from "./EmployeesList";
import EmployeesTableHeader from "./EmployeesTableHeader";
import { useGetAllEmployees } from "@/lib/react-query/dashboard/employees";
import EmployeesTableActions from "./EmployeesTableActions";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const EmployeesTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

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

  return (
    <DataTable
      isLoading={isLoading}
      actions={
        <EmployeesTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<EmployeesTableHeader />}
      list={
        <EmployeesList
          meta={employees?.data && employees.data?.meta}
          employees={employees?.data?.items || []}
        />
      }
      skeleton={
        <TableSkeleton columns={5} rows={6} hasImage actionButtons={3} />
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
