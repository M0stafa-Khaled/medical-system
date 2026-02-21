import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { IPrescriptionsFilter } from "@/features/dashboard/prescriptions/types";
import { useGetAllPrescriptions } from "@/features/dashboard/prescriptions/queriesAndMutations.ts";
import { DataTable } from "@/shared/components/data-table";
import { usePrescriptionsColumns } from "./PrescriptionsColumns";

export const PrescriptionsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IPrescriptionsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      clinic: searchParams.get("clinic") || "",
      date: searchParams.get("date") || "",
    }),
    [searchParams]
  );

  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);

  const {
    data: prescriptions,
    isLoading,
    isError,
  } = useGetAllPrescriptions({
    token,
    page,
    filter: {
      ...(filters.doctor && { doctor }),
      ...(filters.patient && { patient }),
      ...(filters.date && { date: filters.date }),
      ...(filters.clinic !== "all" &&
        filters.clinic !== "" && {
          clinic: filters.clinic,
        }),
    },
  });

  useEffect(() => {
    if (prescriptions?.message && !prescriptions.status)
      toast.error(prescriptions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [prescriptions?.message, prescriptions?.status, isError]);

  const canUpdatePrescription = useHasPermission(
    PERMISSIONS.UPDATE_PRESCRIPTION
  );
  const canDeletePrescription = useHasPermission(
    PERMISSIONS.DELETE_PRESCRIPTION
  );
  const canViewPrescription = useHasPermission(PERMISSIONS.VIEW_PRESCRIPTION);

  const columns = usePrescriptionsColumns({ meta: prescriptions?.data.meta });
  return (
    <DataTable
      data={prescriptions?.data.items || []}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="لا يوجد روشتات"
      skeleton={
        <TableSkeleton
          columns={
            canUpdatePrescription ||
            canDeletePrescription ||
            canViewPrescription
              ? 5
              : 4
          }
          rows={6}
          actionButtons={4}
        />
      }
      meta={prescriptions?.data?.meta}
    />
  );
};
