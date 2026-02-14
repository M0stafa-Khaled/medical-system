import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { memo } from "react";

const TreasuriesReportsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 *:whitespace-nowrap hover:bg-white/80">
        <TableHead className="py-4 pr-4 text-center">نوع العملية</TableHead>
        <TableHead className="py-4 text-center">كود العملية</TableHead>
        <TableHead className="py-4 text-center">المبلغ</TableHead>
        <TableHead className="py-4 text-center">حالة العملية</TableHead>
        <TableHead className="py-4 text-center">الموظف</TableHead>
        <TableHead className="py-4 text-center">تاريخ العملية</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(TreasuriesReportsTableHeader);
