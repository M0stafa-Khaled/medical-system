import { Badge } from "@/components/ui/badge";
import { TBookingStatus } from "@/types";

interface IProps {
  status: TBookingStatus;
}
const BookingStatus = ({ status }: IProps) => {
  const renderBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-600/20 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 ml-2" />
            قيد الإنتظار
          </Badge>
        );
      case "collected":
        return (
          <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
            تم التحصيل
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
            مكتمل
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
            ملغي
          </Badge>
        );
      case "ended":
        return (
          <Badge className="bg-primary/30 dark:bg-primary/20 hover:bg-primary/30 dark:hover:bg-primary/20 text-primary dark:text-gray-300 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-gray-300 ml-2" />
            منتهى
          </Badge>
        );
      case "no-show":
        return (
          <Badge className="bg-primary/30 dark:bg-primary/20 hover:bg-primary/30 dark:hover:bg-primary/20 text-primary dark:text-white shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-white ml-2" />
            لم يحضر
          </Badge>
        );
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  return <>{renderBadge()}</>;
};

export default BookingStatus;
