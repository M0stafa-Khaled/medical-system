import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ExpensesReportTable } from "../components/expenses/ExpensesReportTable";
import { ExpensesReportHeader } from "../components/expenses/ExpensesReportHeader";

const ExpensesReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تقارير المصروفات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ExpensesReportHeader />
        <ExpensesReportTable />
      </motion.section>
    </>
  );
};

export default ExpensesReports;
