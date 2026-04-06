import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateClinic } from "./CreateClinic";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export const ClinicsHeader = () => {
  const canCreateClinic = useHasPermission(PERMISSIONS.ADD_CLINIC);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة العيادات
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              عرض وإدارة بيانات العيادات
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {canCreateClinic && <CreateClinic />}
        </div>
      </div>
    </motion.div>
  );
};
