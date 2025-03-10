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
          <Badge className="bg-yellow-500 hover:bg-yellow-500">انتظار</Badge>
        );
      case "collected":
        return (
          <Badge className="bg-green-500 hover:bg-green-500">تم التحصيل</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-500">ملغي</Badge>;
      case "ended":
        return <Badge className="bg-gray-400 hover:bg-gray-400">انتهى</Badge>;
      case "no-show":
        return <Badge>لم يحضر</Badge>;
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  return <>{renderBadge()}</>;
};

export default BookingStatus;
