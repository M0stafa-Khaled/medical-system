import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const TransfersReportsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70 *:whitespace-nowrap">
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
