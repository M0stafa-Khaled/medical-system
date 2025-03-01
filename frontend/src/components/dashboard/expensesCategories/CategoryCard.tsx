import { Card, CardContent } from "@/components/ui/card";
import { IExpenseCategory } from "@/interfaces/expenseCategory";
import DeleteCategoryButton from "./DeleteCategoryModelButton";
import EditCategoryButton from "./EditCategoryModalButton";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

interface IProps {
  category: IExpenseCategory;
}

const CategoryCard = ({ category }: IProps) => {
  const canEditCategory = useHasPermission(PERMISSIONS.EDIT_EXPENSE_CATEGORY);
  const canDeleteCategory = useHasPermission(
    PERMISSIONS.DELETE_EXPENSE_CATEGORY
  );

  return (
    <Card
      className={
        "transition-all duration-300 hover:shadow-md cursor-pointer border-muted/40 hover:border-primary/40 dark:bg-black"
      }
    >
      <CardContent className="p-4 flex flex-col gap-4">
        <h3 className="text-lg font-medium text-center line-clamp-1">
          {category?.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          {canDeleteCategory && <DeleteCategoryButton category={category} />}
          {canEditCategory && <EditCategoryButton category={category} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
