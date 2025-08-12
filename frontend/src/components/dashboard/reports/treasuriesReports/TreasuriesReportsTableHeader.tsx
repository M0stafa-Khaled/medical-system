import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const TreasuriesReportsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70 [&>*]:whitespace-nowrap">
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
