import useHasPermission from "@/hooks/useHasPermission";
import CreateClinic from "./CreateClinic";
import { PERMISSIONS } from "@/enums/permissions";

const ClinicsHeader = () => {
  const canCreateClinic = useHasPermission(PERMISSIONS.ADD_CLINIC);
  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      {canCreateClinic && <CreateClinic />}
    </div>
  );
};

export default ClinicsHeader;
