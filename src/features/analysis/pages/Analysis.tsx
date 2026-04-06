import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { AnalysisTable } from "../components/AnalysisTable";
import SearchInput from "@/shared/components/ui/SearchInput";
import { FileText } from "lucide-react";

const Analysis = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | التحاليل</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                  إدارة التحاليل
                </h1>
                <p className="truncate text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  عرض وإدارة التحاليل الطبية المتاحة
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <SearchInput placeholder="ابحث عن تحليل" />
          </div>
        </div>
        <AnalysisTable />
      </motion.section>
    </>
  );
};

export default Analysis;
