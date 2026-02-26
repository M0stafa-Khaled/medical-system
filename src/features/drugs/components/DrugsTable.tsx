import { useEffect } from "react";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { useGetALlDrugs } from "../queries";
import { DataTable } from "@/shared/components/data-table";
import { useDrugsColumns } from "./DrugsColumns";

export const DrugsTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;

  const { data: drugs, isLoading, isError } = useGetALlDrugs({ page, search });

  useEffect(() => {
    if (drugs?.message && !drugs.status) toast.error(drugs.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [drugs?.message, isError, drugs?.status]);

  const columns = useDrugsColumns({ meta: drugs?.data.meta });

  return (
    <DataTable
      data={drugs?.data.items || []}
      columns={columns}
      isLoading={isLoading}
      skeleton={<TableSkeleton columns={2} rows={6} showButtons={false} />}
      meta={drugs?.data?.meta}
    />
  );
};
