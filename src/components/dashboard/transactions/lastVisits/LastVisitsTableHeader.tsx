import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { memo } from "react";

const LastVisitsTableHeader = () => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="py-4 pr-4 text-center text-nowrap">
          رقم الإيصال
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">المبلغ</TableHead>
        <TableHead className="py-4 text-center text-nowrap">الخدمة</TableHead>
        <TableHead className="py-4 text-center">طريقة الدفع</TableHead>
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
