import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { Dispatch, memo, SetStateAction } from "react";
import { ArrowUpDown } from "lucide-react";

interface IProps {
  setSort: Dispatch<SetStateAction<boolean>>;
}

const TransactionsTableHeader = ({ setSort }: IProps) => {
  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="py-4 pr-4 text-center text-nowrap">
          رقم الإيصال
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">المبلغ</TableHead>
        <TableHead className="py-4 text-center">الخزينة</TableHead>
        <TableHead className="w-28 py-4 text-center">الخدمة</TableHead>
        <TableHead className="py-4 text-center">الموظف</TableHead>
        <TableHead className="py-4 text-center">المريض</TableHead>
        <TableHead className="py-4 text-center">الحالة</TableHead>
        <TableHead
          className="hover:bg-dark/10 cursor-pointer py-4 text-center text-nowrap transition-colors duration-200 dark:hover:bg-white/10"
          onClick={() => setSort((prev) => !prev)}
        >
          <div className="flex items-center justify-center gap-2">
            تاريخ التحصيل
            <ArrowUpDown size={16} />
          </div>
        </TableHead>
        {(canRefundTransaction || canViewTransaction) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(TransactionsTableHeader);
