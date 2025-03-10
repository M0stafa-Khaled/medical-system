import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useHasPermission = (requiredPermission: string): boolean => {
  const { permissions } = useSelector((state: RootState) => state.permissions);
  return permissions.some(
    (permission) => permission.name === requiredPermission
  );
};

export default useHasPermission;
