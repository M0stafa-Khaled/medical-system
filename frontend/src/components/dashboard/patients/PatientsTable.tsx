import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import PatientsList from "./PatientsList";
import PatientsTableHeader from "./PatientsTableHeader";
import { useGetAllPatients } from "@/lib/react-query/dashboard/patients";
import PatientsHeader from "./PatientsHeader";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const PatientsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: patients,
    isLoading,
    isError,
  } = useGetAllPatients({ token, page, search });

  useEffect(() => {
    if (patients?.message) toast.error(patients.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [patients?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<PatientsHeader />}
      tableHeader={<PatientsTableHeader />}
      list={
        <PatientsList
          meta={patients?.data && patients.data?.meta}
          patients={patients?.data?.items || []}
        />
      }
      skeleton={<TableSkeleton columns={4} rows={6} actionButtons={3} />}
      pagination={
        patients?.data && {
          meta: patients.data?.meta,
        }
      }
    />
  );
};

export default PatientsTable;
