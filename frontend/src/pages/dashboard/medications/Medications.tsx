import MedicationsTable from "@/components/dashboard/medications/MedicationsTable";
import { motion } from "framer-motion";

const Medications = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <MedicationsTable />
    </motion.section>
  );
};

export default Medications;
