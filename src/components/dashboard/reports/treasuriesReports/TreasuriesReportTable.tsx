import DataTable from "@/components/ui/DataTable";
import TreasuriesReportsTableHeader from "./TreasuriesReportsTableHeader";
import ITreasuriesReportFilterReportHeader from "./TreasuriesReportHeader";
import TransfersReportList from "./TreasuriesReportList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/useDebounce";
import { useGetTreasuriesReport } from "@/lib/react-query/dashboard/reports";
import { ITreasuriesReportFilter } from "@/interfaces/dashboard/reports";

const TransfersReportTable = () => {
  const token = cookieServices.getToken()!;
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
    token,
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
  return (
    <DataTable
      isLoading={isLoading}
      header={<ITreasuriesReportFilterReportHeader filters={filters} />}
      tableHeader={<TreasuriesReportsTableHeader />}
      list={
        <TransfersReportList
          treasuriesReports={treasuries?.data?.items || []}
        />
      }
      skeleton={<TableSkeleton columns={5} rows={6} showButtons={false} />}
      pagination={
        treasuries?.data && {
          meta: treasuries.data?.meta,
        }
      }
    />
  );
};

export default TransfersReportTable;
