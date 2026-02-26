import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PatientBalancesReportHeader } from "../components/patient-balances/PatientBalancesReportHeader";
import { PatientBalancesReportTable } from "../components/patient-balances/PatientBalancesReportTable";

const PatientBalancesReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تقرير حساب مريض</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PatientBalancesReportHeader />
        <PatientBalancesReportTable />
      </motion.section>
    </>
  );
};

export default PatientBalancesReports;
