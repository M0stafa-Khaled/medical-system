import useHasPermission from "@/hooks/useHasPermission";
import SearchInput from "../SearchInput";
import AddClinicModalButton from "./AddClinicModalButton";
import { PERMISSIONS } from "@/enums/permissions";

interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const ClinicsTableActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  const canAddClinic = useHasPermission(PERMISSIONS.ADD_CLINIC);
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canAddClinic && <AddClinicModalButton />}
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن عيادة"
      />
    </div>
  );
};

export default ClinicsTableActions;
