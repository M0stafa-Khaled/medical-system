import { logout } from "@/app/features/auth/authSlice";
import { setPermissions } from "@/app/features/permissions/permissionsSlice";
import { useCheckAuth } from "@/lib/react-query/auth";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = cookieServices.getToken();
  const { mutateAsync: checkAuthUser } = useCheckAuth();
  const location = useLocation()
  useEffect(() => {
    (async () => {
      const { auth, email_verified, status, permissions } = await checkAuthUser(
        token as string
      );

      // ----- User is not authenticated ------ //

      if (!auth) {
        // If user is not authenticated and the pathname is / then just logout
        if (location.pathname === "/") {
          return dispatch(logout());
        }
        // If user is not authenticated and the pathname is not / then navigate to /login
        dispatch(logout());
        navigate("/login");
        return toast.warn("يرجي تسجيل الدخول");
      }

      // ----- User is authenticated ----- //

      // Set Permissions in state
      if (auth && permissions) dispatch(setPermissions(permissions));

      // Account is not Active 
      if (auth && !status) {
        navigate("/not-active");
        return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
      }

      // Account is not verified
      if (auth && !email_verified) {
        navigate("/verify-email");
        return toast.warn("يرجى تاكيد البريد الالكتروني");
      }
    })();
  }, [checkAuthUser, token, navigate, dispatch, location]);

  return (
    <main>
      <ScrollRestoration />
      <Outlet />
    </main>
  );
};

export default RootLayout;
