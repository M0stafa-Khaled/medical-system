import { useGetAllClinics } from "@/lib/react-query/clinics";
import { useSearch } from "@/hooks/useSearch";
import DataTable from "@/components/ui/DataTable";
import ClinicsTableHeader from "./ClinicsTableHeader";
import ClinicsTableActions from "./ClinicsTableActions";
import ClinicsList from "./ClinicsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";

const ClinicsTable = () => {
  const token = cookieServices.getToken();

  const { data: clinics, isLoading } = useGetAllClinics(token as string);
  const { filteredItems, searchTerm, setSearchTerm } = useSearch(clinics?.data);

  return (
    <DataTable
      isLoading={isLoading}
      caption="العيادات"
      actions={
        <ClinicsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<ClinicsTableHeader />}
      list={<ClinicsList clinics={filteredItems} />}
      skeleton={<TableSkeleton columns={3} rows={8} />}
    />
  );
};

export default ClinicsTable;
