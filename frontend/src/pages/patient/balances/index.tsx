import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const PatientBalances = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | المدفوعات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:container mt-10"
      >
        Patient Balances
      </motion.section>
    </>
  );
};

export default PatientBalances;
