import ClinicsTable from "@/components/dashboard/clinics/ClinicsTable";
import { motion } from "framer-motion";

const Clinics = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <ClinicsTable />
    </motion.section>
  );
};

export default Clinics;
