import DataTable from "@/components/ui/DataTable";
import ScansHeader from "./ScansHeader";
import { useEffect } from "react";
import cookieServices from "@/utils/cookieServices";
import ScansTableHeader from "./ScansTableHeader";
import ScansList from "./ScansList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllScans } from "@/lib/react-query/main";

const ScansTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;

  const {
    data: scans,
    isLoading,
    isError,
  } = useGetAllScans({ page, token, search });

  useEffect(() => {
    if (scans?.message) toast.error(scans.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [scans?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<ScansHeader />}
      tableHeader={<ScansTableHeader />}
      list={
        <ScansList
          scans={scans?.data?.items || []}
          meta={scans?.data && scans.data?.meta}
        />
      }
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      pagination={
        scans?.data && {
          meta: scans.data?.meta,
        }
      }
    />
  );
};

export default ScansTable;
