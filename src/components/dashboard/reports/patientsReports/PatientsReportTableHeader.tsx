import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";

const PatientsReportTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 *:whitespace-nowrap hover:bg-white/80">
        <TableHead className="py-4 text-center text-nowrap">
          اسم المريض
        </TableHead>
        <TableHead className="py-4 text-center">رقم الهاتف</TableHead>
        <TableHead className="py-4 text-center">حالة الحساب</TableHead>
        <TableHead className="py-4 text-center">رقم الهوبة</TableHead>
        <TableHead className="py-4 text-center">تأكيد الحساب</TableHead>
        <TableHead className="py-4 text-center">اخر تسجيل دخول</TableHead>
        <TableHead className="py-4 text-center">اخر تسجيل خروج</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ التسجيل
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PatientsReportTableHeader;
