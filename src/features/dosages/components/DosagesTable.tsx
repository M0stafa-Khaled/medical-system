import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { useSearchParams } from "react-router";
import useDebounce from "@/shared/hooks/useDebounce";
import { DataTable } from "@/components/shared/data-table";
import { useGetAllDosages } from "../queriesAndMutations";
import { useDosagesColumns } from "./DosagesColumns";

export const DosagesTable = () => {
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const { data: dosages, isLoading, isError } = useGetAllDosages({ search });

  useEffect(() => {
    if (dosages?.message && !dosages?.status) toast.error(dosages.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [dosages?.message, isError, dosages?.status]);

  const canUpdateDosage = useHasPermission(PERMISSIONS.UPDATE_DOSAGE);
  const canDeleteDosage = useHasPermission(PERMISSIONS.DELETE_DOSAGE);

  const columns = useDosagesColumns();
  return (
    <DataTable
      isLoading={isLoading}
      data={dosages?.data || []}
      columns={columns}
      skeleton={
        <TableSkeleton
          columns={canDeleteDosage || canUpdateDosage ? 2 : 1}
          rows={5}
        />
      }
    />
  );
};
