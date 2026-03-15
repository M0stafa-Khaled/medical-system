import { RootState, useAppSelector } from "@/app/store";
import { useSelector } from "react-redux";
import { handleResErr } from "@/shared/utils/handleResError";
import {
  useReadAllNotifications,
  useReadNotification,
} from "../queriesAndMutations";
import cookieServices from "@/shared/utils/cookieServices";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Bell, CheckCheck, ExternalLink, Loader2 } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Link, useNavigate } from "react-router";
import { INotification } from "../types";
import { getTimeAgo } from "@/shared/utils/getTimeAgo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";

const role = cookieServices.getUser()?.role;

const getNotificationLink = (notification: INotification) => {
  const { data } = notification;
  // Patient related

  if (role === "admin" || role === "employee") {
    if (data.patient?.id) {
      return `/dashboard/patients/${data.patient.id}`;
    }
    // Booking related
    if (data.booking?.id) {
      return `/dashboard/bookings/${data.booking.id}`;
    }
  }

  // Default - no link
  return "#";
};

const NotificationsMenu = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unreadNotifications, isLoading, notifications } = useAppSelector(
    (state) => state.notifications
  );

  const { mutateAsync: readAllNotifications, isPending: isPendingReadAll } =
    useReadAllNotifications();

  const handleReadAllNotifications = async () => {
    try {
      await readAllNotifications();
    } catch (error) {
      handleResErr(error);
    }
  };

  const role = cookieServices.getUser()?.role;

  const { mutateAsync: readNotification } = useReadNotification();

  const handleReadNotification = async (id: string) => {
    try {
      await readNotification({ id });
    } catch (error) {
      handleResErr(error);
    }
  };
  const handleNotificationClick = (notification: INotification) => {
    const link = getNotificationLink(notification);
    if (link !== "#" && (role === "admin" || role === "employee")) {
      navigate(link);
    }
    if (!notification.last_view) {
      handleReadNotification(notification.id);
    }
  };

  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );

  if (!canReceiveNotifications) return null;

  if (isAuthenticated && role !== "doctor")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full! border border-yellow-500/30! bg-yellow-500/10! text-yellow-500! hover:bg-yellow-500/20! dark:bg-yellow-500/20! dark:hover:bg-yellow-500/30!"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-card w-80" align="end">
          {/* Header */}
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>الإشعارات</span>
            {unreadNotifications > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={handleReadAllNotifications}
                disabled={isPendingReadAll}
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <CheckCheck className="h-3 w-3" />
                )}
                تحديد الكل كمقروء
              </Button>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Notifications List */}
          <ScrollArea className="h-96">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="text-muted-foreground/50 mb-2 h-12 w-12" />
                <p className="text-muted-foreground">لا توجد إشعارات</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => {
                  const link = getNotificationLink(notification);
                  const hasLink = link !== "#";

                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "focus:bg-muted/50 flex cursor-pointer items-start gap-3 p-3",
                        !notification.last_view && "bg-primary/5"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {/* Sender Image */}
                      <div className="relative shrink-0">
                        <img
                          src={
                            notification.data.sender?.image ||
                            "/images/avatar.svg"
                          }
                          alt={notification.data.sender?.name || "مرسل"}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        {!notification.last_view && (
                          <span className="border-background absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 bg-blue-500" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "truncate text-sm font-medium",
                              !notification.last_view && "font-semibold",
                              hasLink && "text-primary"
                            )}
                          >
                            {notification.data.sender?.name || "مرسل"}
                          </p>
                        </div>

                        {/* Message */}
                        <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                          {notification.data.message}
                        </p>

                        {/* Time */}
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-muted-foreground/70 text-xs">
                            {getTimeAgo(notification.created_at)}
                          </p>

                          <ExternalLink size={14} className="text-primary" />
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          <DropdownMenuSeparator />

          {/* Footer */}
          <DropdownMenuItem asChild>
            <Link
              to="notifications"
              className="text-primary flex w-full cursor-pointer items-center justify-center gap-2"
            >
              عرض جميع الإشعارات
              <ExternalLink className="h-3 w-3" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default NotificationsMenu;
