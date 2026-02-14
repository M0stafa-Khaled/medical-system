import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { memo } from "react";

const DoctorBookingsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="py-4 text-center text-nowrap">
          كود الحجز
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">المريض</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          رقم الهاتف
        </TableHead>
        <TableHead className="py-4 text-center">العيادة</TableHead>
        <TableHead className="py-4 text-center">الحالة</TableHead>
        <TableHead className="py-4 text-center">اليوم</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          موعد الدخول
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ الحجز
        </TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(DoctorBookingsTableHeader);
