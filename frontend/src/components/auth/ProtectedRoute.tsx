import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CookieService from "../../utils/cookieServices";
import { ReactNode } from "react";

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole: string;
}) => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );
  const token = CookieService.getToken(); // * Get token from cookies

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
