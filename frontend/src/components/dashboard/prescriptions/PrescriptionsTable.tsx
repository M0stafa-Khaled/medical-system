import DataTable from "@/components/ui/DataTable";
import PrescriptionsTableHeader from "./PrescriptionsTableHeader";
import PrescriptionsHeader from "./PrescriptionsHeader";
import PrescriptionsList from "./PrescriptionsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { IPrescriptionsFilter } from "@/interfaces/dashboard/prescription";
import { useGetAllPrescriptions } from "@/lib/react-query/dashboard/prescriptions";

const PrescriptionsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();
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

  const setFilters = (newFilters: IPrescriptionsFilter) => {
    const params = new URLSearchParams(searchParams);

    // Update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

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

  return (
    <DataTable
      isLoading={isLoading}
      header={<PrescriptionsHeader filters={filters} setFilters={setFilters} />}
      tableHeader={<PrescriptionsTableHeader />}
      list={
        <PrescriptionsList prescriptions={prescriptions?.data?.items || []} />
      }
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
      pagination={
        prescriptions?.data && {
          meta: prescriptions.data?.meta,
        }
      }
    />
  );
};

export default PrescriptionsTable;
