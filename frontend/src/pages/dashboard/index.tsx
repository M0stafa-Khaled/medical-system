import { lazy } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import cookieServices from "@/utils/cookieServices";

const WidgetsList = lazy(
  () => import("@/components/widgets/admin/WidgetsList")
);
const ChartsList = lazy(
  () => import("@/components/charts/admin/AdminChartsList")
);
const EmployeeChartsList = lazy(
  () => import("@/components/charts/employee/EmployeeChartsList")
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
            <ChartsList />
          </>
        ) : (
          <EmployeeChartsList />
        )}
      </motion.section>
    </>
  );
};

export default Dashboard;
