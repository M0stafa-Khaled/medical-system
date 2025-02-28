import DoctorsTable from "@/components/dashboard/doctors/DoctorsTable";
import { motion } from "framer-motion";

const Doctors = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <DoctorsTable />
    </motion.section>
  );
};

export default Doctors;
