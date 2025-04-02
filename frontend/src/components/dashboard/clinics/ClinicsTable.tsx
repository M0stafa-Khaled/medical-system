import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import DataTable from "@/components/ui/DataTable";
import ClinicsTableHeader from "./ClinicsTableHeader";
import ClinicsHeader from "./ClinicsHeader";
import ClinicsList from "./ClinicsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ClinicsTable = () => {
  const token = cookieServices.getToken()!;
  const { data: clinics, isLoading, isError } = useGetAllClinics({ token });
  useEffect(() => {
    if (clinics?.message) toast.error(clinics.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [clinics?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<ClinicsHeader />}
      tableHeader={<ClinicsTableHeader />}
      list={<ClinicsList clinics={clinics?.data || []} />}
      skeleton={<TableSkeleton columns={3} rows={8} />}
    />
  );
};

export default ClinicsTable;
