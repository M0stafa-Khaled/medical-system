import { useAppSelector } from "@/app/store";
import { motion } from "framer-motion";
import { LayoutDashboard, Activity } from "lucide-react";

export const DashboardHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.user?.role;

  const title = role === "admin" ? "لوحة تحكم المدير" : "لوحة تحكم الموظف";
  const description =
    role === "admin"
      ? "نظرة عامة على أداء المركز الطبي والعمليات."
      : "متابعة الخزنة والعمليات المالية.";

  const userName = user?.name || "المستخدم";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 overflow-hidden rounded-2xl border border-white/20 bg-linear-to-br from-white via-white to-gray-50 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-600 via-violet-600 to-purple-600" />

      {/* Background Decorations */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-linear-to-br from-blue-500/10 to-transparent blur-3xl dark:from-blue-500/20" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-linear-to-br from-violet-500/10 to-transparent blur-3xl dark:from-violet-500/20" />

      <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
          >
            <LayoutDashboard className="h-7 w-7 text-white" />
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-green-600 dark:text-green-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                مرحباً، {userName}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-50 to-violet-50 px-4 py-2 dark:from-blue-950/30 dark:to-violet-950/30"
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            النظام نشط
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
