import PrescriptionsTable from "@/components/dashboard/prescriptions/PrescriptionsTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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
        <PrescriptionsTable />
      </motion.section>
    </>
  );
};

export default Prescriptions;
