import DataTable from "@/components/ui/DataTable";
import AnalyticsHeader from "./analyticsHeader";
import { useEffect } from "react";
import cookieServices from "@/utils/cookieServices";
import AnalyticsTableHeader from "./analyticsTableHeader";
import AnalyticsList from "./analyticsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllAnalytics } from "@/lib/react-query/main";

const AnalyticsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;

  const {
    data: analytics,
    isLoading,
    isError,
  } = useGetAllAnalytics({ page, token, search });

  useEffect(() => {
    if (analytics?.message) toast.error(analytics.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [analytics?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<AnalyticsHeader />}
      tableHeader={<AnalyticsTableHeader />}
      list={
        <AnalyticsList
          analytics={analytics?.data?.items || []}
          meta={analytics?.data && analytics.data?.meta}
        />
      }
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      pagination={
        analytics?.data && {
          meta: analytics.data?.meta,
        }
      }
    />
  );
};

export default AnalyticsTable;
