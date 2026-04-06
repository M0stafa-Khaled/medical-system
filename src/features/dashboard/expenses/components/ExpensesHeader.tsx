import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateExpense } from "./CreateExpense";
import { ExpensesFilters } from "./ExpensesFilters";
import { format } from "date-fns";
import { Receipt } from "lucide-react";
import { ar } from "date-fns/locale";
import { motion } from "framer-motion";

export const ExpensesHeader = () => {
  const canCreateExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-rose-600 to-red-600 shadow-lg shadow-rose-500/30 dark:shadow-rose-500/20">
            <Receipt className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة المصروفات
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
            </p>
          </div>
        </div>

        {canCreateExpense && <CreateExpense />}
      </div>

      {/* Filters Section */}
      <ExpensesFilters />
    </motion.div>
  );
};
