import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { memo } from "react";

const DoctorPrescriptionsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
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
