import { lazy } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const WidgetsList = lazy(
  () => import("@/components/dashboard/widgets/WidgetsList")
);
const ChartsList = lazy(
  () => import("@/components/dashboard/charts/ChartsList")
);

const Dashboard = () => {
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
        <WidgetsList />
        <ChartsList />
      </motion.section>
    </>
  );
};

export default Dashboard;
