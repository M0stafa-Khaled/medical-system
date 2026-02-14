import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";

const ExpensesReportTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="py-4 text-center text-nowrap">
          رقم الإيصال
        </TableHead>
        <TableHead className="py-4 text-center">التصنيف</TableHead>
        <TableHead className="py-4 text-center">المبلغ</TableHead>
        <TableHead className="py-4 text-center">الخزينة</TableHead>
        <TableHead className="py-4 text-center">الموظف</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          حالة المصروف
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ الصرف
        </TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ExpensesReportTableHeader;
