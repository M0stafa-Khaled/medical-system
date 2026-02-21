import { useEffect } from "react";
import cookieServices from "@/shared/utils/cookieServices";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { useGetAllAnalysis } from "../queries";
import { DataTable } from "@/shared/components/data-table";
import { useAnalysisColumns } from "./AnalysisColumns";

export const AnalysisTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;

  const {
    data: analysis,
    isLoading,
    isError,
  } = useGetAllAnalysis({ page, token, search });

  useEffect(() => {
    if (analysis?.message && !analysis.status) toast.error(analysis.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [analysis?.message, analysis?.status, isError]);

  const columns = useAnalysisColumns({ meta: analysis?.data.meta });
  return (
    <DataTable
      data={analysis?.data.items || []}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="لا يوجد تحاليل"
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      meta={analysis?.data?.meta}
    />
  );
};
