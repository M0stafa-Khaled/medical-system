import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { PrescriptionsTable } from "../components/PrescriptionsTable";
import { PrescriptionsHeader } from "../components/PrescriptionsHeader";

const Prescriptions = () => {
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
        <PrescriptionsHeader />
        <PrescriptionsTable />
      </motion.section>
    </>
  );
};

export default Prescriptions;
