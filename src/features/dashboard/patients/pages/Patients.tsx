import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { PatientsTable } from "../components/PatientsTable";
import { PatientsHeader } from "../components/PatientsHeader";

const Patients = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | المرضى</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PatientsHeader />
        <PatientsTable />
      </motion.section>
    </>
  );
};

export default Patients;
