import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { memo } from "react";

const ClinicsTableHeader = () => {
  const canUpdateDosage = useHasPermission(PERMISSIONS.UPDATE_DOSAGE);
  const canDeleteDosage = useHasPermission(PERMISSIONS.DELETE_DOSAGE);
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="w-20 py-4 text-center">#</TableHead>
        <TableHead className="py-4 text-center">اسم الجرعة</TableHead>
        {(canUpdateDosage || canDeleteDosage) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(ClinicsTableHeader);
