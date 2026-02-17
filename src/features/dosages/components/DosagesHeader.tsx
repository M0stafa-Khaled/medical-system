import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "@/shared/components/ui/SearchInput";
import { CreateDosage } from "./CreateDosage";

export const DosagesHeader = () => {
  const canCreateDosage = useHasPermission(PERMISSIONS.ADD_DOSAGE);
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreateDosage && <CreateDosage />}
      <SearchInput placeholder="ابحث عن جرعة" />
    </div>
  );
};
