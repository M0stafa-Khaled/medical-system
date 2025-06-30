import { lazy } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const DoctorWidgetsList = lazy(
  () => import("@/components/doctor/widgets/DoctorWidgetsList")
);
const DoctorChartsList = lazy(
  () => import("@/components/doctor/charts/DoctorChartsList")
);

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
      >
        <DoctorWidgetsList />

        <DoctorChartsList />
      </motion.section>
    </>
  );
};

export default DoctorDashboard;
