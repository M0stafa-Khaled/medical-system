import { lazy } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import cookieServices from "@/shared/utils/cookieServices";

const WidgetsList = lazy(
  () => import("@/components/dashboard/widgets/WidgetsList")
);
const AdminChartsList = lazy(
  () => import("@/components/dashboard/charts/admin/AdminChartsList")
);
const EmployeeChartsList = lazy(
  () => import("@/components/dashboard/charts/employee/EmployeeChartsList")
);

const Dashboard = () => {
  const role = cookieServices.getUser()?.role;
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الرئيسية</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {role === "admin" ? (
          <>
            <WidgetsList />
            <AdminChartsList />
          </>
        ) : (
          <EmployeeChartsList />
        )}
      </motion.section>
    </>
  );
};

export default Dashboard;
