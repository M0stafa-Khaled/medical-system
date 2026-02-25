import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { TransactionsReportHeader } from "../components/transactions/TransactionsReportHeader";
import { TransactionReportTable } from "../components/transactions/TransactionReportTable";

const TransactionsReports = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | التحصيلات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TransactionsReportHeader />
        <TransactionReportTable />
      </motion.section>
    </>
  );
};

export default TransactionsReports;
