import { Card, CardContent } from "@/components/ui/card";
import { IExpenseCategory } from "@/interfaces/expenseCategory";
import DeleteCategoryButton from "./DeleteCategoryModelButton";
import EditCategoryButton from "./EditCategoryModalButton";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";

interface IProps {
  category: IExpenseCategory;
}

const CategoryCard = ({ category }: IProps) => {
  const canEditCategory = useHasPermission(PERMISSIONS.EDIT_EXPENSE_CATEGORY);
  const canDeleteCategory = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={
          "transition-all duration-300 hover:shadow-md cursor-pointer border-muted/40 hover:border-primary/40 dark:bg-black"
        }
      >
        <CardContent className="py-6 px-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">{category.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {canEditCategory && <EditCategoryButton category={category} />}
              {canDeleteCategory && (
                <DeleteCategoryButton category={category} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
