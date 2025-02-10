import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { TRole } from "@/types";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface IProps {
  children: ReactNode;
  requiredRole: TRole | TRole[];
}

const ProtectedRoute = ({ children, requiredRole }: IProps) => {
  const token = cookieServices.getToken();
  const role = cookieServices.getRole();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
