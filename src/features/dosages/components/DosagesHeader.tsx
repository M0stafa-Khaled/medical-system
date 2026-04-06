import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import SearchInput from "@/shared/components/ui/SearchInput";
import { CreateDosage } from "./CreateDosage";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";

export const DosagesHeader = () => {
  const canCreateDosage = useHasPermission(PERMISSIONS.ADD_DOSAGE);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 space-y-4"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-purple-600 to-fuchsia-600 shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20">
            <Pill className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
              إدارة الجرعات
            </h1>
            <p className="truncate text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              عرض وإدارة جرعات الأدوية
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {canCreateDosage && <CreateDosage />}
        </div>
      </div>

      {/* Search Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <SearchInput placeholder="ابحث عن جرعة" />
      </div>
    </motion.div>
  );
};
