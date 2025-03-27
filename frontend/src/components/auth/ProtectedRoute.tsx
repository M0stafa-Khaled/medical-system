import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { TRole } from "@/types";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useHasPermission from "@/hooks/useHasPermission";

interface IProps {
  children: ReactNode;
  requiredRole?: TRole | TRole[];
  requiredPermission?: string;
}

const ProtectedRoute = ({
  children,
  requiredRole,
  requiredPermission,
}: IProps) => {
  const token = cookieServices.getToken();
  const role = cookieServices.getRole();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const hasPermission = useHasPermission(requiredPermission || "");

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/not-found" replace />;
    }
  }

  if (requiredPermission && !hasPermission) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;
