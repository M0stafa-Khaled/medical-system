import EmployeesTable from "@/components/dashboard/employees/EmployeesTable";
import { motion } from "framer-motion";

const Employees = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <EmployeesTable />
    </motion.section>
  );
};

export default Employees;
