import { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Bell, CheckCheck, Loader2, ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useNavigate } from "react-router";
import { INotification } from "../types";
import { getTimeAgo } from "@/shared/utils/getTimeAgo";
import { handleResErr } from "@/shared/utils/handleResError";
import {
  useReadNotification,
  useReadAllNotifications,
  useGetNotifications,
} from "../queriesAndMutations";

// Helper function to get notification link based on type and data
const getNotificationLink = (notification: INotification) => {
  const { data } = notification;

  // Patient related
  if (data.patient?.id) {
    return `/dashboard/patients/${data.patient.id}`;
  }

  // Booking related
  if (data.booking?.id) {
    return `/dashboard/bookings/${data.booking.id}`;
  }

  // Default - no link
  return "#";
};

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: notificationsData,
    refetch,
    isPending,
    isRefetching,
  } = useGetNotifications(true);
  const { mutateAsync: readNotification, isPending: isReading } =
    useReadNotification();
  const { mutateAsync: readAllNotifications, isPending: isReadingAll } =
    useReadAllNotifications();

  const notifications = notificationsData?.data || [];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.last_view;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.last_view).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      await readNotification({ id });
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await readAllNotifications();
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleNotificationClick = (notification: INotification) => {
    const link = getNotificationLink(notification);
    if (link !== "#") {
      navigate(link);
    }
    if (!notification.last_view) {
      handleMarkAsRead(notification.id);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">الإشعارات</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? `لديك ${unreadCount} إشعار غير مقروء`
              : "جميع الإشعارات مقروءة"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            {isRefetching && (
              <Loader2 className={cn("ml-2 h-4 w-4 animate-spin")} />
            )}
            تحديث
          </Button>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} disabled={isReadingAll}>
              {isReadingAll ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <CheckCheck className="ml-2 h-4 w-4" />
                  تحديد الكل كمقروء
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            الكل
            <Badge variant="secondary" className="mr-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="gap-2">
            غير مقروء
            {unreadCount > 0 && (
              <Badge variant="destructive" className="mr-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="text-muted-foreground/30 mb-4 h-16 w-16" />
            <p className="text-muted-foreground text-lg">لا توجد إشعارات</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const link = getNotificationLink(notification);
            const hasLink = link !== "#";

            return (
              <Card
                key={notification.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  !notification.last_view && "border-primary/50 bg-primary/5"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={
                          notification.data.sender?.image ||
                          "/images/avatar.svg"
                        }
                        alt={notification.data.sender?.name || "مرسل"}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      {!notification.last_view && (
                        <span className="border-background absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 bg-blue-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            className={cn(
                              "font-medium",
                              !notification.last_view && "font-semibold"
                            )}
                          >
                            {notification.data.sender?.name || "مرسل"}
                          </h3>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {notification.data.message}
                          </p>
                        </div>
                        {hasLink && (
                          <ExternalLink className="text-muted-foreground h-4 w-4 shrink-0" />
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          {getTimeAgo(notification.created_at)}
                        </span>
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {!notification.last_view && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              disabled={isReading}
                            >
                              {isReading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <CheckCheck className="ml-1 h-4 w-4" />
                                  تحديد كمقروء
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
