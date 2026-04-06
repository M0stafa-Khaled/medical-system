import { PERMISSIONS } from "@/shared/enums/permissions";
import SearchInput from "../../../../shared/components/ui/SearchInput";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export const DoctorsHeader = () => {
  const canCreateDoctor = useHasPermission(PERMISSIONS.ADD_DOCTOR);
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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-600 to-teal-600 shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة الأطباء
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              عرض وإدارة بيانات الأطباء والتخصصات
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {canCreateDoctor && (
            <Button
              size="default"
              className="flex-1 bg-linear-to-r from-cyan-600 to-teal-600 text-white shadow-md hover:shadow-lg sm:flex-none"
              asChild
            >
              <Link to="/dashboard/doctors/create" className="gap-2">
                <FiPlus size={18} />
                <span className="hidden sm:inline">إضافة طبيب جديد</span>
                <span className="sm:hidden">إضافة طبيب</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <SearchInput placeholder="ابحث عن طبيب" />
      </div>
    </motion.div>
  );
};
