import { useSearch } from "@/hooks/useSearch";
import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import PatientsList from "./PatientsList";
import PatientsTableHeader from "./PatientsTableHeader";
import { useGetAllPatients } from "@/lib/react-query/patients";
import PatientsTableActions from "./PatientsTableActions";
import { useSearchParams } from "react-router-dom";

const PatientsTable = () => {
  const token = cookieServices.getToken();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: patients,
    isLoading,
    isError,
  } = useGetAllPatients(token as string, page);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    patients?.data.items
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
      skeleton={
        <TableSkeleton columns={6} rows={6} hasImage actionButtons={3} />
      }
      pagination={patients?.data && {
        links: patients.data.links
      }}
    />
  );
};

export default PatientsTable;
