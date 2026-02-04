import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { memo } from "react";

const ClinicsTableHeader = () => {
  const canUpdateDosage = useHasPermission(PERMISSIONS.UPDATE_DOSAGE);
  const canDeleteDosage = useHasPermission(PERMISSIONS.DELETE_DOSAGE);
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center w-20">#</TableHead>
        <TableHead className="py-4 text-center">اسم الجرعة</TableHead>
        {(canUpdateDosage || canDeleteDosage) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(ClinicsTableHeader);
