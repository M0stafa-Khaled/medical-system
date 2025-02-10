import SearchInput from "../SearchInput";
import AddClinicModalButton from "./AddClinicModalButton";

interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const ClinicsTableActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <AddClinicModalButton />
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن عيادة"
      />
    </div>
  );
};

export default ClinicsTableActions;
