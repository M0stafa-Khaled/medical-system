import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ExpensesReportTable from "@/components/dashboard/reports/expensesReports/ExpensesReportTable";

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
        <ExpensesReportTable />
      </motion.section>
    </>
  );
};

export default ExpensesReports;
