import { logout } from "@/store/features/auth/authSlice";
import {
  clearPermissions,
  setPermissions,
} from "@/store/features/permissions/permissionsSlice";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { useCheckAuth } from "@/lib/react-query/auth/auth";
import cookieServices from "@/utils/cookieServices";
import { memo, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useGetNotifications } from "@/lib/react-query/notifications/notifications";
import { setNotifications } from "@/store/features/notifications/notificationSlice";
import { useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import useNotificationSound from "@/hooks/useNotificationSound";
import {
  initializeEcho,
  leaveEchoChannel,
  getEchoInstance,
} from "@/lib/pusher/echo";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const RootLayout = () => {
  useNetworkStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const token = cookieServices.getToken()!;
  const user = useMemo(() => cookieServices.getUser(), []);
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
  const { mutateAsync: checkAuthUser } = useCheckAuth();
  const { playNotificationSound } = useNotificationSound();

  useEffect(() => {
    (async () => {
      const { auth, email_verified, status, permissions } = await checkAuthUser(
        token
      );
      // ----- User is  unauthenticated ------ //
      // If user is unauthenticated
      if (!auth) {
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
      if (!email_verified) {
        navigate("/verify-account");
        return toast.warn("يرجى تاكيد البريد الالكتروني");
      }

      // Account is not Active
      if (!status) {
        dispatch(logout());
        dispatch(clearPermissions());
        return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
      }

      // Set Permissions in state
      if (permissions && user?.role !== "patient") {
        dispatch(setPermissions(permissions));
      }
      // Enable socket
      if (user?.role !== "doctor") initializeEcho(token);
    })();
  }, [checkAuthUser, token, user?.role, dispatch, location.pathname, navigate]);

  // Notifications
  const hasSubscribed = useRef(false);
  const lastNotificationId = useRef<string | null>(null);

  useEffect(() => {
    if (!user || hasSubscribed.current) return;

    const echo = getEchoInstance();
    if (!echo) return;

    hasSubscribed.current = true;

    const channelName = `users.${user.id}`;
    const channel = echo.private(channelName);

    channel.notification((data: any) => {
      if (data?.id === lastNotificationId.current) return;
      lastNotificationId.current = data?.id;

      playNotificationSound();
      toast.info("لديك إشعار جديد", {
        autoClose: 6000,
      });

      queryClient.invalidateQueries({
        queryKey: [Query_Keys.NOTIFICATIONS],
      });
    });

    return () => {
      leaveEchoChannel(channelName);
      hasSubscribed.current = false;
    };
  }, [user, queryClient, playNotificationSound]);

  const { data: notifications, isLoading } = useGetNotifications(
    user?.role !== "doctor" && canReceiveNotifications ? token : ""
  );

  const unreadNotifications = useMemo(() => {
    return notifications?.data.filter((n) => !n.last_view).length || 0;
  }, [notifications]);

  useEffect(() => {
    dispatch(
      setNotifications({
        notifications: notifications?.data || [],
        unreadNotifications,
        isLoading,
      })
    );
  }, [notifications, unreadNotifications, isLoading, dispatch]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default memo(RootLayout);
