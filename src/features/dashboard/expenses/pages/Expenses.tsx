import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ExpensesHeader } from "../components/ExpensesHeader";
import { ExpensesTable } from "../components/ExpensesTable";

const Expenses = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | المصروفات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ExpensesHeader />
        <ExpensesTable />
      </motion.section>
    </>
  );
};

export default Expenses;
