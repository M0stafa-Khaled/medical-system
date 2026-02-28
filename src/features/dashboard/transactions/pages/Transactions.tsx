import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { TransactionTable } from "../components/TransactionTable";
import { TransactionsHeader } from "../components/TransactionsHeader";

const Transactions = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الإيرادات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TransactionsHeader />
        <TransactionTable />
      </motion.section>
    </>
  );
};

export default Transactions;
