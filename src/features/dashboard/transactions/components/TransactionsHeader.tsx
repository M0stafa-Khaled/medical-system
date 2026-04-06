import { TransactionsFilters } from "./TransactionsFilters";
import { DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CreatePatientPayment } from "./CreatePatientPayment";
import { motion } from "framer-motion";
import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";

export const TransactionsHeader = () => {
  const canCreatePayment = useHasPermission(PERMISSIONS.ADD_PATIENT_PAYMENT);

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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-green-600 to-emerald-600 shadow-lg shadow-green-500/30 dark:shadow-green-500/20">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة الإيرادات
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
            </p>
          </div>
        </div>

        {canCreatePayment && <CreatePatientPayment />}
      </div>

      {/* Filters Section */}
      <TransactionsFilters />
    </motion.div>
  );
};
