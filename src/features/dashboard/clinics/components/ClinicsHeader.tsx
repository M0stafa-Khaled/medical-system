import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateClinic } from "./CreateClinic";
import { PERMISSIONS } from "@/enums/permissions";

export const ClinicsHeader = () => {
  const canCreateClinic = useHasPermission(PERMISSIONS.ADD_CLINIC);
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {canCreateClinic && <CreateClinic />}
    </div>
  );
};
