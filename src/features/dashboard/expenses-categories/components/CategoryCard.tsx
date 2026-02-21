import { Card, CardContent } from "@/shared/components/ui/card";
import { UpdateExpenseCategory } from "./UpdateExpenseCategory";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { IExpenseCategory } from "../types";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { useDeleteExpenseCategory } from "../queriesAndMutations";

interface IProps {
  category: IExpenseCategory;
}

export const CategoryCard = ({ category }: IProps) => {
  const canUpdateCategory = useHasPermission(
    PERMISSIONS.UPDATE_EXPENSE_CATEGORY
  );
  const canDeleteCategory = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );

  const { mutateAsync: deleteCategory } = useDeleteExpenseCategory();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-muted">
        <CardContent className="flex flex-col gap-4 px-4 py-6">
          <div className="flex justify-between gap-3">
            <Workflow className="text-primary h-5 w-5" />
            <div className="flex items-center gap-2">
              {canUpdateCategory && (
                <UpdateExpenseCategory category={category} />
              )}
              {canDeleteCategory && (
                <DeleteAlert
                  name={category.name}
                  deleteAction={() =>
                    deleteCategory({ id: category.id.toString() })
                  }
                />
              )}
            </div>
          </div>
          <h3 className="text-lg font-semibold">{category.name}</h3>
        </CardContent>
      </Card>
    </motion.div>
  );
};
