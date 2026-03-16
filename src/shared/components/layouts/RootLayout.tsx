import {
  checkAuth,
  fetchUser,
  logout,
} from "@/app/store/features/auth/authSlice";

import useNetworkStatus from "@/shared/hooks/useNetworkStatus";
import cookieServices from "@/shared/utils/cookieServices";
import { useEffect, useMemo, useRef } from "react";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";
import { toast } from "react-toastify";
import { useGetNotifications } from "@/features/notifications/queriesAndMutations";
import { setNotifications } from "@/app/store/features/notifications/notificationSlice";
import { useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import useNotificationSound from "@/shared/hooks/useNotificationSound";
import {
  initializeEcho,
  leaveEchoChannel,
  getEchoInstance,
} from "@/shared/lib/pusher/echo";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { useAppDispatch, useAppSelector } from "@/app/store";
import PageLoader from "@/shared/components/PageLoader";

const RootLayout = () => {
  useNetworkStatus();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const token = cookieServices.getToken()!;
  const user = useMemo(() => cookieServices.getUser(), []);
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
  const { playNotificationSound } = useNotificationSound();

  const { isLoading: authLoading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchUser());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    (async () => {
      const action = await dispatch(checkAuth());
      if (checkAuth.fulfilled.match(action)) {
        const { auth, email_verified, status } = action.payload;

        // user unauthenticated
        if (!auth) {
          dispatch(logout());
          if (location.pathname !== "/") {
            navigate("/login");
            toast.warn("يرجي تسجيل الدخول");
          }
          return;
        }

        // ----- User authenticated ----- //
        // Account is not verified
        if (!email_verified) {
          navigate("/verify-account");
          return toast.warn("يرجى تاكيد البريد الالكتروني");
        }

        // Account is not Active
        if (!status) {
          dispatch(logout());
          return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
        }

        // Enable socket
        if (user?.role !== "doctor") initializeEcho(token);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Notifications
  const hasSubscribed = useRef(false);
  const lastNotificationId = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user || hasSubscribed.current) return;

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
  }, [user, queryClient, playNotificationSound, isAuthenticated]);

  const { data: notifications, isLoading } = useGetNotifications(
    user?.role !== "doctor" && canReceiveNotifications ? true : false
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

  if (authLoading) return <PageLoader />;

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default RootLayout;
