import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { memo } from "react";

const ScansTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="w-20 py-4 text-center">#</TableHead>
        <TableHead className="py-4 text-center">اسم الأشعة</TableHead>
        <TableHead className="py-4 text-center">الاسم بالعربي</TableHead>
        <TableHead className="py-4 text-center">الإختصار</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(ScansTableHeader);
