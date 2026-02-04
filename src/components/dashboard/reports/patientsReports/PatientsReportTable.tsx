import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import PatientsReportTableHeader from "./PatientsReportTableHeader";
import PatientsReportList from "./PatientsReportList";
import PatientsReportHeader from "./PatientsReportHeader";
import { useGetPatientsReport } from "@/lib/react-query/dashboard/reports";
import { IPatientsReportFilter } from "@/interfaces/dashboard/reports";

const PatientsReportTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IPatientsReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      q: searchParams.get("q") || "",
    }),
    [searchParams]
  );

  const q = useDebounce(filters.q, 500);

  const {
    data: patients,
    isLoading,
    isError,
  } = useGetPatientsReport({
    token,
    page,
    filter: {
      ...(filters.q && { q }),
    },
    ...(filters.start_at ? { start_at: filters.start_at } : {}),
    ...(filters.end_at ? { end_at: filters.end_at } : {}),
  });

  useEffect(() => {
    if (patients?.message && !patients.status) toast.error(patients.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [patients?.message, patients?.status, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<PatientsReportHeader filters={filters} />}
      tableHeader={<PatientsReportTableHeader />}
      list={<PatientsReportList patients={patients?.data?.items || []} />}
      skeleton={<TableSkeleton columns={7} rows={6} showButtons={false} />}
      pagination={
        patients?.data && {
          meta: patients.data?.meta,
        }
      }
    />
  );
};

export default PatientsReportTable;
