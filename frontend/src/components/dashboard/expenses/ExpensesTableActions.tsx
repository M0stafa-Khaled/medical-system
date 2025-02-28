import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../SearchInput";
import useHasPermission from "@/hooks/useHasPermission";
import AddExpenseButton from "./AddExpensesModalButton";

interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const ExpensesTableActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  const canAddExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canAddExpense && <AddExpenseButton />}
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن مصروف"
      />
    </div>
  );
};

export default ExpensesTableActions;
