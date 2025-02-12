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

const DoctorsTable = () => {
  const token = cookieServices.getToken();

  const {
    data: doctors,
    isLoading,
    isError,
  } = useGetAllDoctors(token as string);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(doctors?.data);

  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [isError]);

  return (
    <DataTable
      isLoading={isLoading}
      caption="الاطباء"
      actions={
        <DoctorsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<DoctorsTableHeader />}
      list={<DoctorsList doctors={filteredItems} />}
      skeleton={
        <TableSkeleton columns={5} rows={6} hasImage actionButtons={3} />
      }
    />
  );
};

export default DoctorsTable;
