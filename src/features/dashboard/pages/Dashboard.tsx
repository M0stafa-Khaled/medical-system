import { TRole } from "@/shared/types";
import { DashboardHeader } from "../components/DashboardHeader";
import { MetricsCards } from "../components/MetricsCards";
import AdminChartsList from "../components/admin/AdminChartsList";
import { EmployeeChartsList } from "../components/employee/EmployeeChartsList";
import { useAppSelector } from "@/app/store";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.user?.role as TRole;

  return (
    <div className="min-h-screen space-y-6 pb-8">
      {/* Header */}
      <DashboardHeader />

      {/* Metrics Cards Section */}
      {role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MetricsCards />
        </motion.div>
      )}

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full bg-linear-to-r from-emerald-600 to-teal-600"></div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            <span>التحليلات والرسوم البيانية</span>
          </h2>
        </div>

        {/* Charts List */}
        {role === "admin" ? <AdminChartsList /> : <EmployeeChartsList />}
      </motion.div>
    </div>
  );
};

export default Dashboard;
