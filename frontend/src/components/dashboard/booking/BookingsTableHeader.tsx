import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import { Dispatch, memo, SetStateAction } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ChevronDown } from "lucide-react";

interface IProps {
  setSort: Dispatch<SetStateAction<boolean>>;
  sort: boolean;
}

const BookingsTableHeader = ({ setSort, sort }: IProps) => {
  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

  return (
    <TableHeader>
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableHead
          className="py-4 hover:bg-dark/10 dark:hover:bg-white/10 transition-colors duration-200 text-center text-nowrap cursor-pointer"
          onClick={() => setSort(!sort)}
        >
          <div className="flex items-center justify-center gap-2">
            كود الحجز
            <ArrowUpDown size={16} />
          </div>
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">المريض</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          رقم الهاتف
        </TableHead>
        <TableHead className="py-4 text-center">العيادة</TableHead>
        <TableHead className="py-4 text-center">الطبيب</TableHead>
        <TableHead className="py-4 text-center w-28">الحالة</TableHead>
        <TableHead className="py-4 text-center">اليوم</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          موعد الدخول
        </TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          تاريخ الحجز
        </TableHead>
        {(canDeleteBooking || canUpdateBooking || canViewBooking) && (
          <TableHead className="py-4 text-center">الإجراءات</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default memo(BookingsTableHeader);
