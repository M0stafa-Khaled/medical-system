import { lazy } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { DoctorDashboardHeader } from "../components/DoctorDashboardHeader";

const DoctorMetricsCards = lazy(
  () => import("../components/DoctorMetricsCards")
);
const DoctorChartsList = lazy(() => import("../components/DoctorChartsList"));

const DoctorDashboard = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الرئيسية</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <DoctorDashboardHeader />

        <DoctorMetricsCards />

        <DoctorChartsList />
      </motion.section>
    </>
  );
};

export default DoctorDashboard;
