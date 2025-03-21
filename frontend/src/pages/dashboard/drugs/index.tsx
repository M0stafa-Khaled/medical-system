import DrugsTable from "@/components/dashboard/drugs/DrugsTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Drugs = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الأدوية</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DrugsTable />
      </motion.section>
    </>
  );
};

export default Drugs;
