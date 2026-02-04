import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../../ui/SearchInput";
import useHasPermission from "@/hooks/useHasPermission";
import CreateExpenseCategory from "./CreateExpenseCategory";
import { memo } from "react";

const CategoriesHeader = () => {
  const canCreateCategory = useHasPermission(PERMISSIONS.ADD_EXPENSE_CATEGORY);

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canCreateCategory && <CreateExpenseCategory />}
      <SearchInput placeholder="ابحث عن تصنيف" />
    </div>
  );
};

export default memo(CategoriesHeader);
