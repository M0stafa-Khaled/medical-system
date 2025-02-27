import DataTable from "@/components/ui/DataTable";
import MedicationsTableActions from "./MedicationsTableActions";
import { useEffect, useState } from "react";
import cookieServices from "@/utils/cookieServices";
import MedicationsTableHeader from "./MedicationsTableHeader";
import MedicationsList from "./MedicationsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { useGetALlMedications } from "@/lib/react-query/medications";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const MedicationsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = useDebounce(searchTerm, 500);

  const {
    data: medications,
    isLoading,
    isError,
  } = useGetALlMedications({ page, token, search });

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
        <MedicationsTableActions
          searchKeyword={searchTerm}
          setSearchKeyword={setSearchTerm}
        />
      }
      header={<MedicationsTableHeader />}
      list={<MedicationsList medications={medications?.data.items || []} />}
      skeleton={<TableSkeleton columns={2} rows={6} hasImage />}
      pagination={
        medications?.data && {
          meta: medications.data.meta,
        }
      }
    />
  );
};

export default MedicationsTable;
