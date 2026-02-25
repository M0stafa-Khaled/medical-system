import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { ITransfersReportFilter } from "../../types";
import { useGetTransfersReport } from "../../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useTransfersReportColumns } from "./TransfersReportColumns";

export const TransfersReportTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: ITransfersReportFilter = useMemo(
    () => ({
      employee: searchParams.get("employee") || "",
      end_at: searchParams.get("end_at") || "",
      start_at: searchParams.get("start_at") || "",
      from_treasury: searchParams.get("from_treasury") || "",
      to_treasury: searchParams.get("to_treasury") || "",
    }),
    [searchParams]
  );

  const employee = useDebounce(filters.employee, 500);

  const {
    data: transfers,
    isLoading,
    isError,
  } = useGetTransfersReport({
    page,
    filter: {
      ...(filters.from_treasury && { from_treasury: filters.from_treasury }),
      ...(filters.to_treasury && { to_treasury: filters.to_treasury }),
      ...(filters.employee && { employee }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (transfers?.message && !transfers.status) toast.error(transfers.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transfers?.message, isError, transfers?.status]);

  const columns = useTransfersReportColumns();
  return (
    <DataTable
      isLoading={isLoading}
      data={transfers?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      meta={transfers?.data.meta}
    />
  );
};
