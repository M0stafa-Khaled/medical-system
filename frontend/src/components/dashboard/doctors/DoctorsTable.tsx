import { useGetAllDoctors } from "@/lib/react-query/doctors";
import { useSearch } from "@/hooks/useSearch";
import DataTable from "@/components/ui/DataTable";
import DoctorsTableHeader from "./DoctorsTableHeader";
import DoctorsTableActions from "./DoctorsTableActions";
import DoctorsList from "./DoctorsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DoctorsTable = () => {
  const token = cookieServices.getToken();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: doctors,
    isLoading,
    isError,
  } = useGetAllDoctors(token as string, page);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(
    doctors?.data.items
  );

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
        <DoctorsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<DoctorsTableHeader />}
      list={<DoctorsList doctors={filteredItems} />}
      skeleton={
        <TableSkeleton columns={6} rows={6} hasImage actionButtons={3} />
      }
      pagination={doctors?.data && {
        links: doctors.data.links
      }}
    />
  );
};

export default DoctorsTable;
