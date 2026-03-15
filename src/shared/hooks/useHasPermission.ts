import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const useHasPermission = (requiredPermission: string): boolean => {
  const { permissions } = useSelector((state: RootState) => state.auth);
  if (!permissions) return false;
  return permissions.some(
    (permission) => permission.name === requiredPermission
  );
};

export default useHasPermission;
