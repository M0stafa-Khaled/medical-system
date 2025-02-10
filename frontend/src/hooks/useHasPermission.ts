import { Permission } from "@/types";
import { ROLE_PERMISSIONS } from "@/constants/permission";
import cookieServices from "@/utils/cookieServices";

export const useHasPermission = (requiredPermission: Permission): boolean => {
  const role = cookieServices.getRole();
  if (!role) return false;

  const userPermissions = ROLE_PERMISSIONS[role];
  return userPermissions.includes(requiredPermission);
};
