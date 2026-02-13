import DataTable from "@/components/ui/DataTable";
import { useEffect } from "react";
import cookieServices from "@/utils/cookieServices";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllAnalysis } from "@/lib/react-query/main";
import AnalysisHeader from "./AnalysisHeader";
import AnalysisTableHeader from "./AnalyticsTableHeader";
import AnalysisList from "./AnalysisList";

const AnalysisTable = () => {
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

  return (
    <DataTable
      isLoading={isLoading}
      header={<AnalysisHeader />}
      tableHeader={<AnalysisTableHeader />}
      list={
        <AnalysisList
          analytics={analysis?.data?.items || []}
          meta={analysis?.data && analysis.data?.meta}
        />
      }
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      pagination={
        analysis?.data && {
          meta: analysis.data?.meta,
        }
      }
    />
  );
};

export default AnalysisTable;
