import useDebounce from "@/hooks/useDebounce";
import { useGetAllExpensesCategories } from "@/lib/react-query/expensesCategories";
import cookieServices from "@/utils/cookieServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoriesActions from "./CategoriesActions";
import CategoryCard from "./CategoryCard";
import CategoryCaredSkeleton from "@/components/ui/CategoryCaredSkeleton";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";

const CategoriesList = () => {
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetAllExpensesCategories({
    token,
    search,
  });

  useEffect(() => {
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [isError]);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <CategoriesActions
        searchKeyword={searchTerm}
        setSearchKeyword={setSearchTerm}
      />

      {isLoading ? (
        <CategoryCaredSkeleton />
      ) : !categories?.data?.length ? (
        <p className="text-center text-muted-foreground py-3">
          لا يوجد تصنيفات
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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

export default CategoriesList;
