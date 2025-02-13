import { useSearch } from "@/hooks/useSearch";
import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import PatientsTableActions from "../patients/PatientsTableActions";
import EmployeesList from "./EmployeesList";
import EmployeesTableHeader from "./EmployeesTableHeader";
import { useGetAllEmployees } from "@/lib/react-query/employees";

const EmployeesTable = () => {
  const token = cookieServices.getToken();

  const {
    data: employees,
    isLoading,
    isError,
  } = useGetAllEmployees(token as string);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    employees?.data
  );

  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [isError]);

  return (
    <DataTable
      isLoading={isLoading}
      caption="الموظفين"
      actions={
        <PatientsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<EmployeesTableHeader />}
      list={<EmployeesList employees={filteredItems} />}
      skeleton={
        <TableSkeleton columns={6} rows={6} hasImage actionButtons={3} />
      }
    />
  );
};

export default EmployeesTable;
