import { useSearchParams } from "react-router";
import { PrescriptionsReportFilters } from "./PrescriptionsReportFilters";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Filter, FileBarChart } from "lucide-react";
import { ar } from "date-fns/locale";
import { motion } from "framer-motion";

export const PrescriptionsReportHeader = () => {
  const [, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 space-y-4"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title & Date */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-pink-600 to-rose-600 shadow-lg shadow-pink-500/30 dark:shadow-pink-500/20">
            <FileBarChart className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              تقرير الروشتات
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <Button
          onClick={handleClearFilters}
          size="default"
          variant="outline"
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">مسح الفلاتر</span>
          <span className="sm:hidden">مسح</span>
        </Button>
      </div>

      {/* Filters Section */}
      <PrescriptionsReportFilters />
    </motion.div>
  );
};
