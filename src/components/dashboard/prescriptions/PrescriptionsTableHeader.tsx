import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { memo } from "react";

const PrescriptionsTableHeader = () => {
  const canUpdatePrescription = useHasPermission(
    PERMISSIONS.UPDATE_PRESCRIPTION
  );
  const canDeletePrescription = useHasPermission(
    PERMISSIONS.DELETE_PRESCRIPTION
  );
  const canViewPrescription = useHasPermission(PERMISSIONS.VIEW_PRESCRIPTION);

  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="py-4 text-center text-nowrap">المريض</TableHead>
        <TableHead className="py-4 text-center">الطبيب</TableHead>
        <TableHead className="py-4 text-center">العيادة</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ اصدار الروشتة
        </TableHead>
        <TableHead className="py-4 text-center">ملاحظات</TableHead>

        {(canDeletePrescription ||
          canUpdatePrescription ||
          canViewPrescription) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(PrescriptionsTableHeader);
