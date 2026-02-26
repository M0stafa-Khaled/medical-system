import { useGetAllClinics } from "../queriesAndMutations";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { DataTable } from "@/shared/components/data-table";
import { useClinicsColumns } from "@/features/dashboard/clinics/components/ClinicsColumns";

export const ClinicsTable = () => {
  const { data: clinics, isLoading, isError } = useGetAllClinics({});

  useEffect(() => {
    if (clinics?.message && !clinics?.status) toast.error(clinics.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [clinics?.message, isError, clinics?.status]);

  const canUpdateClinic = useHasPermission(PERMISSIONS.UPDATE_CLINIC);
  const canDeleteClinic = useHasPermission(PERMISSIONS.DELETE_CLINIC);
  const columns = useClinicsColumns();

  return (
    <DataTable
      data={clinics?.data || []}
      columns={columns}
      isLoading={isLoading}
      skeleton={
        <TableSkeleton
          columns={canDeleteClinic || canUpdateClinic ? 3 : 2}
          rows={8}
        />
      }
    />
  );
};
