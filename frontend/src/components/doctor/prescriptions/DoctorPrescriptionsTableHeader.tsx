import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const DoctorPrescriptionsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center text-nowrap">المريض</TableHead>
        <TableHead className="py-4 text-center">العيادة</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ اصدار الروشتة
        </TableHead>
        <TableHead className="py-4 text-center">ملاحظات</TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(DoctorPrescriptionsTableHeader);
