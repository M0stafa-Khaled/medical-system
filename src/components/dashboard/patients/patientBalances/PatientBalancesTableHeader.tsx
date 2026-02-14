import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { memo } from "react";

const PatientBalancesTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="w-20 py-4 text-center text-nowrap">
          رقم الإيصال
        </TableHead>
        <TableHead className="py-4 text-center">المدفوع</TableHead>
        <TableHead className="py-4 text-center">الإجمالي</TableHead>
        <TableHead className="py-4 text-center">المستحق</TableHead>
        <TableHead className="py-4 text-center text-nowrap">المسترد</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          وسيلة الدفع
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          رقم عملية البطاقة
        </TableHead>

        <TableHead className="py-4 text-center text-nowrap">
          تاريخ التحصيل
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default memo(PatientBalancesTableHeader);
