import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { IPrescriptionsFilter } from "@/features/dashboard/prescriptions/types";
import { useGetAllDoctorPrescriptions } from "@/features/doctor";
import { DataTable } from "@/shared/components/data-table";
import { useDoctorPrescriptionsColumns } from "./DoctorPrescriptionsColumns";

export const DoctorPrescriptionsTable = () => {
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
  } = useGetAllDoctorPrescriptions({
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

  const columns = useDoctorPrescriptionsColumns({
    meta: prescriptions?.data.meta,
  });
  return (
    <DataTable
      isLoading={isLoading}
      data={prescriptions?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={5} rows={6} actionButtons={4} />}
      meta={prescriptions?.data?.meta}
    />
  );
};
