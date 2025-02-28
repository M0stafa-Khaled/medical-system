import CategoriesList from "@/components/dashboard/expensesCategories/CategoriesList";
import { motion } from "framer-motion";
const ExpensesCategories = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6"
    >
      <CategoriesList />
    </motion.section>
  );
};

export default ExpensesCategories;
