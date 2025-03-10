import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import DataTable from "@/components/ui/DataTable";
import ClinicsTableHeader from "./ClinicsTableHeader";
import ClinicsTableActions from "./ClinicsTableActions";
import ClinicsList from "./ClinicsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useDebounce";

const ClinicsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const {
    data: clinics,
    isLoading,
    isError,
  } = useGetAllClinics({ token, search });

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
        <ClinicsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<ClinicsTableHeader />}
      list={<ClinicsList clinics={clinics?.data || []} />}
      skeleton={<TableSkeleton columns={3} rows={8} />}
    />
  );
};

export default ClinicsTable;
