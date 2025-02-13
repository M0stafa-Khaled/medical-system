import { useSearch } from "@/hooks/useSearch";
import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetAllPatients } from "@/lib/react-query/patients";
import PatientsTableActions from "./PatientsTableActions";
import PatientsTableHeader from "./PatientsTableHeader";
import PatientsList from "./PatientsList";

const PatientsTable = () => {
  const token = cookieServices.getToken();

  const {
    data: patients,
    isLoading,
    isError,
  } = useGetAllPatients(token as string);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    patients?.data
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
      actions={
        <PatientsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<PatientsTableHeader />}
      list={<PatientsList patients={filteredItems} />}
      skeleton={<TableSkeleton columns={4} rows={6} actionButtons={3} />}
    />
  );
};

export default PatientsTable;
