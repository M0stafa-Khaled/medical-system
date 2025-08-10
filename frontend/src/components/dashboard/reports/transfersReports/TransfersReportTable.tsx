import DataTable from "@/components/ui/DataTable";
import TransfersReportsTableHeader from "./TransfersReportsTableHeader";
import TransfersReportHeader from "./TransfersReportHeader";
import TransfersReportList from "./TransfersReportList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetTransfersReport } from "@/lib/react-query/dashboard/reports";
import { ITransfersReportFilter } from "@/interfaces/dashboard/reports";

const TransfersReportTable = () => {
  const token = cookieServices.getToken()!;
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
    token,
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
  return (
    <DataTable
      isLoading={isLoading}
      header={<TransfersReportHeader filters={filters} />}
      tableHeader={<TransfersReportsTableHeader />}
      list={<TransfersReportList transfers={transfers?.data?.items || []} />}
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      pagination={
        transfers?.data && {
          meta: transfers.data?.meta,
        }
      }
    />
  );
};

export default TransfersReportTable;
