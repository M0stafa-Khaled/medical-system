import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { memo } from "react";

const PatientsTableHeader = () => {
  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);
  const canViewPatient = useHasPermission(PERMISSIONS.VIEW_PATIENT);
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="w-20 px-4 py-4 text-center">#</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          اسم المريض
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          رقم الهاتف
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          حالة الحساب
        </TableHead>
        {(canDeletePatient || canUpdatePatient || canViewPatient) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(PatientsTableHeader);
