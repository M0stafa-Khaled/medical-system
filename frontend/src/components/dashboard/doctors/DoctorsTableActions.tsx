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

const DoctorsTableActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  const canAddDoctor = useHasPermission(PERMISSIONS.ADD_DOCTOR);
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canAddDoctor && (
        <Button
          size={"sm"}
          variant={"outline"}
          className=" h-auto py-0 px-0 bg-primary md:bg-transparent md:text-primary text-primary-foreground hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black !rounded-lg font-semibold"
        >
          <Link
            to="/dashboard/doctors/add"
            className="flex justify-center items-center gap-2 w-full h-full py-4 px-4"
          >
            إضافة طبيب جديد
            <FiPlus size={20} />
          </Link>
        </Button>
      )}
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن طبيب"
      />
    </div>
  );
};

export default DoctorsTableActions;
