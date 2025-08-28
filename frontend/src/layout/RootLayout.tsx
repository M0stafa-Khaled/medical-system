import { checkAuth, logout } from "@/store/features/auth/authSlice";
import {
  clearPermissions,
  setPermissions,
} from "@/store/features/permissions/permissionsSlice";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import cookieServices from "@/utils/cookieServices";
import { memo, useEffect, useMemo, useRef } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
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
import { useAppDispatch } from "@/store/store";

const RootLayout = () => {
  useNetworkStatus();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const token = cookieServices.getToken()!;
  const user = useMemo(() => cookieServices.getUser(), []);
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
  const { playNotificationSound } = useNotificationSound();

  useEffect(() => {
    const runCheck = async () => {
      const action = await dispatch(checkAuth());

      if (checkAuth.fulfilled.match(action)) {
        const { email_verified, status, permissions } = action.payload;

        // ---- User authenticated ----
        if (!email_verified) {
          navigate("/verify-account");
          return toast.warn("يرجى تاكيد البريد الالكتروني");
        }

        if (!status) {
          dispatch(logout());
          dispatch(clearPermissions());
          return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
        }

        if (permissions && user?.role !== "patient") {
          dispatch(setPermissions(permissions));
        }

        if (user?.role !== "doctor") {
          initializeEcho(token);
        }
      } else {
        // rejected (Unauthorized)
        dispatch(logout());
        dispatch(clearPermissions());
      }
    };

    runCheck();
  }, [dispatch, navigate, user?.role, token]);

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
