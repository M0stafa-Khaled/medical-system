import DataTable from "@/components/ui/DataTable";
import DrugsHeader from "./DrugsHeader";
import { useEffect } from "react";
import cookieServices from "@/utils/cookieServices";
import DrugsTableHeader from "./DrugsTableHeader";
import DrugsList from "./DrugsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { useGetALlDrugs } from "@/lib/react-query/main";

const DrugsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;

  const {
    data: drugs,
    isLoading,
    isError,
  } = useGetALlDrugs({ page, token, search });

  useEffect(() => {
    if (drugs?.message && !drugs.status) toast.error(drugs.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [drugs?.message, isError, drugs?.status]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<DrugsHeader />}
      tableHeader={<DrugsTableHeader />}
      list={
        <DrugsList
          drugs={drugs?.data?.items || []}
          meta={drugs?.data && drugs.data?.meta}
        />
      }
      skeleton={<TableSkeleton columns={2} rows={6} showButtons={false} />}
      pagination={
        drugs?.data && {
          meta: drugs.data?.meta,
        }
      }
    />
  );
};

export default DrugsTable;
