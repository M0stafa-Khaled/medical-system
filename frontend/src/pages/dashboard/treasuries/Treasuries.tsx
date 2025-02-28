import ExpensesTable from "@/components/dashboard/expenses/ExpensesTable";
import { motion } from "framer-motion";

const Treasuries = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <ExpensesTable />
    </motion.section>
  );
};

export default Treasuries;
