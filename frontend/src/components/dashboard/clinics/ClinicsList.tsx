import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditClinicButton from "./EditClinicButton";
import DeleteClinicButton from "./DeleteClinicModalButton";

const ClinicList = () => {
  return (
    <>
      <Table className="border dark:border-muted !rounded-lg overflow-hidden">
        <TableCaption className="mt-0 py-4 dark:border-muted bg-white/80 dark:bg-dark/70">
          العيادات المتاحة
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
            <TableHead className=" py-4 !text-sm text-center">
              اسم العيادة
            </TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="py-4 text-sm text-center">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <TableRow
              key={idx}
              className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
            >
              <TableCell className="text-sm text-center text-black dark:text-white py-5">
                عظام
              </TableCell>
              <TableCell className="text-sm text-center text-black dark:text-white">
                <Badge className="bg-green-500 hover:bg-green-500">متاح</Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className=" flex justify-center items-center gap-4">
                  <EditClinicButton />
                  <DeleteClinicButton />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicList;
