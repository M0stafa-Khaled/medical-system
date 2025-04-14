import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import DataTable from "@/components/ui/DataTable";
import ClinicsTableHeader from "./ClinicsTableHeader";
import ClinicsHeader from "./ClinicsHeader";
import ClinicsList from "./ClinicsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const ClinicsTable = () => {
  const token = cookieServices.getToken()!;
  const { data: clinics, isLoading, isError } = useGetAllClinics({ token });

  useEffect(() => {
    if (clinics?.message && !clinics?.status) toast.error(clinics.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [clinics?.message, isError, clinics?.status]);

  const canUpdateClinic = useHasPermission(PERMISSIONS.UPDATE_CLINIC);
  const canDeleteClinic = useHasPermission(PERMISSIONS.DELETE_CLINIC);

  return (
    <DataTable
      isLoading={isLoading}
      header={<ClinicsHeader />}
      tableHeader={<ClinicsTableHeader />}
      list={<ClinicsList clinics={clinics?.data || []} />}
      skeleton={
        <TableSkeleton
          columns={canDeleteClinic || canUpdateClinic ? 3 : 2}
          rows={8}
        />
      }
    />
  );
};

export default ClinicsTable;
