import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useGetDoctorTransactionsChart } from "@/features/doctor";
import DateFilter from "@/shared/components/ui/date-filter";
import AnalyticsChart from "@/shared/components/ChartsCard";
import { Wallet, Calendar } from "lucide-react";

interface ITransactionsFilter {
  transaction_start_at: string;
  transaction_end_at: string;
}

const DoctorTransactionsCharts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITransactionsFilter = useMemo(
    () => ({
      transaction_start_at: searchParams.get("transaction_start_at") || "",
      transaction_end_at: searchParams.get("transaction_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetDoctorTransactionsChart({
    filter: {
      ...(filters.transaction_start_at && {
        start_at: filters.transaction_start_at,
      }),
      ...(filters.transaction_end_at && { end_at: filters.transaction_end_at }),
    },
  });

  const setFilters = (newFilters: ITransactionsFilter) => {
    const params = new URLSearchParams(searchParams);

    // Update each filter param
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
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-gray-900/80 dark:shadow-gray-900/50"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500" />

      <div className="relative border-b border-gray-100 p-6 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25 dark:shadow-green-500/10"
          >
            <Wallet className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              إحصائيات الإيرادات
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              تحليل ومتابعة الإيرادات والمعاملات المالية
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>فلترة البيانات</span>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <DateFilter
            value={filters.transaction_start_at}
            handleFilterChange={handleFilterChange}
            filterKey="transaction_start_at"
            placeholder="من تاريخ"
          />
          <DateFilter
            value={filters.transaction_end_at}
            handleFilterChange={handleFilterChange}
            filterKey="transaction_end_at"
            placeholder="إلى تاريخ"
          />
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <AnalyticsChart
          datasets={analyticsData?.data.datasets || []}
          labels={analyticsData?.data.labels || []}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default DoctorTransactionsCharts;
