import { ClinicsTable } from "../components/ClinicsTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Clinics = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | العيادات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ClinicsTable />
      </motion.section>
    </>
  );
};

export default Clinics;
