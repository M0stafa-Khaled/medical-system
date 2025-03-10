import DataTable from "@/components/ui/DataTable";
import DrugsTableActions from "./DrugsTableActions";
import { useEffect, useState } from "react";
import cookieServices from "@/utils/cookieServices";
import DrugsTableHeader from "./DrugsTableHeader";
import DrugsList from "./DrugsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { useGetALlMedications } from "@/lib/react-query/dashboard/medications";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const DrugsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchTerm, 500);

  const {
    data: drugs,
    isLoading,
    isError,
  } = useGetALlMedications({ page, token, search });

  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [isError]);

  return (
    <DataTable
      isLoading={isLoading}
      actions={
        <DrugsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<DrugsTableHeader />}
      list={
        <DrugsList
          medications={drugs?.data.items || []}
          meta={drugs?.data && drugs.data.meta}
        />
      }
      skeleton={<TableSkeleton columns={2} rows={6} showButtons={false} />}
      pagination={
        drugs?.data && {
          meta: drugs.data.meta,
        }
      }
    />
  );
};

export default DrugsTable;
