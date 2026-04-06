import SearchInput from "@/shared/components/ui/SearchInput";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Activity } from "lucide-react";
import { ScansTable } from "../components/ScansTable";

const Scans = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الأشعات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-600 to-sky-600 shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                  إدارة الأشعات
                </h1>
                <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  عرض وإدارة أنواع الأشعات داخل النظام
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <SearchInput placeholder="ابحث عن أشعة" />
          </div>
        </div>
        <ScansTable />
      </motion.section>
    </>
  );
};

export default Scans;
