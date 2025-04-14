import useDebounce from "@/hooks/useDebounce";
import cookieServices from "@/utils/cookieServices";
import { memo, useEffect } from "react";
import { toast } from "react-toastify";
import CategoriesHeader from "./CategoriesHeader";
import CategoryCard from "./CategoryCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { useGetAllExpensesCategories } from "@/lib/react-query/dashboard/expenses/expensesCategories";
import { useSearchParams } from "react-router-dom";

const CategoriesList = () => {
  const token = cookieServices.getToken()!;
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetAllExpensesCategories({
    token,
    search,
  });

  useEffect(() => {
    if (categories?.message && !categories.status)
      toast.error(categories.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [categories?.message, categories?.status, isError]);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <CategoriesHeader />

      {isLoading ? (
        <CardSkeleton />
      ) : !categories?.data?.length ? (
        <p className="text-center text-muted-foreground py-3">
          لا يوجد تصنيفات
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categories?.data?.map((category, idx) => (
            <motion.div key={category.id} variants={itemVariants} custom={idx}>
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default memo(CategoriesList);
