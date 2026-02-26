import { useEffect } from "react";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { useGetAllScans } from "../queries";
import { DataTable } from "@/shared/components/data-table";
import { useScansColumns } from "./ScansColumns";

export const ScansTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;

  const { data: scans, isLoading, isError } = useGetAllScans({ page, search });

  useEffect(() => {
    if (scans?.message && !scans.status) toast.error(scans.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [scans?.message, scans?.status, isError]);

  const columns = useScansColumns({ meta: scans?.data.meta });

  return (
    <DataTable
      isLoading={isLoading}
      data={scans?.data.items || []}
      columns={columns}
      skeleton={<TableSkeleton columns={3} rows={6} showButtons={false} />}
      meta={scans?.data?.meta}
    />
  );
};
