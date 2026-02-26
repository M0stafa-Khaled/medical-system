import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PrescriptionsReportHeader } from "../components/prescriptions/PrescriptionsReportHeader";
import { PrescriptionsReportTable } from "../components/prescriptions/PrescriptionsReportTable";

const PrescriptionsReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تقارير الروشتات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PrescriptionsReportHeader />
        <PrescriptionsReportTable />
      </motion.section>
    </>
  );
};

export default PrescriptionsReports;
