import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const DrugsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center w-20">العدد</TableHead>
        <TableHead className="py-4 text-center">اسم الدواء</TableHead>
        <TableHead className="py-4 text-center">شكل الدواء</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(DrugsTableHeader);
