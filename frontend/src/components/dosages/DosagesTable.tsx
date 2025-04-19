import DataTable from "@/components/ui/DataTable";
import ClinicsTableHeader from "./DosageTableHeader";
import DosagesHeader from "./DosagesHeader";
import DosagesList from "./DosageList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { useGetAllDosages } from "@/lib/react-query/dosages";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const DosagesTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: dosages,
    isLoading,
    isError,
  } = useGetAllDosages({ token, search });

  useEffect(() => {
    if (dosages?.message && !dosages?.status) toast.error(dosages.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [dosages?.message, isError, dosages?.status]);

  const canUpdateDosage = useHasPermission(PERMISSIONS.UPDATE_DOSAGE);
  const canDeleteDosage = useHasPermission(PERMISSIONS.DELETE_DOSAGE);

  return (
    <DataTable
      isLoading={isLoading}
      header={<DosagesHeader />}
      tableHeader={<ClinicsTableHeader />}
      list={<DosagesList dosages={dosages?.data || []} />}
      skeleton={
        <TableSkeleton
          columns={canDeleteDosage || canUpdateDosage ? 2 : 1}
          rows={8}
        />
      }
    />
  );
};

export default DosagesTable;
