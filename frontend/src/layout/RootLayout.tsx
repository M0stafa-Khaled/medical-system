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
import echo from "@/lib/pusher/echo";

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
      // Account is not verified
      if (auth && !email_verified) {
        navigate("/verify-account");
        return toast.warn("يرجى تاكيد البريد الالكتروني");
      }

      // Account is not Active
      if (auth && !status) {
        return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
      }

      // Set Permissions in state
      const role = cookieServices.getUser()?.role;
      if (auth && permissions && (role === "admin" || role === "employee"))
        dispatch(setPermissions(permissions));
    })();
  }, [checkAuthUser, token, navigate, dispatch, location]);

  const user = cookieServices.getUser();

  useEffect(() => {
    echo.private(`users.${user?.id}`).notification((data: any) => {
      alert(data.message);
    });

    return () => {
      echo.leaveChannel("subscription-usage");
    };
  }, [user]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default memo(RootLayout);
