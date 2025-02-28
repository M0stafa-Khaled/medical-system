import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../SearchInput";
import useHasPermission from "@/hooks/useHasPermission";
import AddCategoryButton from "./AddCategoryModalButton";
interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const CategoriesActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  const canAddExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canAddExpense && <AddCategoryButton />}
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن تصنيف"
      />
    </div>
  );
};

export default CategoriesActions;
