import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "@/components/ui/SearchInput";
import CreateDosage from "./CreateDosage";

const DosagesHeader = () => {
  const canCreateDosage = useHasPermission(PERMISSIONS.ADD_DOSAGE);
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canCreateDosage && <CreateDosage />}
      <SearchInput placeholder="ابحث عن جرعة" />
    </div>
  );
};

export default DosagesHeader;
