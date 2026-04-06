import { PERMISSIONS } from "@/shared/enums/permissions";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { FileText } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { PrescriptionsFilters } from "./PrescriptionsFilters";
import { motion } from "framer-motion";

export const PrescriptionsHeader = () => {
  const canCreatePrescription = useHasPermission(PERMISSIONS.ADD_PRESCRIPTION);
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
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة الروشتات
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
            </p>
          </div>
        </div>

        {canCreatePrescription && (
          <Button
            asChild
            size="default"
            className="flex-1 bg-linear-to-r from-pink-600 to-rose-600 text-white shadow-md hover:shadow-lg sm:flex-none"
          >
            <Link to={"/dashboard/prescriptions/create"} className="gap-2">
              <FiPlus size={18} />
              <span className="hidden sm:inline">إضافة روشتة جديدة</span>
              <span className="sm:hidden">إضافة</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Filters Section */}
      <PrescriptionsFilters />
    </motion.div>
  );
};
