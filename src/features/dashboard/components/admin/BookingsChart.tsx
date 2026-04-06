import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useGetBookingsChart } from "@/features/dashboard/queries";
import AnalyticsChart from "@/shared/components/ChartsCard";
import DateFilter from "@/shared/components/ui/date-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import { BarChart3, Calendar } from "lucide-react";

interface IBookingsFilter {
  booking_start_at: string;
  booking_end_at: string;
  booking_status: string;
}

export const BookingsChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IBookingsFilter = useMemo(
    () => ({
      booking_start_at: searchParams.get("booking_start_at") || "",
      booking_end_at: searchParams.get("booking_end_at") || "",
      booking_status: searchParams.get("booking_status") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetBookingsChart({
    filter: {
      ...(filters.booking_start_at && { start_at: filters.booking_start_at }),
      ...(filters.booking_end_at && { end_at: filters.booking_end_at }),
      ...(filters.booking_status && { status: filters.booking_status }),
    },
  });

  const setFilters = (newFilters: IBookingsFilter) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === "all") params.delete(key);
      else if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-2xl dark:border-white/10 dark:bg-gray-900 dark:shadow-gray-900/50"
    >
      {/* Top Accent Line with Pulse Effect */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-sky-500 via-violet-500 to-emerald-500" />
      <div className="absolute inset-x-0 top-0 h-1.5 animate-pulse bg-linear-to-r from-sky-500 via-violet-500 to-emerald-500 opacity-50" />

      <div className="relative border-b border-gray-100 bg-gradient-to-br from-gray-50/50 to-transparent p-6 dark:border-gray-800 dark:from-gray-800/30">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-violet-500 shadow-lg shadow-sky-500/30 dark:shadow-sky-500/20"
          >
            <BarChart3 className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              إحصائيات الحجوزات
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تحليل ومراقبة أداء الحجوزات عبر الوقت
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>فلترة البيانات</span>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          <DateFilter
            value={filters.booking_start_at}
            handleFilterChange={handleFilterChange}
            filterKey="booking_start_at"
            placeholder="من تاريخ"
          />
          <DateFilter
            value={filters.booking_end_at}
            handleFilterChange={handleFilterChange}
            filterKey="booking_end_at"
            placeholder="إلى تاريخ"
          />
          <SelectFilter
            value={filters.booking_status}
            filterKey="booking_status"
            placeholder="حالة الحجز"
            handleFilterChange={handleFilterChange}
            options={[
              { value: "all", label: "الكل" },
              { value: "pending", label: "قيد الانتظار" },
              { value: "completed", label: "مكتمل" },
              { value: "collected", label: "تم التحصيل" },
              { value: "cancelled", label: "ملغي" },
              { value: "no-show", label: "لم يحضر" },
              { value: "ended", label: "منتهي" },
            ]}
          />
        </div>
      </div>

      <div className="p-6">
        <AnalyticsChart
          datasets={analyticsData?.data.datasets || []}
          labels={analyticsData?.data.labels || []}
          isLoading={isLoading}
        />
      </div>

      {/* Corner Decorations */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-linear-to-br from-sky-500/10 to-transparent blur-3xl transition-all duration-500 group-hover:scale-150 dark:from-sky-500/20" />
    </motion.div>
  );
};
