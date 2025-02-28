import PatientsTable from "@/components/dashboard/patients/PatientsTable";
import { motion } from "framer-motion";

const Patients = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <PatientsTable />
    </motion.section>
  );
};

export default Patients;
