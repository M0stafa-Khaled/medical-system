import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { memo } from "react";

const LastVisitsTableHeader = () => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 pr-4 text-center text-nowrap">
          رقم الإيصال
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">المبلغ</TableHead>
        <TableHead className="py-4 text-center">الخزينة</TableHead>
        <TableHead className="py-4 text-center w-28">الخدمة</TableHead>
        <TableHead className="py-4 text-center">الموظف</TableHead>
        <TableHead className="py-4 text-center">المريض</TableHead>
        <TableHead className="py-4 text-center">الحالة</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ التحصيل
        </TableHead>
        {(canRefundTransaction || canViewTransaction) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(LastVisitsTableHeader);
