import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { DataTable } from "@/shared/components/data-table";
import { usePatientsColumns } from "./PatientsColumns";
import { useGetAllPatients } from "../queriesAndMutations";

export const PatientsTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: patients,
    isLoading,
    isError,
  } = useGetAllPatients({ page, search });

  useEffect(() => {
    if (patients?.message && !patients.status) toast.error(patients.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [patients?.message, patients?.status, isError]);

  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);
  const canViewPatient = useHasPermission(PERMISSIONS.VIEW_PATIENT);

  const columns = usePatientsColumns({ meta: patients?.data.meta });
  return (
    <DataTable
      data={patients?.data.items || []}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="لا يوجد مرضى"
      skeleton={
        <TableSkeleton
          columns={
            canDeletePatient || canViewPatient || canUpdatePatient ? 4 : 3
          }
          rows={6}
          actionButtons={3}
        />
      }
      meta={patients?.data?.meta}
    />
  );
};
