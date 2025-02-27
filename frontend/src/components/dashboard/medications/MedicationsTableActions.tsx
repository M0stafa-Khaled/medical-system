import SearchInput from "../SearchInput";

interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}
const MedicationsTableActions = ({
  searchKeyword,
  setSearchKeyword,
}: IProps) => {
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن دواء"
      />
    </div>
  );
};

export default MedicationsTableActions;
