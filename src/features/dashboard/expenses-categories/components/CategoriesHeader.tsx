import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateExpenseCategory } from "./CreateExpenseCategory";
import SearchInput from "@/shared/components/ui/SearchInput";

export const CategoriesHeader = () => {
  const canCreateCategory = useHasPermission(PERMISSIONS.ADD_EXPENSE_CATEGORY);

  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreateCategory && <CreateExpenseCategory />}
      <SearchInput placeholder="ابحث عن تصنيف" />
    </div>
  );
};
