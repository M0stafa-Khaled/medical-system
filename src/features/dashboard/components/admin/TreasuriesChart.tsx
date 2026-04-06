import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries";
import { useGetTreasuriesChart } from "@/features/dashboard/queries";
import AnalyticsChart from "@/shared/components/ChartsCard";
import DateFilter from "@/shared/components/ui/date-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import { Wallet, Calendar } from "lucide-react";

interface ITreasuriesFilter {
  treasury_start_at: string;
  treasury_end_at: string;
  treasury: string;
}

export const TreasuriesChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: treasuries } = useGetAllTreasuries({});

  const filters: ITreasuriesFilter = useMemo(
    () => ({
      treasury_start_at: searchParams.get("treasury_start_at") || "",
      treasury_end_at: searchParams.get("treasury_end_at") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetTreasuriesChart({
    filter: {
      ...(filters.treasury_start_at && { start_at: filters.treasury_start_at }),
      ...(filters.treasury_end_at && { end_at: filters.treasury_end_at }),
      ...(filters.treasury && { treasury: filters.treasury }),
    },
  });

  const setFilters = (newFilters: ITreasuriesFilter) => {
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
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
      <div className="absolute inset-x-0 top-0 h-1.5 animate-pulse bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-50" />

      <div className="relative border-b border-gray-100 bg-gradient-to-br from-gray-50/50 to-transparent p-6 dark:border-gray-800 dark:from-gray-800/30">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20"
          >
            <Wallet className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              إحصائيات الخزائن
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تحليل ومتابعة أداء الخزائن المالية
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
            value={filters.treasury_start_at}
            handleFilterChange={handleFilterChange}
            filterKey="treasury_start_at"
            placeholder="من تاريخ"
          />
          <DateFilter
            value={filters.treasury_end_at}
            handleFilterChange={handleFilterChange}
            filterKey="treasury_end_at"
            placeholder="إلى تاريخ"
          />
          <SelectFilter
            placeholder="الخزنة"
            handleFilterChange={handleFilterChange}
            value={filters.treasury}
            filterKey="treasury"
            options={[
              ...(treasuries?.data.length
                ? treasuries.data.map((t) => ({
                    value: t.name.trim(),
                    label: t.name,
                  }))
                : []),
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
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-linear-to-br from-emerald-500/10 to-transparent blur-3xl transition-all duration-500 group-hover:scale-150 dark:from-emerald-500/20" />
    </motion.div>
  );
};
