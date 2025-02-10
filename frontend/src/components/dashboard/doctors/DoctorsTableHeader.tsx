import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const DoctorsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 !text-sm text-center">
          الصورة الشخصية
        </TableHead>
        <TableHead className="py-4 !text-sm text-center">اسم الطبيب</TableHead>
        <TableHead className="py-4 !text-sm text-center">رقم الهاتف</TableHead>
        <TableHead className="text-center">الحالة</TableHead>
        <TableHead className="py-4 text-sm text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(DoctorsTableHeader);
