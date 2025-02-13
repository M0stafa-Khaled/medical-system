import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EmployeesTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead className="py-4 text-center">الصورة الشخصية</TableHead>
        <TableHead className="py-4 text-sm text-center">اسم الموظف</TableHead>
        <TableHead className="py-4 text-center">رقم الهاتف</TableHead>
        <TableHead className="py-4 text-center">حالة الحساب</TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default EmployeesTableHeader;
