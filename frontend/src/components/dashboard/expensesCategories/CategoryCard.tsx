import { Card, CardContent } from "@/components/ui/card";
import { IExpenseCategory } from "@/interfaces/expenseCategory";
import DeleteCategoryModalButton from "./DeleteCategoryModelButton";
import EditCategoryButton from "./EditCategoryModalButton";

interface IProps {
  category: IExpenseCategory;
}

const CategoryCard = ({ category }: IProps) => {
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
          <DeleteCategoryModalButton category={category} />
          <EditCategoryButton category={category} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
