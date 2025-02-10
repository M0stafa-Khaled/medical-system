import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const ClinicsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 !text-sm text-center">اسم العيادة</TableHead>
        <TableHead className="text-center">الحالة</TableHead>
        <TableHead className="py-4 text-sm text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(ClinicsTableHeader);
