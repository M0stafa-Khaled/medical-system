import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { memo } from "react";

const TransfersReportsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 *:whitespace-nowrap hover:bg-white/80">
        <TableHead className="py-4 pr-4 text-center">
          الخزينة المحول منها
        </TableHead>
        <TableHead className="py-4 text-center">الخزينة المحول إليها</TableHead>
        <TableHead className="py-4 text-center">المبلغ</TableHead>
        <TableHead className="py-4 text-center">تاريخ التحويل</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(TransfersReportsTableHeader);
