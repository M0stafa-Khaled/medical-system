import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { IPatientsReportFilter } from "../../types";
import { useGetPatientsReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { usePatientsReportColumns } from "./PatientsReportColumns";

export const PatientsReportTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IPatientsReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      q: searchParams.get("q") || "",
    }),
    [searchParams]
  );

  const q = useDebounce(filters.q, 500);

  const {
    data: patients,
    isLoading,
    isError,
  } = useGetPatientsReport({
    page,
    filter: {
      ...(filters.q && { q }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (patients?.message && !patients.status) toast.error(patients.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [patients?.message, patients?.status, isError]);

  const columns = usePatientsReportColumns();

  return (
    <DataTable
      isLoading={isLoading}
      data={patients?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={7} rows={6} showButtons={false} />}
      meta={patients?.data.meta}
    />
  );
};
