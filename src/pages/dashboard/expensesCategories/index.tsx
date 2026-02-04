import CategoriesList from "@/components/dashboard/expensesCategories/CategoriesList";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
const ExpensesCategories = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تصنيفات المصروفات</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-6"
      >
        <CategoriesList />
      </motion.section>
    </>
  );
};

export default ExpensesCategories;
