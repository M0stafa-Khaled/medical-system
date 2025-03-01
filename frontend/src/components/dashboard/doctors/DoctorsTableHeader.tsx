import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const DoctorsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center w-20">العدد</TableHead>
        <TableHead className="py-4 text-center">الصورة الشخصية</TableHead>
        <TableHead className="py-4 text-center">اسم الطبيب</TableHead>
        <TableHead className="py-4 text-center">العيادة</TableHead>
        <TableHead className="py-4 text-center">رقم الهاتف</TableHead>
        <TableHead className="py-4 text-center">حالة الحساب</TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(DoctorsTableHeader);
