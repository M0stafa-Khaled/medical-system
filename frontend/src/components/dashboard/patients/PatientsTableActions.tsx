import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../SearchInput";
import { Button } from "@/components/ui/button";
import useHasPermission from "@/hooks/useHasPermission";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const PatientsTableActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  const canAddPatient = useHasPermission(PERMISSIONS.ADD_PATIENT);
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canAddPatient && (
        <Button className=" h-auto py-0 px-0">
          <Link
            to="/dashboard/patients/add"
            className="flex justify-center items-center gap-2 w-full h-full py-3 px-4"
          >
            إضافة مريض جديد
            <FiPlus size={20} />
          </Link>
        </Button>
      )}
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث بالاسم او رقم الهاتف"
      />
    </div>
  );
};

export default PatientsTableActions;
