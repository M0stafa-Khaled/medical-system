import DataTable from "@/shared/components/ui/DataTable";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import PatientsList from "./PatientsList";
import PatientsTableHeader from "./PatientsTableHeader";
import { useGetAllPatients } from "@/shared/lib/react-query/dashboard/patients";
import PatientsHeader from "./PatientsHeader";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

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
    if (patients?.message && !patients.status) toast.error(patients.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [patients?.message, patients?.status, isError]);

  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);
  const canViewPatient = useHasPermission(PERMISSIONS.VIEW_PATIENT);

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
      skeleton={
        <TableSkeleton
          columns={
            canDeletePatient || canViewPatient || canUpdatePatient ? 4 : 3
          }
          rows={6}
          actionButtons={3}
        />
      }
      pagination={
        patients?.data && {
          meta: patients.data?.meta,
        }
      }
    />
  );
};

export default PatientsTable;
