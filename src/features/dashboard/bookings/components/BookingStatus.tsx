import { Badge } from "@/shared/components/ui/badge";
import { TBookingStatus } from "@/shared/types";

interface IProps {
  status: TBookingStatus;
}
const BookingStatus = ({ status }: IProps) => {
  const renderBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge className="rounded-full bg-amber-600/20 text-amber-500 shadow-none hover:bg-amber-600/10 dark:bg-amber-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
            قيد الإنتظار
          </Badge>
        );
      case "collected":
        return (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            تم التحصيل
          </Badge>
        );
      case "completed":
        return (
          <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
            مكتمل
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            ملغي
          </Badge>
        );
      case "ended":
        return (
          <Badge className="bg-primary/30 dark:bg-primary/20 hover:bg-primary/30 dark:hover:bg-primary/20 text-primary rounded-full shadow-none dark:text-gray-300">
            <div className="bg-primary ml-2 h-1.5 w-1.5 rounded-full dark:bg-gray-300" />
            منتهى
          </Badge>
        );
      case "no-show":
        return (
          <Badge className="bg-primary/30 dark:bg-primary/20 hover:bg-primary/30 dark:hover:bg-primary/20 text-primary rounded-full shadow-none dark:text-white">
            <div className="bg-primary ml-2 h-1.5 w-1.5 rounded-full dark:bg-white" />
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
