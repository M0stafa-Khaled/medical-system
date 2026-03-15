import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useGetDoctorPrescriptionsChart } from "@/features/doctor";
import DateFilter from "@/shared/components/ui/date-filter";
import AnalyticsChart from "@/shared/components/ChartsCard";
import { FileText, Calendar } from "lucide-react";

interface ITransactionsFilter {
  prescription_start_at: string;
  prescription_end_at: string;
}

const DoctorPrescriptionsCharts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITransactionsFilter = useMemo(
    () => ({
      prescription_start_at: searchParams.get("prescription_start_at") || "",
      prescription_end_at: searchParams.get("prescription_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetDoctorPrescriptionsChart({
    filter: {
      ...(filters.prescription_start_at && {
        start_at: filters.prescription_start_at,
      }),
      ...(filters.prescription_end_at && {
        end_at: filters.prescription_end_at,
      }),
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
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      <div className="relative border-b border-gray-100 p-6 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/10"
          >
            <FileText className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              إحصائيات الروشتات
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              تحليل ومراقبة الوصفات الطبية عبر الوقت
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>فلترة البيانات</span>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <DateFilter
            value={filters.prescription_start_at}
            handleFilterChange={handleFilterChange}
            filterKey="prescription_start_at"
            placeholder="من تاريخ"
          />
          <DateFilter
            value={filters.prescription_end_at}
            handleFilterChange={handleFilterChange}
            filterKey="prescription_end_at"
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

export default DoctorPrescriptionsCharts;
