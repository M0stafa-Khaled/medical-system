import { Card, CardContent } from "@/shared/components/ui/card";
import { IExpenseCategory } from "@/interfaces/dashboard/expenses";
import DeleteExpenseCategory from "./DeleteExpenseCategory";
import UpdateExpenseCategory from "./UpdateExpenseCategory";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { memo } from "react";

interface IProps {
  category: IExpenseCategory;
}

const CategoryCard = ({ category }: IProps) => {
  const canUpdateCategory = useHasPermission(
    PERMISSIONS.UPDATE_EXPENSE_CATEGORY
  );
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
          "border-muted/40 hover:border-primary/40 cursor-pointer transition-all duration-300 hover:shadow-md dark:bg-black"
        }
      >
        <CardContent className="flex flex-col gap-4 px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Workflow className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {canUpdateCategory && (
                <UpdateExpenseCategory category={category} />
              )}
              {canDeleteCategory && (
                <DeleteExpenseCategory category={category} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(CategoryCard);
