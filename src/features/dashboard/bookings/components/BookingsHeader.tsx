import { PERMISSIONS } from "@/shared/enums/permissions";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import BookingsFilters from "./BookingsFilters";
import { CalendarCheck2, Package } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import RefetchDataButton from "@/shared/components/RefetchDataButton";
import Query_Keys from "@/shared/enums/queryKeys";
import { IPaginationMeta } from "@/shared/types";
import { motion } from "framer-motion";

interface IProps {
  isLoading: boolean;
  meta?: IPaginationMeta;
}

export const BookingsHeader = ({ isLoading, meta }: IProps) => {
  const canCreateBooking = useHasPermission(PERMISSIONS.ADD_BOOKING);

  return (
    <div className="mb-6 space-y-4">
      {/* Main Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Title Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20">
            <CalendarCheck2 className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة الحجوزات
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
            </p>
          </div>
        </div>

        {/* Actions - Mobile Optimized */}
        <div className="flex flex-wrap gap-2">
          <RefetchDataButton
            isLoading={isLoading}
            queryKey={Query_Keys.GET_ALL_BOOKINGS}
          />
          {canCreateBooking && (
            <Button
              asChild
              size={"default"}
              className="flex-1 bg-linear-to-r from-blue-600 to-violet-600 text-white shadow-md hover:shadow-lg sm:flex-none"
            >
              <Link to={"/dashboard/bookings/create"} className="gap-2">
                <FiPlus size={18} />
                <span className="hidden sm:inline">إضافة حجز جديد</span>
                <span className="sm:hidden">إضافة</span>
              </Link>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="rounded-xl border border-gray-200 bg-linear-to-br from-blue-50 to-violet-50 p-4 shadow-sm dark:border-gray-800 dark:from-blue-950/20 dark:to-violet-950/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-900">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                إجمالي الحجوزات
              </p>
              <p className="truncate text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                {new Intl.NumberFormat("ar-SA").format(meta?.total || 0)}
              </p>
            </div>
          </div>
          <div className="hidden text-3xl font-bold text-blue-600/10 sm:block sm:text-4xl dark:text-blue-400/10">
            {meta?.total ?? 0}
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <BookingsFilters />
      </motion.div>
    </div>
  );
};
