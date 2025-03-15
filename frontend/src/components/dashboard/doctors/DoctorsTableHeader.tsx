import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { memo } from "react";

const DoctorsTableHeader = () => {
  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctor = useHasPermission(PERMISSIONS.VIEW_DOCTOR);

  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center w-20">#</TableHead>
        <TableHead className="py-4 text-center">الصورة الشخصية</TableHead>
        <TableHead className="py-4 text-center">اسم الطبيب</TableHead>
        <TableHead className="py-4 text-center">العيادة</TableHead>
        <TableHead className="py-4 text-center">رقم الهاتف</TableHead>
        <TableHead className="py-4 text-center">حالة الحساب</TableHead>
        {(canDeleteDoctor || canUpdateDoctor || canViewDoctor) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(DoctorsTableHeader);
