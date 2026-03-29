import { Navigate } from "react-router";
import { ReactNode } from "react";
import cookieServices from "@/shared/utils/cookieServices";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import useHasPermission from "@/shared/hooks/useHasPermission";
import NotFound from "@/pages/NotFound";
import { TRole } from "@/shared/types";

interface IProps {
  children: ReactNode;
  requiredRole?: TRole | TRole[];
  requiredPermission?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredPermission,
}: IProps) => {
  const token = cookieServices.getToken();
  const role = cookieServices.getUser()?.role;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const hasPermission = useHasPermission(requiredPermission || "");

  if (!token || !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];
    if (!role || !allowedRoles.includes(role)) return <NotFound />;
  }

  if (requiredPermission && !hasPermission) return <NotFound />;

  return children;
};
