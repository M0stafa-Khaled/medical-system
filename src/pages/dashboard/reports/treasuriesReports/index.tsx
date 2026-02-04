import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import TreasuriesReportTable from "@/components/dashboard/reports/treasuriesReports/TreasuriesReportTable";

const TreasuriesReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تقارير الخزائن</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TreasuriesReportTable />
      </motion.section>
    </>
  );
};

export default TreasuriesReports;
