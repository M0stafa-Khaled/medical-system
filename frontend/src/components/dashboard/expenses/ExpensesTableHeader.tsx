import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExpensesTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center w-20">العدد</TableHead>
        <TableHead className="py-4 text-center">رقم الإيصال</TableHead>
        <TableHead className="py-4 text-center">التصنيف</TableHead>
        <TableHead className="py-4 text-center">المبلغ</TableHead>
        <TableHead className="py-4 text-center">الخزينة</TableHead>
        <TableHead className="py-4 text-center">الموظف</TableHead>
        <TableHead className="py-4 text-center">حالة المصروف</TableHead>
        <TableHead className="py-4 text-center">تاريخ الصرف</TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ExpensesTableHeader;
