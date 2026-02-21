import useDebounce from "@/shared/hooks/useDebounce";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CategoryCard } from "./CategoryCard";
import { CardSkeleton } from "@/shared/components/ui/CardSkeleton";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { useSearchParams } from "react-router";
import { useGetAllExpensesCategories } from "../queriesAndMutations";

export const CategoriesList = () => {
  const [searchParams] = useSearchParams();
  const search = useDebounce(searchParams.get("q"), 500)!;
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetAllExpensesCategories({
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {isLoading ? (
        <CardSkeleton />
      ) : !categories?.data?.length ? (
        <p className="text-muted-foreground py-3 text-center">
          لا يوجد تصنيفات
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
