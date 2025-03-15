import { useGetAllDoctors } from "@/lib/react-query/dashboard/doctors/doctors";
import DataTable from "@/components/ui/DataTable";
import DoctorsTableHeader from "./DoctorsTableHeader";
import DoctorsTableActions from "./DoctorsTableActions";
import DoctorsList from "./DoctorsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const DoctorsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchTerm, 500);
  const {
    data: doctors,
    isLoading,
    isError,
  } = useGetAllDoctors({ token, page, search });

  useEffect(() => {
    if (doctors?.message) toast.error(doctors.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [doctors?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      actions={
        <DoctorsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<DoctorsTableHeader />}
      list={
        <DoctorsList
          meta={doctors?.data && doctors.data?.meta}
          doctors={doctors?.data?.items || []}
        />
      }
      skeleton={
        <TableSkeleton columns={6} rows={6} hasImage actionButtons={3} />
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
