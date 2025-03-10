import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { memo } from "react";

const EmployeesTableHeader = () => {
  const canEditEmployee = useHasPermission(PERMISSIONS.EDIT_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const canViewEmployee = useHasPermission(PERMISSIONS.VIEW_EMPLOYEE);

  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
      <TableHead className="py-4 text-center w-20">#</TableHead>
      <TableHead className="py-4 text-center">الصورة الشخصية</TableHead>
        <TableHead className="py-4 text-center max-w-44">اسم الموظف</TableHead>
        <TableHead className="py-4 text-center">رقم الهاتف</TableHead>
        <TableHead className="py-4 text-center">حالة الحساب</TableHead>
        {(canDeleteEmployee || canEditEmployee || canViewEmployee) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(EmployeesTableHeader);
