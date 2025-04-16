import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { TRole } from "@/types";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useHasPermission from "@/hooks/useHasPermission";
import NotFound from "@/pages/NotFound";

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
  const role = cookieServices.getUser()?.role;
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
      return <NotFound />;
    }
  }

  if (requiredPermission && !hasPermission) {
    return <NotFound />;
  }

  return children;
};

export default ProtectedRoute;
