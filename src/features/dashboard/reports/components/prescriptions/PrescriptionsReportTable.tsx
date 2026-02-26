import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { IPrescriptionsReportFilter } from "../../types";
import { useGetPrescriptionsReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { usePrescriptionsReportColumns } from "./PrescriptionsReportColumns";

export const PrescriptionsReportTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IPrescriptionsReportFilter = useMemo(
    () => ({
      patient: searchParams.get("patient") || "",
      doctor: searchParams.get("doctor") || "",
      clinic: searchParams.get("clinic") || "",
      date: searchParams.get("date") || "",
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
    }),
    [searchParams]
  );

  const patient = useDebounce(filters.patient, 500);
  const doctor = useDebounce(filters.doctor, 500);

  const {
    data: prescriptions,
    isLoading,
    isError,
  } = useGetPrescriptionsReport({
    page,
    filter: {
      ...(filters.patient && { patient }),
      ...(filters.doctor && { doctor }),
      ...(filters.date && { date: filters.date }),
      ...(filters.clinic !== "all" &&
        filters.clinic !== "" && {
          clinic: filters.clinic,
        }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (prescriptions?.message && !prescriptions.status)
      toast.error(prescriptions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [prescriptions?.message, prescriptions?.status, isError]);

  const columns = usePrescriptionsReportColumns();

  return (
    <DataTable
      isLoading={isLoading}
      data={prescriptions?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={8} rows={6} showButtons={false} />}
      meta={prescriptions?.data?.meta}
    />
  );
};
