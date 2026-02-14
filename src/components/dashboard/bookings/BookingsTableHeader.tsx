import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { Dispatch, memo, SetStateAction } from "react";
import { ArrowUpDown } from "lucide-react";

interface IProps {
  setSort: Dispatch<SetStateAction<boolean>>;
}

const BookingsTableHeader = ({ setSort }: IProps) => {
  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

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
        <TableHead className="py-4 text-center">الطبيب</TableHead>
        <TableHead className="py-4 text-center">الحالة</TableHead>
        <TableHead className="py-4 text-center">اليوم</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          موعد الدخول
        </TableHead>
        <TableHead
          className="hover:bg-dark/10 cursor-pointer py-4 text-center text-nowrap transition-colors duration-200 dark:hover:bg-white/10"
          onClick={() => setSort((prev) => !prev)}
        >
          <div className="flex items-center justify-center gap-2">
            تاريخ الحجز
            <ArrowUpDown size={16} />
          </div>
        </TableHead>
        {(canDeleteBooking || canUpdateBooking || canViewBooking) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(BookingsTableHeader);
