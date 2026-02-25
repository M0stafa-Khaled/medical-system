import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { ITreasuriesReportFilter } from "../../types";
import { useGetTreasuriesReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useTreasuriesReportColumns } from "./TreasuriesReportColumns";

export const TreasuriesReportTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: ITreasuriesReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      type: searchParams.get("type") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const treasury = useDebounce(filters.treasury, 500);

  const {
    data: treasuries,
    isLoading,
    isError,
  } = useGetTreasuriesReport({
    page,
    filter: {
      ...(filters.treasury && { treasury }),
      ...(filters.type && filters.type !== "all" && { type: filters.type }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (treasuries?.message && !treasuries.status)
      toast.error(treasuries.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [treasuries?.message, isError, treasuries?.status]);

  const columns = useTreasuriesReportColumns();
  return (
    <DataTable
      isLoading={isLoading}
      data={treasuries?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={5} rows={6} showButtons={false} />}
      meta={treasuries?.data?.meta}
    />
  );
};
