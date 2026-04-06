import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useGetRegistrationChart } from "@/features/dashboard/queries";
import DateFilter from "@/shared/components/ui/date-filter";
import AnalyticsChart from "@/shared/components/ChartsCard";
import { Users, Calendar } from "lucide-react";

interface IRegistrationFilter {
  register_start_at: string;
  register_end_at: string;
}

export const RegistrationChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IRegistrationFilter = useMemo(
    () => ({
      register_start_at: searchParams.get("register_start_at") || "",
      register_end_at: searchParams.get("register_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetRegistrationChart({
    filter: {
      ...(filters.register_start_at && { start_at: filters.register_start_at }),
      ...(filters.register_end_at && { end_at: filters.register_end_at }),
    },
  });

  const setFilters = (newFilters: IRegistrationFilter) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
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
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500" />
      <div className="absolute inset-x-0 top-0 h-1.5 animate-pulse bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 opacity-50" />

      <div className="relative border-b border-gray-100 bg-gradient-to-br from-gray-50/50 to-transparent p-6 dark:border-gray-800 dark:from-gray-800/30">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 dark:shadow-amber-500/20"
          >
            <Users className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              إحصائيات المستخدمين الجدد
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تحليل تسجيلات المستخدمين الجدد عبر الوقت
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>فلترة البيانات</span>
        </div>
        <div className="grid max-w-3xl grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <DateFilter
            value={filters.register_start_at}
            placeholder="من تاريخ"
            handleFilterChange={handleFilterChange}
            filterKey="register_start_at"
          />
          <DateFilter
            value={filters.register_end_at}
            placeholder="إلى تاريخ"
            handleFilterChange={handleFilterChange}
            filterKey="register_end_at"
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
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-linear-to-br from-amber-500/10 to-transparent blur-3xl transition-all duration-500 group-hover:scale-150 dark:from-amber-500/20" />
    </motion.div>
  );
};
