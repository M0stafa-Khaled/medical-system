import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PatientsReportTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70 [&>*]:whitespace-nowrap">
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
