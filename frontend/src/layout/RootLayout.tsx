import { logout } from "@/store/features/auth/authSlice";
import {
  clearPermissions,
  setPermissions,
} from "@/store/features/permissions/permissionsSlice";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { useCheckAuth } from "@/lib/react-query/auth/auth";
import cookieServices from "@/utils/cookieServices";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

const RootLayout = () => {
  useNetworkStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { mutateAsync: checkAuthUser } = useCheckAuth();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { auth, email_verified, status, permissions } = await checkAuthUser(
        token
      );

      // ----- User is  unauthenticated ------ //
      if (!auth) {
        // If user is unauthenticated
        dispatch(logout());
        dispatch(clearPermissions());
        if (location.pathname !== "/") {
          navigate("/login");
          toast.warn("يرجي تسجيل الدخول");
        }
        return;
      }

      // ----- User is authenticated ----- //
      // Account is not Active
      if (auth && !status) {
        return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
      }

      // Account is not verified
      if (auth && !email_verified) {
        navigate("/verify-email");
        return toast.warn("يرجى تاكيد البريد الالكتروني");
      }

      // Set Permissions in state
      if (auth && permissions) dispatch(setPermissions(permissions));
    })();
  }, [checkAuthUser, token, navigate, dispatch, location]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default memo(RootLayout);
