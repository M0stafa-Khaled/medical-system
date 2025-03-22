import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { Dispatch, memo, SetStateAction } from "react";
import { ArrowUpDown } from "lucide-react";

interface IProps {
  setSort: Dispatch<SetStateAction<boolean>>;
  sort: boolean;
}

const TransactionsTableHeader = ({ setSort, sort }: IProps) => {
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
        <TableHead
          className="py-4 hover:bg-dark/10 dark:hover:bg-white/10 transition-colors duration-200 text-center text-nowrap cursor-pointer"
          onClick={() => setSort(!sort)}
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
