import ExpensesTable from "@/components/dashboard/expenses/ExpensesTable";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Treasuries = () => {
  return (
    <>
      <Helmet>
        <title>EgProg | الخزائن</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ExpensesTable />
      </motion.section>
    </>
  );
};

export default Treasuries;
