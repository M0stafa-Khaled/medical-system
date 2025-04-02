import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../SearchInput";
import useHasPermission from "@/hooks/useHasPermission";
import CreateExpense from "./CreateExpenses";

const ExpensesHeader = () => {
  const canCreateExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canCreateExpense && <CreateExpense />}
      <SearchInput placeholder="ابحث عن برقم الإيصال او التصنيف" />
    </div>
  );
};

export default ExpensesHeader;
