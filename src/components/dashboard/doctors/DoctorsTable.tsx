import { useGetAllDoctors } from "@/shared/lib/react-query/dashboard/doctors/doctors";
import DataTable from "@/shared/components/ui/DataTable";
import DoctorsTableHeader from "./DoctorsTableHeader";
import DoctorsHeader from "./DoctorsHeader";
import DoctorsList from "./DoctorsList";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const DoctorsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: doctors,
    isLoading,
    isError,
  } = useGetAllDoctors({ token, page, search });

  useEffect(() => {
    if (doctors?.message && !doctors.status) toast.error(doctors.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [doctors?.message, isError, doctors?.status]);

  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctor = useHasPermission(PERMISSIONS.VIEW_DOCTOR);

  return (
    <DataTable
      isLoading={isLoading}
      header={<DoctorsHeader />}
      tableHeader={<DoctorsTableHeader />}
      list={
        <DoctorsList
          meta={doctors?.data && doctors.data?.meta}
          doctors={doctors?.data?.items || []}
        />
      }
      skeleton={
        <TableSkeleton
          columns={canViewDoctor || canDeleteDoctor || canUpdateDoctor ? 6 : 5}
          rows={6}
          hasImage
          actionButtons={3}
        />
      }
      pagination={
        doctors?.data && {
          meta: doctors.data?.meta,
        }
      }
    />
  );
};

export default DoctorsTable;
