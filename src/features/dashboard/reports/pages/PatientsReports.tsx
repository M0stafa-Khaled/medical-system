import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PatientsReportHeader } from "../components/patients/PatientsReportHeader";
import { PatientsReportTable } from "../components/patients/PatientsReportTable";

const PatientsReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تقارير المرضى</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PatientsReportHeader />
        <PatientsReportTable />
      </motion.section>
    </>
  );
};

export default PatientsReports;
