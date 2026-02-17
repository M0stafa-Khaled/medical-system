import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CategoriesList } from "../components/CategoriesList";
import { CategoriesHeader } from "../components/CategoriesHeader";

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
        className="mt-6 space-y-6"
      >
        <CategoriesHeader />
        <CategoriesList />
      </motion.section>
    </>
  );
};

export default ExpensesCategories;
