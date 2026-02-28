import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { DoctorPrescriptionsTable } from "../components/DoctorPrescriptionsTable";
import { DoctorPrescriptionsHeader } from "../components/DoctorPrescriptionsHeader";

const DoctorPrescriptions = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الروشتات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DoctorPrescriptionsHeader />
        <DoctorPrescriptionsTable />
      </motion.section>
    </>
  );
};

export default DoctorPrescriptions;
