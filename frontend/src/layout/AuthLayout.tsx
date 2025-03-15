import { RootState } from "@/store/store";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useNetworkStatus from "@/hooks/useNetworkStatus";

const AuthLayout = () => {
  useNetworkStatus();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    const role = cookieServices.getRole();

    if (role === "admin" || role === "employee")
      return <Navigate to="/dashboard" replace />;
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
