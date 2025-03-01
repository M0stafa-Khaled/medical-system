import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import PatientsList from "./PatientsList";
import PatientsTableHeader from "./PatientsTableHeader";
import { useGetAllPatients } from "@/lib/react-query/patients";
import PatientsTableActions from "./PatientsTableActions";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const PatientsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const {
    data: patients,
    isLoading,
    isError,
  } = useGetAllPatients({ token, page, search });

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
        <PatientsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<PatientsTableHeader />}
      list={
        <PatientsList
          meta={patients?.data && patients.data.meta}
          patients={patients?.data.items || []}
        />
      }
      skeleton={
        <TableSkeleton columns={6} rows={6} hasImage actionButtons={3} />
      }
      pagination={
        patients?.data && {
          meta: patients.data.meta,
        }
      }
    />
  );
};

export default PatientsTable;
