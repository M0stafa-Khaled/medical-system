import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { useGetAllDoctors } from "../queriesAndMutations";
import { DataTable } from "@/shared/components/data-table";
import { useDoctorsColumns } from "./DoctorColumns";

export const DoctorsTable = () => {
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

  const columns = useDoctorsColumns({ meta: doctors?.data.meta });

  return (
    <DataTable
      data={doctors?.data.items || []}
      columns={columns}
      isLoading={isLoading}
      skeleton={
        <TableSkeleton
          columns={canViewDoctor || canDeleteDoctor || canUpdateDoctor ? 5 : 4}
          rows={6}
          hasImage
          actionButtons={3}
        />
      }
      emptyMessage="لا يوجد اطباء"
      meta={doctors?.data.meta}
    />
  );
};
