import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import AnalyticsTable from "@/components/main/analytics/AnalyticsTable";

const Analytics = () => {
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
        <AnalyticsTable />
      </motion.section>
    </>
  );
};

export default Analytics;
