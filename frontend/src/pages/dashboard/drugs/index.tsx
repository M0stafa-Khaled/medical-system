import DrugsTable from "@/components/dashboard/drugs/DrugsTable";
import { motion } from "framer-motion";

const Drugs = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <DrugsTable />
    </motion.section>
  );
};

export default Drugs;
