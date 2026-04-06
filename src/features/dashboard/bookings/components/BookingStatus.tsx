import { Badge } from "@/shared/components/ui/badge";
import { TBookingStatus } from "@/shared/types";
import { motion } from "framer-motion";

interface IProps {
  status: TBookingStatus;
}

const BookingStatus = ({ status }: IProps) => {
  const renderBadge = () => {
    switch (status) {
      case "pending":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700 shadow-sm dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400">
              <div className="ml-2 h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              قيد الانتظار
            </Badge>
          </motion.div>
        );
      case "collected":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400">
              <div className="ml-2 h-2 w-2 rounded-full bg-emerald-500" />
              تم التحصيل
            </Badge>
          </motion.div>
        );
      case "completed":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400">
              <div className="ml-2 h-2 w-2 rounded-full bg-emerald-500" />
              مكتمل
            </Badge>
          </motion.div>
        );
      case "cancelled":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-red-700 shadow-sm dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400">
              <div className="ml-2 h-2 w-2 rounded-full bg-red-500" />
              ملغي
            </Badge>
          </motion.div>
        );
      case "ended":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-gray-700 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-400">
              <div className="ml-2 h-2 w-2 rounded-full bg-gray-500" />
              منتهي
            </Badge>
          </motion.div>
        );
      case "no-show":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-orange-700 shadow-sm dark:border-orange-800/50 dark:bg-orange-950/30 dark:text-orange-400">
              <div className="ml-2 h-2 w-2 rounded-full bg-orange-500" />
              لم يحضر
            </Badge>
          </motion.div>
        );
      default:
        return (
          <Badge className="rounded-full">غير معروف</Badge>
        );
    }
  };

  return <>{renderBadge()}</>;
};

export default BookingStatus;
