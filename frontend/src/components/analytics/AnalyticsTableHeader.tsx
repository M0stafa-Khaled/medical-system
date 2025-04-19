import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const AnalyticsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center w-20">#</TableHead>
        <TableHead className="py-4 text-center">اسم التحليل</TableHead>
        <TableHead className="py-4 text-center">الاسم بالعربي</TableHead>
        <TableHead className="py-4 text-center">الإختصار</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(AnalyticsTableHeader);
